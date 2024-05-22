import type {
  GenerateRegistrationOptionsOpts,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from '@simplewebauthn/server';
import { env } from '@/env/client';
import type { RegistrationResponseJSON } from '@simplewebauthn/types';
import type { UserDevice } from '@/models/credential';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { startRegistration } from '@simplewebauthn/browser';
import {
  createSession,
  getSession,
  removeSession,
} from './session';
import { addDevice } from './device';
import { createUser } from './user';
import { loginUser } from './login';

export const startDeviceRegistration = async () => {
  const rawOptions: GenerateRegistrationOptionsOpts = {
    rpName: env.RP_NAME,
    rpID: env.RP_ID,
    userName: '',
    timeout: 60_000,
    attestationType: 'none',
    excludeCredentials: [],
    authenticatorSelection: {
      residentKey: 'discouraged',
    },
    supportedAlgorithmIDs: [-7, -257],
  };

  const options = await generateRegistrationOptions(rawOptions);

  await createSession('login', { challenge: options.challenge });

  return {
    success: true,
    data: options,
  };
};

export const verifyDeviceRegistration = async (
  data: RegistrationResponseJSON,
) => {
  const {
    challenge,
  } = await getSession('login') ?? {};

  const options: VerifyRegistrationResponseOpts = {
    response: data,
    expectedChallenge: `${challenge}`,
    expectedOrigin: origin,
    expectedRPID: env.RP_ID,
    requireUserVerification: false,
  };
  const verification = await verifyRegistrationResponse(options);

  const { verified, registrationInfo } = verification;

  if (!verified || !registrationInfo) {
    throw new Error('Registration Failed');
  }
  const { credentialPublicKey, credentialID, counter } = registrationInfo;

  const newDevice: UserDevice = {
    credentialPublicKey: isoBase64URL.fromBuffer(credentialPublicKey),
    credentialID,
    counter,
    transports: data.response.transports,
  };

  await removeSession('login');

  return newDevice;
};

export const registerAccount = async (name: string) => {
  const response = await startDeviceRegistration();

  if (!response.success || !response.data) {
    throw new Error('Something went wrong!');
  }

  const localResponse = await startRegistration(response.data);
  const verifiedResponse = await verifyDeviceRegistration(localResponse);

  const newUser = await createUser(name);

  await addDevice(verifiedResponse, newUser.id);

  return loginUser(newUser);
};
