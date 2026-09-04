import { useSearchParams, Link } from 'react-router-dom'
import { ArrowRight, MapPin, Clock, Phone } from 'lucide-react'
import { SectionShell, Eyebrow, Display, Lede, Reveal } from '../components/Primitives'
import { Film } from '../components/Media'
import { CONTACT, INDUSTRIES } from '../data/site'

export default function Contact() {
  const [params] = useSearchParams()
  /* The industry selector on the home page presses through to here with ?for=<id>,
     so the trade the visitor picked is already named in the message they send. */
  const industry = INDUSTRIES.find((i) => i.id === params.get('for'))

  const message = industry
    ? `Hi QPOS, I run a ${industry.name.toLowerCase()} business and I'd like to arrange a demo`
    : "Hi QPOS, I'd like to arrange a demo"
  const href = `https://wa.me/60126909189?text=${encodeURIComponent(message)}`

  return (
    <>
      <SectionShell label="Contact" className="bg-ink-950 pt-32 sm:pt-36" rule={false}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>{industry ? industry.name : 'Contact'}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Display as="h1" className="mt-6 max-w-[13ch]">
                Come and use it.
              </Display>
            </Reveal>
            <Reveal delay={0.16}>
              <Lede className="mt-7 max-w-[46ch]">
                {industry
                  ? industry.detail
                  : 'The showroom runs the full system — counter, handheld, kiosk and gate — with live payments. Bring your menu and we will load it.'}
              </Lede>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-12 space-y-5 border-t border-white/8 pt-8">
                {[
                  [MapPin, 'Showroom', CONTACT.showroom],
                  [Clock, 'Open', CONTACT.hours],
                  [Phone, 'WhatsApp', CONTACT.phone],
                ].map(([Icon, label, value]) => (
                  <li key={label} className="flex items-start gap-4">
                    <Icon size={16} strokeWidth={1.5} aria-hidden="true" className="mt-1 shrink-0 text-white/45" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">{label}</p>
                      <p className="mt-1.5 text-white/75">{value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.32}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-10 inline-flex items-center gap-2 bg-accent-500 px-7 py-3.5 text-sm font-semibold tracking-tight text-ink-950 transition-colors duration-300 hover:bg-accent-600"
              >
                Message us on WhatsApp
                <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>

          <Film
            src={industry ? industry.portrait : '/video/ct-hero.mp4'}
            poster={industry ? industry.portraitPoster : '/images/poster/ct-hero.jpg'}
            ratio="portrait"
            className="border border-white/8"
            label="Showroom"
          />
        </div>
      </SectionShell>

      {!industry && (
        <SectionShell label="Choose your trade" className="cv-auto bg-ink-900">
          <Reveal>
            <Eyebrow>Or tell us the trade</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-x-14 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((i) => (
              <Link
                key={i.id}
                to={`/contact?for=${i.id}`}
                className="group flex items-baseline justify-between gap-4 border-t border-white/8 py-5"
              >
                <span className="text-[1.05rem] tracking-tight text-white/55 transition-colors duration-300 group-hover:text-white">
                  {i.name}
                </span>
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 translate-y-0.5 text-white/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        </SectionShell>
      )}
    </>
  )
}
