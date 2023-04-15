import { getImage } from "@astrojs/image"
import highlight from "highlight.js"
import { marked } from "marked"

export const parseWithCustomRenderer = async ({
  content,
  imageSize,
}: {
  content: string
  imageSize: "xl" | "sm"
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
  renderer.image = (href, title, text) => {
    return `<img loading="lazy" alt="${text}" title="${title}" src="${href}" width="${
      imageSize === "xl" ? 655 : 300
    }" height="${imageSize === "xl" ? 368.4375 : 169}">`
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
      const image = await getImage({
        width: imageSize === "xl" ? 1310 : 600,
        height: imageSize === "xl" ? 736 : 338,
        format: "webp",
        src: `${import.meta.env.PUBLIC_BACKEND_URL}${href}`,
        alt: text,
      })
      if (image.src) token.href = image.src
    }
  }
  marked.use({ walkTokens, async: true })
  const parsedMarkdown = await marked.parse(content, {
    async: true,
  })

  return { parsedMarkdown, toc }
}
