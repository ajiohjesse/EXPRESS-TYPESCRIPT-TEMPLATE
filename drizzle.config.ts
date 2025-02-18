import { env, getEnvFile } from '@/helpers/env';
import { defineConfig } from 'drizzle-kit';

console.log({
  environment: env.NODE_ENV,
  envFile: getEnvFile(),
  databaseUrl: env.DATABASE_URL,
});

export default defineConfig({
  schema: './src/database/db-schemas.ts',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  casing: 'snake_case',
  verbose: true,
  strict: true,
});
