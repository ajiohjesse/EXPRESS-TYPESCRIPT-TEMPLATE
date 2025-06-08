import { env } from "@/libs/env";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: "snake_case",
  logger: env.isDev,
});

export default db;
