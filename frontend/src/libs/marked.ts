import { getImage, getPicture } from "@astrojs/image"
import type { GetPictureResult } from "@astrojs/image/dist/lib/get-picture"
import highlight from "highlight.js"
import { marked } from "marked"

export const parseWithCustomRenderer = async ({
  content,
}: {
  content: string
}) => {
  const toc: {
    level: number
    slug: string
    title: string
  }[] = []

  const renderer = new marked.Renderer({ async: true })
  renderer.heading = (text, level) => {
    const slug = encodeURI(text.toLowerCase())
    toc.push({
      level: level,
      slug: slug,
      title: text,
    })
    return "<h" + level + ' id="' + slug + '">' + text + "</h" + level + ">\n"
  }
  const allImages: Record<string, GetPictureResult> = {}
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
      .join(" ")} ></picture>`
  }
  marked.setOptions({
    renderer,
    highlight: (code) => {
      return highlight.highlightAuto(code).value
    },
  })
  const walkTokens = async (token: marked.Token) => {
    if (token.type === "image") {
      const { href, text } = token
      const result = await getPicture({
        widths: [700, 1000, 1300],
        aspectRatio: "16:9",
        src: href,
        alt: text,
        formats: ["webp", "avif"],
        fit: "inside",
      })
      allImages[text] = result
    }
  }
  marked.use({ walkTokens, async: true })
  const parsedMarkdown = await marked.parse(content, {
    async: true,
  })

  return { parsedMarkdown, toc }
}
