import { z } from 'zod';

export const WebAuthnSessionSchema = z.object({
  challenge: z.string(),
});

export const AuthSessionSchema = z.object({
  name: z.string(),
  id: z.string(),
});

export type WebAuthnSession = z.infer<typeof WebAuthnSessionSchema>;
export type AuthSession = z.infer<typeof AuthSessionSchema>;
