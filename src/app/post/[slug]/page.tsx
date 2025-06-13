import { posts, categories } from '../../../../.velite'

type Props = {
  params: {
    slug: string
  }
}

export default async function Post({params}:Props){
    const { slug } = await params;
    const post = posts.find(e => e.slug == slug)
    
    return (
        <>
            <div><h1>{post?.title}</h1></div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </>
    )
}