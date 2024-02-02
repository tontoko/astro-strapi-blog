import {
  component$,
  useSignal,
  useResource$,
  Resource,
  Fragment,
} from "@builder.io/qwik"
import type { GetCommentsType } from "../../pages/api/comments/[post_id]"

export interface CommentFormProps {
  post_id: number
  origin: string
}

export const CommentForm = component$<CommentFormProps>(
  ({ post_id, origin }) => {
    const currentPage = useSignal(1)

    const commentsResource = useResource$<GetCommentsType>(
      async ({ track, cleanup }) => {
        const page = track(() => currentPage.value)
        const abortController = new AbortController()
        cleanup(() => abortController.abort("cleanup"))
        const res = await fetch(
          `${origin}/api/comments/${post_id}?page=${page}`,
          {
            signal: abortController.signal,
          },
        )
        const data = await res.json()

        return data as GetCommentsType
      },
    )

    return (
      <Fragment>
        <h1>Comment一覧</h1>
        <Resource
          value={commentsResource}
          onResolved={({ comments, count }) => {
            return (
              <Fragment>
                {comments.map((comment) => (
                  <div key={comment.id}>
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
              </Fragment>
            )
          }}
          onPending={() => <div>Loading...</div>}
          onRejected={(error) => <div>{error.message}</div>}
        />
      </Fragment>
    )
  },
)
