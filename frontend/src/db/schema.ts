import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const comments = sqliteTable("comments", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  comment: text("comment").notNull(),
  post_id: integer("post_id", { mode: "number" }).notNull(),
})
