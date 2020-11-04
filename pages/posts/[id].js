import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return { props: { postData } }
}

export default function Post({ postData }) {
  const { title, id, date, contentHtml } = postData

  return (
    <Layout>
      {title}
      <br />
      {id}
      <br />
      {date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  )
}