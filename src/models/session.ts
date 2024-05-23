import { z } from 'zod';

export const LoginSessionSchema = z.object({
  challenge: z.string(),
});

export const RegisterSessionSchema = LoginSessionSchema.extend({
  deviceName: z.string().optional(),
});

export const AuthSessionSchema = z.object({
  name: z.string(),
  id: z.string(),
});
