import { DBSchema } from "@/types";
import { CredentialSchema } from "./credential";
import { UserSchema } from "./user";

export const schemas = {
  'user': UserSchema,
  'credential': CredentialSchema,
} satisfies Record<string, DBSchema>;

export type Collection = keyof typeof schemas;

export type SchemaOf<T extends Collection> = typeof schemas[T];
