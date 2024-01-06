import { component$, useVisibleTask$, useSignal } from "@builder.io/qwik"
import type { comments } from "../../db/schema"

export interface CommentFormProps {
  post_id: number
}

export const CommentForm = component$<CommentFormProps>(({ post_id }) => {
  const currentPage = useSignal(1)
  const responseJson = useSignal<(typeof comments.$inferSelect)[] | undefined>(
    undefined,
  )

  useVisibleTask$(async ({ track }) => {
    track(() => currentPage.value)
    const res = await fetch(
      `/api/comments/${post_id}.json?page=${currentPage.value}`,
    )
    const json = (await res.json()) satisfies (typeof comments.$inferSelect)[]
    responseJson.value = json
  })

  return (
    <>
      {responseJson.value?.map((comment) => (
        <div>
          <p>{comment.id}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </>
  )
})
