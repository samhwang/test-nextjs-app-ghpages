import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const POST_DIRECTORY = join(process.cwd(), 'posts')

function mapPostData(fileName) {
  // Remove ".md" from file name to get id
  const id = fileName.replace(/\.md$/, '')

  // Read markdown file as string
  const fullPath = join(POST_DIRECTORY, fileName)
  const fileContents = readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}

function sortPosts(firstPost, secondPost) {
  return firstPost.date < secondPost.date ? 1 : -1
}

export function getSortedPostsData() {
  const fileNames = readdirSync(POST_DIRECTORY)

  return fileNames.map(mapPostData).sort(sortPosts)
}

function mapPostDataId(fileName) {
  return { params: { id: fileName.replace(/\.md$/, '') } }
}

export function getAllPostIds() {
  const fileNames = readdirSync(POST_DIRECTORY)
  return fileNames.map(mapPostDataId)
}

export async function getPostData(id) {
  const fullPath = join(POST_DIRECTORY, `${id}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}