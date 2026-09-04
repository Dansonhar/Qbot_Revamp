import { useEffect, useRef } from 'react'

/** A fixed named set, so a still and a film are interchangeable in the same slot
 *  with no layout shift when footage arrives or is pulled. */
export const RATIOS = {
  wide: 'aspect-[16/9]',
  cinema: 'aspect-[21/9]',
  portrait: 'aspect-[4/5]',
  tall: 'aspect-[9/16]',
  square: 'aspect-square',
  fill: null,   // see boxClass — 'fill' stretches to the positioned ancestor instead
}

/* 'fill' has to BE absolute, not sit inside something absolute a caller passes in.
   Tailwind resolves `relative` and `absolute` by their order in the generated
   stylesheet, not by their order in the class attribute — so a base `relative` here
   silently beat an `absolute` passed by the caller, `inset-0` stopped applying, and
   `h-full` measured against a parent with no definite height and collapsed to 0. */
const boxClass = (ratio, className) =>
  ratio === 'fill'
    ? `absolute inset-0 overflow-hidden ${className}`
    : `relative overflow-hidden ${RATIOS[ratio]} ${className}`

/** public/ assets must survive a subpath deploy (BASE_URL is '/' locally). */
export const asset = (p) => (p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}` : p)

/** Quiet placeholder for an empty slot: a glass surface, a hairline frame, a corner label.
 *  No icon, no play button — nothing that reads as a broken embed. Never print a production
 *  note here; a visitor reads it. Those belong in comments like this one. */
function Placeholder({ label }) {
  return (
    <div className="glass absolute inset-0 flex items-end p-4">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/35">{label}</span>
      )}
    </div>
  )
}

/**
 * A looping clip that costs nothing until it is nearly on screen.
 *
 * preload="none" with NO autoplay attribute is the whole trick: `autoplay` overrides
 * preload and makes the browser pull every file on the page at once. Playback is started
 * and stopped by an IntersectionObserver instead.
 */
export function Film({
  src,
  poster,
  ratio = 'wide',
  className = '',
  label,
  alt,
  children,
  fit = 'object-cover',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v || !src) return

    const start = () => {
      // Raise preload, then play. Do NOT also call v.load(): it resets the element and
      // aborts the request that raising preload just started — 206 → ERR_ABORTED → 304,
      // once per clip, which is worse than not deferring at all.
      if (v.preload !== 'auto') v.preload = 'auto'
      v.play().catch(() => {})
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? start() : v.pause())),
      // Free hysteresis: starts a screen early, pauses a screen late, so a clip is
      // already running by the time it is looked at and doesn't stutter on scroll-back.
      { rootMargin: '100% 0px' },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [src])

  const decorative = !alt

  return (
    <div className={boxClass(ratio, className)}>
      {src ? (
        <video
          ref={ref}
          src={asset(src)}
          poster={poster ? asset(poster) : undefined}
          muted            /* not a style choice — no browser autoplays with sound */
          loop
          playsInline
          draggable={false}
          preload="none"
          aria-hidden={decorative || undefined}
          aria-label={alt || undefined}
          className={`pointer-events-none absolute inset-0 h-full w-full ${fit}`}
        />
      ) : (
        <Placeholder label={label} />
      )}
      {children}
    </div>
  )
}

export function Still({ src, ratio = 'wide', className = '', alt = '', eager = false, label, children }) {
  return (
    <div className={boxClass(ratio, className)}>
      {src ? (
        <img
          src={asset(src)}
          alt={alt}
          draggable={false}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          fetchPriority={eager ? 'high' : undefined}
          aria-hidden={alt ? undefined : true}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Placeholder label={label} />
      )}
      {children}
    </div>
  )
}

/** A device plate: the hairline frame the hardware tiles sit in. */
export function Frame({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden border border-white/8 bg-ink-900 ${className}`}>
      {children}
    </div>
  )
}
