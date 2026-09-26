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

function navClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? 'text-blue-600 font-semibold'
    : 'text-black hover:text-blue-600'
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

          <nav id="site-nav" className="hidden md:flex gap-5 text-sm">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                {item.label}
              </NavLink>
            ))}
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
