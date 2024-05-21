import nextEnv from '@next/env';
import { fileURLToPath } from 'node:url';
import { env } from './src/env/client.ts';

const environmentDirectory = fileURLToPath(
  new URL('.', import.meta.url),
).replace(/\/?/, '');
const { loadEnvConfig } = nextEnv;

loadEnvConfig(environmentDirectory);

const nextConfig = {
  env,
};
/** @type {import('next').NextConfig} */

export default nextConfig;
