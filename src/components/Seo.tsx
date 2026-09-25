import { Head } from 'vite-react-ssg'

const SITE_NAME = 'Universal AI Charter'
const SITE_URL = 'https://mrtinkz.github.io/ai-charter'
// Same icon as the browser tab favicon, so social/search previews match the site icon.
const SITE_IMAGE = `${SITE_URL}/favicon.svg`

interface SeoProps {
  /** Page title, rendered as "{title} | Universal AI Charter". */
  title: string
  description: string
  /** Route path starting with "/", e.g. "/charter". */
  path: string
}

/** Emits per-route title, description, canonical, and OG/Twitter tags into the document head at build and runtime. */
export function Seo({ title, description, path }: SeoProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={SITE_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_IMAGE} />
    </Head>
  )
}
