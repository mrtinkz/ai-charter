import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/charter', label: 'Charter' },
  { to: '/registry', label: 'Registry' },
  { to: '/certify', label: 'Certify' },
  { to: '/placards', label: 'Placards' },
  { to: '/schema', label: 'Schema' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
]

const REPO_URL = 'https://github.com/mrtinkz/ai-charter'

function navClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'text-blue-600 font-semibold'
    : 'text-black hover:text-blue-600'
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.2-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0C17.9 5.4 18.87 5.7 18.87 5.7c.63 1.59.23 2.76.11 3.05.75.81 1.2 1.83 1.2 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl flex items-center justify-between gap-4 px-4 py-4">
          <NavLink
            to="/"
            className="flex items-center gap-2 font-semibold text-lg tracking-tight text-black"
            onClick={() => setMenuOpen(false)}
          >
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width={28} height={28} />
            Universal AI Charter
          </NavLink>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded p-2 text-black hover:text-blue-600"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>

          <nav id="site-nav" className="hidden md:flex items-center gap-5 text-sm">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                {item.label}
              </NavLink>
            ))}
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-600"
              aria-label="View source on GitHub"
              title="View source on GitHub"
            >
              <GitHubIcon />
            </a>
          </nav>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-slate-200">
            <div className="mx-auto max-w-4xl flex flex-col px-4 py-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={navClass}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="block py-2">{item.label}</span>
                </NavLink>
              ))}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 text-black hover:text-blue-600"
                aria-label="View source on GitHub"
                onClick={() => setMenuOpen(false)}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-10">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-slate-200 text-sm text-black/70">
        <div className="mx-auto max-w-4xl px-4 py-6">
          A global, plain-language guide to AI development. Not legal advice, not a government filing.
        </div>
      </footer>
    </div>
  )
}
