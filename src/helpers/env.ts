import dotenv from 'dotenv';
import { cleanEnv, port, str, testOnly } from 'envalid';
dotenv.config({ path: getEnvFile() });

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development' }),
  PORT: port({ default: 8000 }),
  DATABASE_URL: str({
    default: testOnly('postgresql://test:test@localhost:5432/test_db'),
  }),
});

export function getEnvFile() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.production.local';
    case 'staging':
      return '.env.staging.local';
    case 'test':
      return '.env.test';
    default:
      return '.env.local';
  }
}
