import { Link, Navigate, useParams } from 'react-router-dom'
import { getBlogPost } from '../data/blogPosts'
import { Seo } from '../components/Seo'
import { JsonLd } from '../components/JsonLd'

export default function BlogPost() {
  const { slug = '' } = useParams()
  const post = getBlogPost(slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const blogPostJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: 'Vikram Palakurthi',
      sameAs: 'https://github.com/mrtinkz',
    },
    publisher: { '@type': 'Organization', name: 'Universal AI Charter' },
    license: 'https://creativecommons.org/licenses/by/4.0/',
    mainEntityOfPage: `https://mrtinkz.github.io/ai-charter/blog/${post.slug}`,
    ...(post.sources && post.sources.length > 0
      ? { citation: post.sources.map((source) => ({ '@type': 'CreativeWork', name: source.citation, url: source.url })) }
      : {}),
  }

  return (
    <article className="flex flex-col gap-6 max-w-2xl">
      <Seo title={post.title} description={post.description} path={`/blog/${post.slug}`} />
      <JsonLd data={blogPostJsonLd} />
      <div>
        <Link to="/blog" className="text-sm text-blue-600 font-medium">
          Blog
        </Link>
        <h1 className="text-3xl font-semibold mt-1 mb-2">{post.title}</h1>
        <p className="text-black/60 text-sm m-0">{post.dek}</p>
        <p className="text-black/50 text-xs mt-2 m-0">
          By Vikram Palakurthi ·{' '}
          <time dateTime={post.datePublished}>
            {new Date(post.datePublished).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
      </div>

      {post.sections.map((section, index) => (
        <div key={section.heading ?? index} className="flex flex-col gap-4">
          {section.heading && <h2 className="text-xl font-semibold mt-2">{section.heading}</h2>}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </div>
      ))}

      {post.sources && post.sources.length > 0 && (
        <section className="mt-4 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-semibold mt-0 mb-3">References</h2>
          <ol className="flex flex-col gap-3 text-sm text-black/70 pl-5 m-0">
            {post.sources.map((source) => (
              <li key={source.url}>
                {source.citation}{' '}
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 break-words"
                >
                  {source.url}
                </a>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  )
}
