'use server';

import { cookies } from 'next/headers';
import type { z } from 'zod';
import {
  AuthSessionSchema,
  LoginSessionSchema,
  RegisterSessionSchema,
} from '@/models/session';
import {
  decrypt,
  encrypt,
} from './utils/session';

const sessionPrefix = 'session';

const sessionSchemas = {
  login: LoginSessionSchema,
  register: RegisterSessionSchema,
  auth: AuthSessionSchema,
} as const satisfies Record<string, z.ZodSchema>;
export type SessionType = keyof typeof sessionSchemas;

const expirationTimes = {
  login: '5m',
  register: '5m',
  auth: '5d',
} as const satisfies Record<SessionType, Omit<Parameters<typeof encrypt>[1], 'undefined'>>;

export type SessionSchemas = typeof sessionSchemas;
export type SessionTypes = {
  [Key in keyof SessionSchemas]: z.infer<SessionSchemas[Key]>
};

const getSessionKey = <T extends SessionType>(
  session: T,
) => `${sessionPrefix}:${session}` as const;

export const getSession = async <T extends SessionType>(
  session: T,
): Promise<SessionTypes[T] | undefined> => {
  const key = getSessionKey(session);
  const cookiesStore = cookies();
  const data = cookiesStore.get(key);
  if (!data) {
    throw new Error('Could not find session cookie!');
  }
  if (!data.value) {
    throw new Error('Session cookie is empty!');
  }
  const schema = sessionSchemas[session];
  const payload = await decrypt(data.value);
  return schema.parse(payload) as any;
};

export const createSession = async <T extends SessionType>(
  session: T,
  data: SessionTypes[T],
  expirationTime?: Parameters<typeof encrypt>[1],
) => {
  const payload = await encrypt(data, expirationTime ?? expirationTimes[session]);
  const key = getSessionKey(session);
  const cookiesStore = cookies();
  cookiesStore.set(key, payload);
  return payload;
};

export const removeSession = async <T extends SessionType>(
  session: T,
) => {
  const key = getSessionKey(session);
  const cookiesStore = cookies();
  cookiesStore.delete(key);
};
