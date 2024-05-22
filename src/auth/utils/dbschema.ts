import type { DBRawSchema } from '@/types';
import { z } from 'zod';

// eslint-disable-next-line unicorn/prevent-abbreviations
export const createDbSchema = <T extends DBRawSchema>(
  input: T,
) => z.object({
  ...input,
  id: z.string(),
});
