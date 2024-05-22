import {
  UserSchema,
  type UserType,
} from '@/models/user';
import type {
  GenerateAuthenticationOptionsOpts,
  VerifyAuthenticationResponseOpts,
} from '@simplewebauthn/server';
import {
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { env } from '@/env/client';
import type { AuthenticationResponseJSON } from '@simplewebauthn/types';
import {
  firestore,
  parseDocument,
  getDoc,
  doc,
} from '@/firebase';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { startAuthentication } from '@simplewebauthn/browser';
import {
  createSession,
  getSession,
  removeSession,
} from './session';
import { origin } from './constants';
import { getCredential } from './credential';

export async function loginUser(
  user: UserType,
) {
  return createSession('auth', user);
}

export async function startLogin() {
  const rawOptions: GenerateAuthenticationOptionsOpts = {
    timeout: 60_000,
    userVerification: 'required',
    rpID: env.RP_ID,
  };

  const options = await generateAuthenticationOptions(rawOptions);

  await createSession('login', { challenge: options.challenge });

  return options;
}

export async function verifyLogin(data: AuthenticationResponseJSON) {
  const sessionData = await getSession('login');

  if (!sessionData || !sessionData.challenge) {
    throw new Error('Session expired!');
  }

  const { challenge } = sessionData;

  const databaseDevice = await getCredential(data.rawId);

  if (!databaseDevice) {
    throw new Error('Device not registered!');
  }

  const options: VerifyAuthenticationResponseOpts = {
    response: data,
    expectedChallenge: `${challenge}`,
    expectedOrigin: origin,
    expectedRPID: env.RP_ID,
    authenticator: {
      ...databaseDevice,
      transports: databaseDevice.transports as any,
      credentialID: databaseDevice.credentialID,
      credentialPublicKey: isoBase64URL.toBuffer(
        databaseDevice.credentialPublicKey,
      ),
    },
    requireUserVerification: true,
  };

  const verification = await verifyAuthenticationResponse(options);

  if (!verification.verified) {
    throw new Error('Could not verify credentials!');
  }

  await removeSession('login');

  return databaseDevice.owner;
}

export async function login() {
  const response = await startLogin();

  const localResponse = await startAuthentication(response);
  const owner = await verifyLogin(localResponse);

  const user = parseDocument(
    await getDoc(
      doc(firestore, 'user', owner),
    ),
    UserSchema,
  );

  if (!user) {
    throw new Error('No user found for this device!');
  }

  return loginUser(user);
}

export async function logout() {
  return removeSession('auth');
}
