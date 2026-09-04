import { SectionShell, Eyebrow, Display, Lede, Reveal } from '../Primitives'
import { Film } from '../Media'
import { PAIRS } from '../../data/site'

/* Before / after pairs run full width and sit side by side from sm: up.
   Squeezed into a column the comparison stops being one. */
export default function Configured() {
  return (
    <SectionShell id="configured" label="Configured, not templated" className="cv-auto bg-ink-900">
      <div className="max-w-[52rem]">
        <Reveal>
          <Eyebrow>Configured, not templated</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <Display className="mt-6 max-w-[15ch]">The same job, moved off the counter.</Display>
        </Reveal>
        <Reveal delay={0.16}>
          <Lede className="mt-7 max-w-[46ch]">
            Nothing is taken away. The work that used to wait on a person is handled by the screen
            that is already there.
          </Lede>
        </Reveal>
      </div>

      <div className="mt-16 space-y-16">
        {PAIRS.map((pair, pi) => (
          <div key={pair.id}>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                Step {String(pi + 1).padStart(2, '0')} — {pair.eyebrow}
              </p>
            </Reveal>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[pair.before, pair.after].map((side, si) => (
                <Reveal key={side.caption} delay={si * 0.12}>
                  <figure>
                    <Film src={side.video} poster={side.poster} ratio="wide" label={side.caption} />
                    <figcaption className="pt-5">
                      <p className="text-[1.05rem] font-bold tracking-tight text-white">{side.caption}</p>
                      <p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-white/55">{side.body}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
