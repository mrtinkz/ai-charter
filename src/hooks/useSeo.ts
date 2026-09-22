import { useEffect } from 'react'

const SITE_NAME = 'Universal AI Charter'
const SITE_URL = 'https://mrtinkz.github.io/ai-charter'

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

interface SeoOptions {
  /** Page title, rendered as "{title} | Universal AI Charter". */
  title: string
  description: string
  /** Route path starting with "/", e.g. "/charter". */
  path: string
}

/** Updates document title, meta description, canonical link, and OG/Twitter tags per route. */
export function useSeo({ title, description, path }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`
    const url = `${SITE_URL}${path}`

    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path])
}
