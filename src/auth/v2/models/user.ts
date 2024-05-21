import { z } from 'zod';
import { createDbSchema } from '../utils/dbschema';

export const UserSchema = createDbSchema({
  name: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
