import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import Charter from './pages/Charter'
import Certify from './pages/Certify'
import Registry from './pages/Registry'
import Faq from './pages/Faq'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Placards from './pages/Placards'
import Schema from './pages/Schema'
import { BLOG_POSTS } from './data/blogPosts'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, element: <Home /> },
      { path: 'charter', element: <Charter /> },
      { path: 'registry', element: <Registry /> },
      { path: 'certify', element: <Certify /> },
      { path: 'placards', element: <Placards /> },
      { path: 'schema', element: <Schema /> },
      { path: 'faq', element: <Faq /> },
      { path: 'blog', element: <Blog /> },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
        getStaticPaths: () => BLOG_POSTS.map((post) => `/blog/${post.slug}`),
      },
    ],
  },
]
