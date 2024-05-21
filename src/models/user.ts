import { z } from 'zod';
import { createDbSchema as createDatabaseSchema } from '@/auth/v2/utils/dbschema';

export const UserSchema = createDatabaseSchema({
  name: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
