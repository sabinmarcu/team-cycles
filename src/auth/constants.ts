// eslint-disable-next-line import/extensions
import { env as environment } from '@/env/server';

export const rpId = environment.RP_ID;
export const rpName = environment.RP_NAME;
export const origin = `${environment.RP_PROTOCOL}://${[environment.RP_ID, environment.RP_PORT]
  .filter(Boolean)
  .join(':')}`;
