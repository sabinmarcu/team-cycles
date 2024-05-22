// eslint-disable-next-line import/extensions
import { env as environment } from '@/env/server';

export const origin = `${environment.RP_PROTOCOL}://${[environment.RP_ID, environment.RP_PORT]
  .filter(Boolean)
  .join(':')}`;
