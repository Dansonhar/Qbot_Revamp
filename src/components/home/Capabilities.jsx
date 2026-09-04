import { SectionShell, Eyebrow, Display, Lede, Reveal } from '../Primitives'
import { CAPABILITIES } from '../../data/site'

export default function Capabilities() {
  return (
    <SectionShell id="what-it-does" label="What the system does" className="cv-auto bg-ink-950">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>What it does</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Display className="mt-6 max-w-[12ch]">Six jobs, one record.</Display>
          </Reveal>
          <Reveal delay={0.16}>
            <Lede className="mt-7 max-w-[40ch]">
              Nothing here is a separate product with its own login. Every part below reads and
              writes the same order, the same customer and the same takings.
            </Lede>
          </Reveal>
        </div>

        <div className="grid gap-x-14 gap-y-0 sm:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.n} delay={Math.min(i, 4) * 0.08}>
              <div className="border-t border-white/8 py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">System {c.n}</p>
                <h3 className="mt-5 text-[clamp(1.35rem,2vw,1.8rem)] font-bold leading-tight tracking-tight text-white">
                  {c.title}
                </h3>
                <p className="mt-4 max-w-[44ch] leading-relaxed text-white/55">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
