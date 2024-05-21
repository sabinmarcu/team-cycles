/* eslint-disable unicorn/prevent-abbreviations */

import { z } from 'zod';

export const rawEnvironmentSchema = {
  RP_NAME: z.string().default('Cycles'),
  RP_ID: z.string().default('localhost'),
  RP_PORT: z.string().optional(),
  RP_PROTOCOL: z.string().default('https'),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_AUTH_DOMAIN: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_STORAGE_BUCKET: z.string(),
  FIREBASE_MESSAGING_SENDER_ID: z.string(),
  FIREBASE_APP_ID: z.string(),
};
const environmentSchema = z.object(rawEnvironmentSchema);

export const rawEnv = {
  RP_NAME: process.env.NEXT_PUBLIC_RP_NAME
    ?? process.env.RP_NAME,
  RP_ID: process.env.NEXT_PUBLIC_RP_ID
    ?? process.env.RP_ID,
  RP_PORT: process.env.NEXT_PUBLIC_RP_PORT
    ?? process.env.RP_PORT,
  RP_PROTOCOL: process.env.NEXT_PUBLIC_RP_PROTOCOL
    ?? process.env.RP_PROTOCOL,
  FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    ?? process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
    ?? process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    ?? process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    ?? process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    ?? process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    ?? process.env.FIREBASE_APP_ID,
} satisfies Record<keyof typeof rawEnvironmentSchema, string | undefined>;

export const env = environmentSchema.parse(rawEnv);
