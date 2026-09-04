import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { CONTACT } from '../data/site'
import { asset } from './Media'

const LINKS = [
  { to: '/hardware', label: 'Hardware' },
  { to: '/modules', label: 'Modules' },
  { to: '/contact', label: 'Contact' },
]

/* The nav is the one thing NOT lazy-loaded — it is on screen before any route resolves. */
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [lifted, setLifted] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        lifted || open ? 'border-b border-white/8 bg-ink-950/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 sm:px-10" aria-label="Primary">
        <Link to="/" className="flex items-center gap-3" aria-label="QPOS — home">
          <img src={asset('/qbot-mark-light.svg')} alt="" aria-hidden="true" className="h-7 w-7" />
          <span className="text-sm font-semibold tracking-tight text-white">QPOS</span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-tight transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-white/55 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-500 px-5 py-2.5 text-sm font-semibold tracking-tight text-ink-950 transition-colors duration-300 hover:bg-accent-600"
          >
            Arrange a demo
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="p-1 text-white md:hidden"
        >
          {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
        </button>
      </nav>

      <div id="mobile-nav" hidden={!open} className="border-t border-white/8 md:hidden">
        <div className="flex flex-col gap-1 px-6 py-5">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="py-2.5 text-base tracking-tight text-white/75">
              {l.label}
            </NavLink>
          ))}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 bg-accent-500 px-5 py-3 text-center text-sm font-semibold text-ink-950"
          >
            Arrange a demo
          </a>
        </div>
      </div>
    </header>
  )
}
