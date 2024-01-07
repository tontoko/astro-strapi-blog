import type { APIRoute } from "astro"
import { getDbClient } from "../../../../db"
import { comments } from "../../../../db/schema"
import { desc, eq, sql } from "drizzle-orm"

export const prerender = false

export type GetCommentsType = {
  comments: (typeof comments.$inferSelect)[]
  count: number
}

export const GET: APIRoute = async ({ url, params, locals }) => {
  const db = getDbClient(locals.runtime)
  const post_id = Number(params.post_id)
  const page = Number(url.searchParams.get("page"))

  if (isNaN(post_id) || isNaN(page)) {
    return new Response(null, { status: 400 })
  }

  const result = await db
    .select()
    .from(comments)
    .where(eq(comments.post_id, post_id))
    .orderBy(desc(comments.id))
    .offset((page - 1) * 10)
    .limit(10)

  const { count } = (
    await db
      .select({
        count: sql<number>`count(*)`.mapWith(Number),
      })
      .from(comments)
      .where(eq(comments.post_id, post_id))
  )[0]

  return new Response(
    JSON.stringify({ comments: result, count } satisfies GetCommentsType),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
}

export const POST: APIRoute = async ({ params, locals }) => {
  const db = getDbClient(locals.runtime)
  let validateError = false

  const values: typeof comments.$inferInsert = Object.fromEntries(
    Object.values(params).map((v) => {
      if (!!v && Object.keys(comments.$inferInsert).includes(v)) {
        return [v as keyof typeof comments.$inferInsert, params[v]]
      }
      validateError = true
      return []
    }),
  )

  const insertParams = { ...values, post_id: Number(params.post_id) }

  if (validateError) {
    return new Response(null, { status: 400 })
  }

  const result = await db.insert(comments).values(insertParams)

  return new Response(JSON.stringify(result), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
