import { Simplify } from 'type-fest';
import { DBRawSchema, DBSchema } from '@/types';
import type { AuthenticatorDevice } from '@simplewebauthn/types';
import { ZodSchema, z } from 'zod';
import { createDbSchema } from '../utils/dbschema';

export type UserDevice = Omit<
  AuthenticatorDevice,
  'credentialPublicKey' | 'credentialID'
> & {
  credentialID: string;
  credentialPublicKey: string;
};

export const CredentialSchema = createDbSchema({
  credentialPublicKey: z.string(),
  counter: z.number(),
  credentialID: z.string(),
  transports: z.array(z.string()),
} satisfies DBRawSchema<keyof UserDevice>);

export type CredentialType = z.infer<typeof CredentialSchema>;
