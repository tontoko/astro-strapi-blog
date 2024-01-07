import { component$, useSignal, useResource$, Resource } from "@builder.io/qwik"
import type { GetCommentsType } from "../../pages/api/comments/[post_id]"

export interface CommentFormProps {
  post_id: number
  initialData: GetCommentsType
}

export const CommentForm = component$<CommentFormProps>(
  ({ post_id, initialData }) => {
    const currentPage = useSignal(1)

    const commentsResource = useResource$<GetCommentsType>(
      async ({ track, cleanup }) => {
        const page = track(() => currentPage.value)
        if (typeof window === "undefined") {
          return initialData
        }
        const abortController = new AbortController()
        cleanup(() => abortController.abort("cleanup"))
        const res = await fetch(`/api/comments/${post_id}.json?page=${page}`, {
          signal: abortController.signal,
        })
        const data = await res.json()

        return data as GetCommentsType
      },
    )

    return (
      <>
        <Resource
          value={commentsResource}
          onResolved={({ comments, count }) => {
            return (
              <>
                {comments.map((comment) => (
                  <div>
                    <p>{comment.id}</p>
                    <p>{comment.comment}</p>
                  </div>
                ))}

                <button
                  type="button"
                  onClick$={() => {
                    currentPage.value--
                  }}
                  disabled={currentPage.value === 1}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick$={() => {
                    currentPage.value++
                  }}
                  disabled={count / 10 <= currentPage.value}
                >
                  Next
                </button>
              </>
            )
          }}
          onPending={() => <div>Loading...</div>}
          onRejected={(error) => <div>{error.message}</div>}
        />
      </>
    )
  },
)
