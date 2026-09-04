import { ArrowRight } from 'lucide-react'
import { SectionShell, Eyebrow, Display, Lede, Reveal } from '../components/Primitives'
import { Film } from '../components/Media'
import { MODULES, CONTACT } from '../data/site'

export default function Modules() {
  return (
    <>
      <SectionShell label="Modules" className="bg-ink-950 pt-32 sm:pt-36" rule={false}>
        <Reveal>
          <Eyebrow>Modules</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <Display as="h1" className="mt-6 max-w-[14ch]">
            Fourteen parts. One platform.
          </Display>
        </Reveal>
        <Reveal delay={0.16}>
          <Lede className="mt-7 max-w-[52ch]">
            Start with the surfaces you need today and switch the rest on later. Nothing has to be
            migrated, because nothing was ever a separate system.
          </Lede>
        </Reveal>
      </SectionShell>

      <SectionShell label="Module list" className="cv-auto bg-ink-900">
        <div className="grid gap-x-14 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m, i) => (
            <Reveal key={m.name} delay={Math.min(i, 4) * 0.06}>
              <div className="border-t border-white/8 py-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-4 text-[1.25rem] font-bold tracking-tight text-white">{m.name}</h2>
                <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-white/55">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell label="Sales boosters" className="cv-auto bg-ink-950">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Film
            src="/video/hw-boosters.mp4"
            poster="/images/poster/hw-boosters.jpg"
            ratio="portrait"
            className="border border-white/8"
            label="Sales Boosters"
          />
          <div>
            <Reveal>
              <Eyebrow>Built into the flow</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <Display className="mt-6 max-w-[14ch]">The screen asks every time.</Display>
            </Reveal>
            <Reveal delay={0.18}>
              <Lede className="mt-7 max-w-[46ch]">
                Add-on prompts, product badges, spend tiers and offer triggers are part of the
                ordering flow rather than a campaign someone has to remember to run.
              </Lede>
            </Reveal>
          </div>
        </div>
      </SectionShell>

      <SectionShell label="Arrange a demo" className="cv-auto bg-ink-900">
        <Reveal>
          <Display className="max-w-[15ch]">Walk through the ones you need.</Display>
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
