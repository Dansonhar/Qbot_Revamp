import { motion } from 'framer-motion'
import { EASE } from '../motion/env'

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-widest text-accent-400 ${className}`}>
      {children}
    </p>
  )
}

/** The statement. `as` is required to stay semantic — a Display is not always an h2. */
export function Display({ as: Tag = 'h2', children, className = '' }) {
  return (
    <Tag
      className={`text-[clamp(2.1rem,5vw,4.6rem)] leading-[1.02] font-bold tracking-tight text-white ${className}`}
    >
      {children}
    </Tag>
  )
}

export function Lede({ children, className = '' }) {
  return (
    <p className={`text-[clamp(1rem,1.15vw,1.2rem)] leading-relaxed text-white/75 ${className}`}>
      {children}
    </p>
  )
}

/** duration 1.1s and once:true are the point. Short reveals read as cheap, and a section
 *  that re-animates on scroll-up reads as a toy. The -12% margin fires it just after
 *  entry rather than exactly on the edge. */
export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function SectionShell({ id, children, className = '', rule = true, label }) {
  return (
    <section id={id} aria-label={label} className={`px-6 py-14 sm:px-10 sm:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-[1500px]">
        {rule && <div className="sol-rule mb-10 w-full sm:mb-12" />}
        {children}
      </div>
    </section>
  )
}

export function Button({ as: Tag = 'a', variant = 'primary', className = '', children, ...rest }) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-300'
  const looks =
    variant === 'primary'
      ? 'bg-accent-500 text-ink-950 hover:bg-accent-600'
      : 'border border-white/15 text-white hover:border-white/40'
  return (
    <Tag className={`${base} ${looks} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
