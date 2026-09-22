import { Link, Navigate, useParams } from 'react-router-dom'
import { getBlogPost } from '../data/blogPosts'
import { useSeo } from '../hooks/useSeo'
import { useJsonLd } from '../hooks/useJsonLd'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const post = getBlogPost(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  useSeo({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  })

  useJsonLd('blog-post-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { '@type': 'Organization', name: 'Universal AI Charter' },
    publisher: { '@type': 'Organization', name: 'Universal AI Charter' },
    mainEntityOfPage: `https://mrtinkz.github.io/ai-charter/blog/${post.slug}`,
  })

  return (
    <article className="flex flex-col gap-6 max-w-2xl">
      <div>
        <Link to="/blog" className="text-sm text-blue-600 font-medium">
          Blog
        </Link>
        <h1 className="text-3xl font-semibold mt-1 mb-2">{post.title}</h1>
        <p className="text-black/60 text-sm m-0">{post.dek}</p>
      </div>

      {post.sections.map((section, index) => (
        <div key={section.heading ?? index} className="flex flex-col gap-4">
          {section.heading && <h2 className="text-xl font-semibold mt-2">{section.heading}</h2>}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </div>
      ))}
    </article>
  )
}
