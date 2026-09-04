import { motion } from 'framer-motion'
import { SectionShell, Eyebrow, Display, Reveal } from '../Primitives'
import { Still } from '../Media'
import { EASE } from '../../motion/env'
import { PROOF } from '../../data/site'

export default function Proof() {
  return (
    <SectionShell id="proof" label="In the field" className="cv-auto bg-ink-950">
      <div className="max-w-[52rem]">
        <Reveal>
          <Eyebrow>In the field</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <Display className="mt-6 max-w-[14ch]">Running where it is busiest.</Display>
        </Reveal>
      </div>

      <div className="mt-16 space-y-16 lg:space-y-24">
        {PROOF.map((row, i) => (
          <div
            key={row.id}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
              i % 2 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            {/* The picture is already visible at rest and only lifts. Fading an image up
                from zero alongside its copy makes the page look like it is still loading. */}
            <motion.div
              initial={{ opacity: 0.55 }}
              whileInView={{ opacity: 0.92 }}
              viewport={{ once: true, margin: '-12% 0px' }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <Still src={row.image} ratio="portrait" alt={row.title} className="border border-white/8" />
            </motion.div>

            <div>
              <Reveal>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">{row.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h3 className="mt-6 max-w-[16ch] text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.06] tracking-tight text-white">
                  {row.title}
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[46ch] text-[clamp(1rem,1.15vw,1.15rem)] leading-relaxed text-white/75">
                  {row.body}
                </p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
