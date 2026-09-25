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
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <header className="border-b border-slate-200">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-4 py-4">
          <NavLink to="/" className="font-semibold text-lg tracking-tight text-black">
            Universal AI Charter
          </NavLink>
          <nav className="flex gap-5 text-sm">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
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
