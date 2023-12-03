import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const comments = sqliteTable("comments", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
  comment: text("comment"),
})
