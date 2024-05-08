import nextEnv from "@next/env";
import { fileURLToPath } from "node:url";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(fileURLToPath(import.meta.url));

import { env } from "./app/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
