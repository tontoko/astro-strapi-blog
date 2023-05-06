import { getPicture } from "@astrojs/image"
import type { GetPictureResult } from "@astrojs/image/dist/lib/get-picture"
import { markedHighlight } from "marked-highlight"
import hljs from "highlight.js"
import { marked } from "marked"

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

  const allImages: Record<string, GetPictureResult> = {}
  const walkTokens = async (token: marked.Token) => {
    if (token.type === "image") {
      const { href, text } = token
      const result = await getPicture({
        widths: [640, 768, 892, 1280],
        aspectRatio: "16:9",
        src: href,
        alt: text,
        formats: ["webp", "avif"],
        fit: "inside",
      })
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
    return `<picture>${allImages[text].sources
      .map(({ type, srcset }) => `<source type="${type}" srcset="${srcset}">`)
      .join("")}<img ${Object.keys(allImages[text].image)
      .map(
        (key) =>
          `${key}=${
            allImages[text].image[key as keyof astroHTML.JSX.ImgHTMLAttributes]
          }`
      )
      .join(" ")} class="${small ? "max-w-xs" : ""}" ></picture>`
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
    }
  )
  const parsedMarkdown = await marked.parse(content, {
    async: true,
  })

  return { parsedMarkdown, toc }
}
