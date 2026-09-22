import { Link } from 'react-router-dom'
import { BLOG_POSTS } from '../data/blogPosts'
import { useSeo } from '../hooks/useSeo'

export default function Blog() {
  useSeo({
    title: 'Blog: AI Governance, Agentic Risk, and Why Development Should Not Slow Down',
    description:
      'Posts on AI governance, agentic AI risk, and AI danger, written from the charter\'s position: disclosure and certification over a development slowdown.',
    path: '/blog',
  })

  const posts = [...BLOG_POSTS].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold m-0">Blog</h1>
        <p className="mt-2 text-black/70">
          Short posts on AI governance, agentic AI risk, and why this charter argues for disclosure over a
          slowdown.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-slate-200 pb-6">
            <p className="text-black/50 text-xs m-0">{post.datePublished}</p>
            <h2 className="text-xl font-semibold mt-1 mb-2">
              <Link to={`/blog/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="text-black/70 m-0">{post.dek}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
