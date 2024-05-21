'use server';

import type {
  GenerateAuthenticationOptionsOpts,
  GenerateRegistrationOptionsOpts,
  VerifyAuthenticationResponseOpts,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import {
  origin,
  rpId,
} from '@/auth/constants';
import type {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from '@simplewebauthn/types';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import {
  createUser,
  findUser,
} from '@/auth/v1/user';
import type { UserDevice } from '@/auth/v1/user';
import {
  getCurrentSession,
  updateCurrentSession,
} from '@/auth/v1/session';

export const generateWebAuthnRegistrationOptions = async (email: string) => {
  const user = await findUser(email);

  if (user) {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  const rawOptions: GenerateRegistrationOptionsOpts = {
    rpName: 'SimpleWebAuthn Example',
    rpID: rpId,
    userID: isoBase64URL.toBuffer(email),
    userName: email,
    timeout: 60_000,
    attestationType: 'none',
    excludeCredentials: [],
    authenticatorSelection: {
      residentKey: 'discouraged',
    },
    /**
     * Support the two most common algorithms: ES256, and RS256
     */
    supportedAlgorithmIDs: [-7, -257],
  };

  const options = await generateRegistrationOptions(rawOptions);

  await updateCurrentSession({ currentChallenge: options.challenge, email });

  return {
    success: true,
    data: options,
  };
};

export const verifyWebAuthnRegistration = async (
  data: RegistrationResponseJSON,
) => {
  const {
    data: { email, currentChallenge },
  } = await getCurrentSession();

  if (!email || !currentChallenge) {
    return {
      success: false,
      message: 'Session expired',
    };
  }

  const expectedChallenge = currentChallenge;

  const options: VerifyRegistrationResponseOpts = {
    response: data,
    expectedChallenge: `${expectedChallenge}`,
    expectedOrigin: origin,
    expectedRPID: rpId,
    requireUserVerification: false,
  };
  const verification = await verifyRegistrationResponse(options);

  const { verified, registrationInfo } = verification;

  if (!verified || !registrationInfo) {
    return {
      success: false,
      message: 'Registration failed',
    };
  }

  const { credentialPublicKey, credentialID, counter } = registrationInfo;

  /**
   * Add the returned device to the user's list of devices
   */
  const newDevice: UserDevice = {
    credentialPublicKey: isoBase64URL.fromBuffer(credentialPublicKey),
    credentialID,
    counter,
    transports: data.response.transports,
  };

  await updateCurrentSession({});

  try {
    await createUser(email, [newDevice]);
  } catch {
    return {
      success: false,
      message: 'User already exists',
    };
  }

  return {
    success: true,
  };
};

export const generateWebAuthnLoginOptions = async (email: string) => {
  const user = await findUser(email);

  if (!user) {
    return {
      success: false,
      message: 'User does not exist',
    };
  }

  const rawOptions: GenerateAuthenticationOptionsOpts = {
    timeout: 60_000,
    allowCredentials: user.devices.map((development) => ({
      id: development.credentialID,
      type: 'public-key',
      transports: development.transports,
    })),
    userVerification: 'required',
    rpID: rpId,
  };
  const options = await generateAuthenticationOptions(rawOptions);

  await updateCurrentSession({ currentChallenge: options.challenge, email });

  return {
    success: true,
    data: options,
  };
};

export const verifyWebAuthnLogin = async (data: AuthenticationResponseJSON) => {
  const {
    data: { email, currentChallenge },
  } = await getCurrentSession();

  if (!email || !currentChallenge) {
    return {
      success: false,
      message: 'Session expired',
    };
  }

  const user = await findUser(email);

  if (!user) {
    return {
      success: false,
      message: 'User does not exist',
    };
  }

  const databaseAuthenticator = user.devices.find(
    (development) => development.credentialID === data.rawId,
  );

  if (!databaseAuthenticator) {
    return {
      success: false,
      message: 'Authenticator is not registered with this site',
    };
  }

  const options: VerifyAuthenticationResponseOpts = {
    response: data,
    expectedChallenge: `${currentChallenge}`,
    expectedOrigin: origin,
    expectedRPID: rpId,
    authenticator: {
      ...databaseAuthenticator,
      credentialID: databaseAuthenticator.credentialID,
      credentialPublicKey: isoBase64URL.toBuffer(
        databaseAuthenticator.credentialPublicKey,
      ),
    },
    requireUserVerification: true,
  };
  const verification = await verifyAuthenticationResponse(options);

  await updateCurrentSession({});

  return {
    success: verification.verified,
  };
};
