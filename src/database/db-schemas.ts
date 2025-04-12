import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const postTable = pgTable(
  "posts",
  {
    id: serial().primaryKey(),
    title: text().notNull(),
    content: text().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  table => [index().on(table.title)]
);
