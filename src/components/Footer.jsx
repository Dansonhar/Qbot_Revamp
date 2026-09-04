import { Link } from 'react-router-dom'
import { CONTACT } from '../data/site'
import { asset } from './Media'

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink-950 px-6 py-14 sm:px-10 sm:py-16" aria-label="Site footer">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src={asset('/qbot-mark-light.svg')} alt="" aria-hidden="true" className="h-7 w-7" />
              <span className="text-sm font-semibold tracking-tight text-white">QPOS</span>
            </div>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-white/55">
              Ordering, queueing, entry, payment and reporting on one system. Built and supported from
              Kuala Lumpur.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">Pages</p>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ['/', 'Overview'],
                ['/hardware', 'Hardware'],
                ['/modules', 'Modules'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/55 transition-colors duration-300 hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">Showroom</p>
            <ul className="mt-5 space-y-3 text-sm text-white/55">
              <li>{CONTACT.showroom}</li>
              <li>{CONTACT.hours}</li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-white"
                >
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="sol-rule mt-14 w-full" />
        <p className="mt-6 text-xs text-white/35">© {new Date().getFullYear()} QPOS. All rights reserved.</p>
      </div>
    </footer>
  )
}
