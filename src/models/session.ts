import { z } from 'zod';

export const LoginSessionSchema = z.object({
  challenge: z.string(),
});

export type LoginSessionType = z.infer<typeof LoginSessionSchema>;
