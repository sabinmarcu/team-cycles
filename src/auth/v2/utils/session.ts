import 'server-only';
import {
  SignJWT,
  jwtVerify,
} from 'jose';
import consola from 'consola';

// eslint-disable-next-line import/extensions
import { env as environment } from '@/env/server';

const secretKey = environment.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const algorithm = 'HS256';

export async function encrypt(
  payload: any,
  expirationTime: string | number | Date = '5m',
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: algorithm })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = '',
) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: [algorithm],
    });
    return payload;
  } catch {
    consola.error('Failed to verify session!');
  }
  return undefined;
}
