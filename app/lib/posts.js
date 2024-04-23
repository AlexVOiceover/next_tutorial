import fs from 'fs'
import path from 'path'
import Newsletter from '../components/Newsletter'

import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
const prettyCodeOptions = {
  theme: 'one-dark-pro',
  grid: false,
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['highlighted', 'word']
  }
}

const rootDirectory = path.join(process.cwd(), 'content')

export async function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })

  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    components: { Newsletter: Newsletter },
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [rehypePrettyCode, prettyCodeOptions]
      }
    }
  })

  return { content, frontmatter, slug: realSlug }
}

export async function getAllPosts() {
  const files = fs.readdirSync(rootDirectory)

  let posts = []

  for (const file of files) {
    const post = await getPostBySlug(file)
    posts.push(post)
  }
  return posts
}
