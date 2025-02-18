import { env } from '@/helpers/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './db-schemas';

const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: 'snake_case',
  logger: env.isDev,
});

export default db;
