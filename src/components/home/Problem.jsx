import { Film } from '../Media'
import { Reveal } from '../Primitives'
import { MOVING_PARTS } from '../../data/site'

/* Full-bleed band: opts out of SectionShell and sets its own padding by hand,
   matched to the shell so the copy column still lines up with the sections above. */
export default function Problem() {
  return (
    <section id="problem" aria-label="What a counter runs on today" className="cv-auto relative bg-ink-900">
      <Film
        src="/video/problem.mp4"
        poster="/images/poster/problem.jpg"
        ratio="fill"
        label="Counter"
      />
      {/* Stops are placed against the copy column, which ends at ~60% of the width:
          solid ink under all of the text, clear picture past 85%. A flat wash over the
          whole frame reads "too dark" and throws away the half nobody reads over. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#060807_0%,rgba(6,8,7,0.94)_55%,rgba(6,8,7,0.55)_72%,rgba(6,8,7,0)_88%)]"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 sm:px-10 sm:py-28 lg:py-32">
        <div className="sol-rule mb-10 w-full sm:mb-12" />
        <div className="max-w-[52rem]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">The count</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="hero-type mt-6 max-w-[14ch] text-[clamp(2.1rem,5vw,4.6rem)] font-bold leading-[1.02] tracking-tight text-white">
              You already run all of it.
            </h2>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {MOVING_PARTS.map((part, i) => (
              /* Staggered, but capped: past ~4 steps the last item arrives long after
                 the reader got there. 0.05 keeps a ten-item list inside half a second. */
              <Reveal key={part} delay={Math.min(i, 4) * 0.05} y={18}>
                <li className="flex items-baseline gap-5 border-b border-white/8 py-4">
                  <span className="text-[11px] font-semibold tabular-nums tracking-widest text-white/35">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[clamp(1rem,1.4vw,1.35rem)] leading-snug text-white/75">{part}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2}>
            <p className="mt-12 max-w-[44ch] text-[clamp(1rem,1.15vw,1.2rem)] leading-relaxed text-white/55">
              Ten things to buy, learn, renew and reconcile. Each one holds a piece of the same
              evening.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
