import { useEffect, useState } from 'react'

/** Reads a media query, resolved on the FIRST render.
 *  Resolving in an effect mounts the desktop tree and swaps a frame later, which on a
 *  sticky or pinned rig is a visible jump. useState's initialiser runs during render,
 *  so the very first paint is already correct. */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = (e) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    setMatches(mql.matches)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')

/** One flag every rig branches on.
 *  `simple` means: render the plain stacked version, no pinning, no scroll driving.
 *  MotionConfig reducedMotion="user" strips transforms from motion components, but a rig
 *  that pins a stage has to opt out structurally — there is no transform to strip. */
export function useSimpleMotion() {
  const reduced = usePrefersReducedMotion()
  const mobile = useIsMobile()
  return { reduced, mobile, simple: reduced || mobile }
}

/** Slow and weighted. Expensive, not playful. */
export const EASE = [0.16, 1, 0.3, 1]
