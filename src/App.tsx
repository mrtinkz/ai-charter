import { Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="charter" element={<Charter />} />
        <Route path="registry" element={<Registry />} />
        <Route path="certify" element={<Certify />} />
        <Route path="placards" element={<Placards />} />
        <Route path="schema" element={<Schema />} />
        <Route path="faq" element={<Faq />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
      </Route>
    </Routes>
  )
}

export default App
