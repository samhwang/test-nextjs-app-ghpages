import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

function mapPostData(fileName, postsDirectory) {
  // Remove ".md" from file name to get id
  const id = fileName.replace(/\.md$/, '')

  // Read markdown file as string
  const fullPath = join(postsDirectory, fileName)
  const fileContents = readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}

export function getSortedPostsData() {
  const postsDirectory = join(process.cwd(), 'posts')

  // Get file names under /posts
  const fileNames = readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) =>
    mapPostData(fileName, postsDirectory)
  )

  // Sort posts by date
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}