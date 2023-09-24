import { getImage } from "astro:assets"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"
import { marked, type Token } from "marked"
import type { GetImageResult, ImageTransform } from "astro"

export const parseWithCustomRenderer = async ({
  content,
  small = false,
}: {
  content: string
  small?: boolean
}) => {
  const toc: {
    level: number
    slug: string
    title: string
  }[] = []

  const renderer = new marked.Renderer({ async: true })

  const allImages: Record<string, GetImageResult> = {}
  const walkTokens = async (token: Token) => {
    if (token.type === "image") {
      const { href, text } = token
      const result = await getImage({
        src: href,
        height: 640,
        width: 640,
      } satisfies ImageTransform)
      allImages[text] = result
    }
  }

  renderer.link = (href, title, text) => {
    if (href?.match(import.meta.env.PUBLIC_BACKEND_URL))
      return `<a href="${href}" title="${title}" rel="prefetch">${text}</a>\n`
    return `<a href="${href}" title="${title}" target="_blank" rel="noopener noreferrer">${text}</a>\n`
  }
  renderer.heading = (text, level) => {
    const slug = encodeURI(text.toLowerCase())
    toc.push({
      level: level,
      slug: slug,
      title: text,
    })
    const realLevel = small ? level + 1 : level
    return (
      "<h" +
      realLevel +
      ' id="' +
      slug +
      '">' +
      text +
      "</h" +
      realLevel +
      ">\n"
    )
  }
  renderer.image = (href, title, text) => {
    const { src, attributes } = allImages[text]
    return `<img src="${src}" alt="${text}" ${Object.keys(attributes)
      .map((key) => `${key}="${attributes[key]}"`)
      .join(" ")} class="max-w-xs"></img>`
  }
  marked.setOptions({
    renderer,
  })

  marked.use(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code: string, lang: string) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext"
        return hljs.highlight(code, { language }).value
      },
    }),
    {
      walkTokens,
      async: true,
    },
  )
  const parsedMarkdown = await marked.parse(content, {
    async: true,
  })

  return { parsedMarkdown, toc }
}
