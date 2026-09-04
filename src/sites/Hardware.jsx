import { ArrowRight } from 'lucide-react'
import { SectionShell, Eyebrow, Display, Lede, Reveal } from '../components/Primitives'
import { Film, Still, Frame } from '../components/Media'
import { HARDWARE, CONTACT } from '../data/site'

export default function Hardware() {
  return (
    <>
      <SectionShell label="Hardware" className="bg-ink-950 pt-32 sm:pt-36" rule={false}>
        <Reveal>
          <Eyebrow>Hardware</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <Display as="h1" className="mt-6 max-w-[13ch]">
            Built to be left alone.
          </Display>
        </Reveal>
        <Reveal delay={0.16}>
          <Lede className="mt-7 max-w-[52ch]">
            Every unit takes cards, e-wallets and QR on the body, updates its menu from the cloud,
            and runs the same software as every other surface you own.
          </Lede>
        </Reveal>
      </SectionShell>

      <SectionShell label="Hardware range" className="cv-auto bg-ink-900">
        <div className="space-y-16 lg:space-y-24">
          {HARDWARE.map((item, i) => (
            <article
              key={item.id}
              id={item.id}
              className={`grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20 ${
                i % 2 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <Frame>
                {item.kind === 'film' ? (
                  <Film src={item.video} poster={item.poster} ratio="portrait" label={item.name} />
                ) : (
                  <Still src={item.image} ratio="portrait" alt={`${item.name} — ${item.line}`} label={item.name} />
                )}
              </Frame>
              <div>
                <Reveal>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                    Unit {String(i + 1).padStart(2, '0')}
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="mt-6 text-[clamp(1.8rem,3.2vw,2.8rem)] font-bold leading-[1.06] tracking-tight text-white">
                    {item.name}
                  </h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-3 text-[clamp(1rem,1.3vw,1.2rem)] text-white/75">{item.line}</p>
                </Reveal>
                <Reveal delay={0.24}>
                  <p className="mt-6 max-w-[48ch] leading-relaxed text-white/55">{item.body}</p>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell label="Arrange a demo" className="cv-auto bg-ink-950">
        <Reveal>
          <Display className="max-w-[14ch]">Try one at the showroom.</Display>
        </Reveal>
        <Reveal delay={0.12}>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 bg-accent-500 px-7 py-3.5 text-sm font-semibold tracking-tight text-ink-950 transition-colors duration-300 hover:bg-accent-600"
          >
            Arrange a demo
            <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </SectionShell>
    </>
  )
}
