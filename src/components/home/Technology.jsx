import { SectionShell, Eyebrow, Display, Lede, Reveal } from '../Primitives'
import { Film, Still, Frame } from '../Media'
import { HARDWARE } from '../../data/site'

/* A 3-column grid at lg. Six tiles divide evenly, so no filler cell is needed here —
   if a seventh product is ever added, add an aria-hidden filler rather than leave a hole. */
export default function Technology() {
  return (
    <SectionShell id="hardware" label="The hardware" className="cv-auto bg-ink-950">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[40rem]">
          <Reveal>
            <Eyebrow>The technology</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Display className="mt-6 max-w-[13ch]">Four formats. One system.</Display>
          </Reveal>
        </div>
        <Reveal delay={0.16}>
          <Lede className="max-w-[38ch] lg:pb-2">
            Every unit ships preconfigured, tested, and loaded with your menu. It arrives ready to
            take the first order.
          </Lede>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {HARDWARE.map((item, i) => (
          <Reveal key={item.id} delay={Math.min(i, 3) * 0.08}>
            <article className="group h-full">
              <Frame>
                {/* Stills and film share the 4:5 slot, so a product render and a clip sit
                    in the same grid with no layout shift between them. */}
                {item.kind === 'film' ? (
                  <Film src={item.video} poster={item.poster} ratio="portrait" label={item.name} />
                ) : (
                  <Still
                    src={item.image}
                    ratio="portrait"
                    alt={`${item.name} — ${item.line}`}
                    label={item.name}
                  />
                )}
              </Frame>
              <div className="pt-6">
                <h3 className="text-[1.15rem] font-bold tracking-tight text-white">{item.name}</h3>
                <p className="mt-1.5 text-sm text-white/55">{item.line}</p>
                <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-white/55">{item.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  )
}
