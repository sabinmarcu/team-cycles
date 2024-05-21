import { cookies } from 'next/headers';
import type { z } from 'zod';
import {
  LoginSessionSchema,
} from '@/models/session';
import {
  decrypt,
  encrypt,
} from './utils/session';

export const sessionPrefix = 'session';

const availableSessions = [
  'login',
] as const;
export type SessionType = typeof availableSessions[number];

const sessionSchemas = {
  login: LoginSessionSchema,
} as const satisfies Record<SessionType, z.ZodSchema>;
export type SessionSchemas = typeof sessionSchemas;
export type SessionTypes = {
  [Key in keyof SessionSchemas]: z.infer<SessionSchemas[Key]>
};

export const expirationTimes = {
  login: '5m',
} as const satisfies Record<SessionType, Omit<Parameters<typeof encrypt>[1], 'undefined'>>;

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
  return schema.parse(payload);
};

export const createSession = async <T extends SessionType>(
  session: T,
  data: SessionTypes[T],
  expirationTime: Parameters<typeof encrypt>[1],
) => {
  const payload = await encrypt(data, expirationTime ?? expirationTimes[session]);
  return payload;
};

