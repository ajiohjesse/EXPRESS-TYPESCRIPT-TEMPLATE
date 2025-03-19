import dotenv from 'dotenv';
import { cleanEnv, port, str, testOnly } from 'envalid';
dotenv.config({ path: getEnvFile() });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  PORT: port({ default: 8000 }),
  DATABASE_URL: str({
    default: testOnly('postgresql://test:test@localhost:5432/test_db'),
  }),
  ADMIN_TOKEN: str({ default: testOnly('admin') }),
});

export function getEnvFile() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.production';
    case 'staging':
      return '.env.staging';
    case 'test':
      return '.env.test';
    default:
      /**
       * NOTE: Prefer .env.local over .env.
       * Using .env will cause drizzle config to load the variables
       * automatically from .env, bypassing our custom dotenv config.
       */
      return '.env.local';
  }
}
