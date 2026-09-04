import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Film } from '../Media'
import { EASE } from '../../motion/env'
import { CONTACT } from '../../data/site'

export default function Hero() {
  return (
    <section id="top" aria-label="QPOS overview" className="relative min-h-[100svh] bg-ink-950">
      <Film
        src="/video/hero.mp4"
        poster="/images/poster/hero.jpg"
        ratio="fill"
        label="Hero"
      />

      {/* Directional gradient under the copy column only. A flat scrim over the whole
          frame reads "too dark" and throws away the half of the picture nobody is
          reading over — text-shadow on the type does the rest. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#060807_0%,rgba(6,8,7,0.88)_42%,rgba(6,8,7,0.45)_62%,rgba(6,8,7,0)_80%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1500px] items-center px-6 pt-24 pb-20 sm:px-10">
        <div className="max-w-[38rem]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="hero-type text-xs font-semibold uppercase tracking-widest text-accent-400"
          >
            QPOS — Kuala Lumpur
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.12, ease: EASE }}
            className="hero-type mt-6 max-w-[15ch] text-[clamp(2.6rem,6vw,5.4rem)] font-bold leading-[1.02] tracking-tight text-white"
          >
            One system behind every counter.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.24, ease: EASE }}
            className="hero-type mt-7 max-w-[46ch] text-[clamp(1rem,1.15vw,1.2rem)] leading-relaxed text-white/75"
          >
            Counter, handheld and self-service running on one device. Ordering, queueing, entry,
            payment and reporting settling into one dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.36, ease: EASE }}
            className="mt-10"
          >
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-accent-500 px-7 py-3.5 text-sm font-semibold tracking-tight text-ink-950 transition-colors duration-300 hover:bg-accent-600"
            >
              Arrange a demo
              <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
