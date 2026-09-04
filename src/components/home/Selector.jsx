import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionShell, Eyebrow, Display, Reveal } from '../Primitives'
import { Film } from '../Media'
import { EASE } from '../../motion/env'
import { INDUSTRIES } from '../../data/site'

export default function Selector() {
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const panelRef = useRef(null)

  /* State is not readable inside the click handler that follows a focus event: focus
     fires first, React flushes the update between focus and click, and the "was this
     already active?" test is therefore always true — so the first tap navigates.
     The gesture is captured in a ref at pointerdown and read from the ref instead. */
  const activeRef = useRef(0)
  const gestureRef = useRef({ type: 'mouse', wasActive: true })

  const select = useCallback((i) => {
    activeRef.current = i
    setActive(i)
  }, [])

  const go = useCallback((industry) => navigate(`/contact?for=${industry.id}`), [navigate])

  const current = INDUSTRIES[active]

  return (
    <SectionShell id="industries" label="Choose your trade" className="cv-auto bg-ink-900">
      <div className="max-w-[52rem]">
        <Reveal>
          <Eyebrow>Make it yours</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <Display className="mt-6 max-w-[16ch]">The same system, set up for your trade.</Display>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
        <ul className="border-t border-white/8">
          {INDUSTRIES.map((industry, i) => {
            const isActive = i === active
            return (
              <li key={industry.id}>
                <button
                  type="button"
                  aria-current={isActive ? 'true' : undefined}
                  onPointerDown={(e) => {
                    gestureRef.current = { type: e.pointerType, wasActive: activeRef.current === i }
                  }}
                  onPointerEnter={(e) => {
                    // hover: only ever a real mouse. `hover:` utilities live inside
                    // @media (hover: hover) and never fire on touch, so the tap path below
                    // is the affordance touch actually gets.
                    if (e.pointerType === 'mouse') select(i)
                  }}
                  onFocus={() => select(i)}
                  onClick={(e) => {
                    const g = gestureRef.current
                    // detail === 0 means the click came from the keyboard — go straight through.
                    if (e.detail !== 0 && g.type !== 'mouse' && !g.wasActive) {
                      select(i)
                      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      return // first tap previews
                    }
                    go(industry) // second tap goes
                  }}
                  className="group flex w-full items-baseline justify-between gap-6 border-b border-white/8 py-5 text-left"
                >
                  <span
                    className={`text-[clamp(1.05rem,1.5vw,1.3rem)] tracking-tight transition-colors duration-500 ${
                      isActive ? 'text-white' : 'text-white/45'
                    }`}
                  >
                    {industry.name}
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={`shrink-0 translate-y-0.5 transition-all duration-500 ${
                      isActive ? 'text-white opacity-100' : 'text-white/45 opacity-0'
                    }`}
                  />
                </button>
              </li>
            )
          })}
        </ul>

        <div ref={panelRef}>
          {/* mode="wait" keeps exactly ONE <video> mounted. Two srcs in the DOM behind a
              fade would download the clip nobody is looking at. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Film
                src={current.video}
                poster={current.poster}
                ratio="wide"
                label={current.name}
                alt={`${current.name} — QPOS in use`}
              />
              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">
                  {current.name}
                </p>
                <p className="mt-5 max-w-[34ch] text-[clamp(1.35rem,2.1vw,1.9rem)] font-bold leading-tight tracking-tight text-white">
                  {current.line}
                </p>
                <p className="mt-5 max-w-[52ch] leading-relaxed text-white/55">{current.detail}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionShell>
  )
}
