import type { DBRawSchema } from '@/types';
import type { AuthenticatorDevice } from '@simplewebauthn/types';
import {
  z,
} from 'zod';
import { createDbSchema as createDatabaseSchema } from '@/auth/utils/dbschema';

export type UserDevice = Omit<
  AuthenticatorDevice,
  'credentialPublicKey' | 'credentialID'
> & {
  credentialID: string;
  credentialPublicKey: string;
};

export type DBUserDevice = UserDevice & {
  owner: string,
  deviceName?: string,
};

export const CredentialSchema = createDatabaseSchema({
  credentialPublicKey: z.string(),
  counter: z.number(),
  credentialID: z.string(),
  transports: z.array(z.string()).optional(),
  owner: z.string(),
  deviceName: z.string().optional(),
} satisfies DBRawSchema<keyof DBUserDevice>);

export type CredentialType = z.infer<typeof CredentialSchema>;
