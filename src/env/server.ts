/* eslint-disable unicorn/prevent-abbreviations */
import { z } from 'zod';
import {
  rawEnvironmentSchema as clientEnvironmentSchema,
  rawEnv as rawClientEnv,
} from './client';

export const rawEnvironmentSchema = {
  ...clientEnvironmentSchema,
  SESSION_SECRET: z.string().default('Cycles'),
};
const environmentSchema = z.object(rawEnvironmentSchema);

export const rawEnv = {
  ...rawClientEnv,
  SESSION_SECRET: process.env.NEXT_PUBLIC_SESSION_SECRET ?? process.env.SESSION_SECRET,
} satisfies Record<keyof typeof rawEnvironmentSchema, string | undefined>;

export const env = environmentSchema.parse(rawEnv);
