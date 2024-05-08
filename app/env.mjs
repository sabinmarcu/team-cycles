// @ts-check

import { z } from "zod";

const envSchema = z.object({
  RP_NAME: z.string().default("Cycles"),
  RP_ID: z.string().default("localhost"),
});

export const env = envSchema.parse(process.env);
