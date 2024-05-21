import type { ZodSchema } from 'zod';

export type DBConstraint = { id: string };
export type DBConstraintSchema = { id: ZodSchema<string> };
export type DBRawSchema<T extends string = string> = Record<T, ZodSchema>;
export type DBSchema<T extends Record<string, ZodSchema> = any> = ZodSchema<T & DBRawSchema>;
