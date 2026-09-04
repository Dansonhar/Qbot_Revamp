import { Link } from 'react-router-dom'
import { SectionShell, Eyebrow, Display, Lede } from '../components/Primitives'

export default function NotFound() {
  return (
    <SectionShell label="Page not found" className="bg-ink-950 pt-32 sm:pt-36" rule={false}>
      <Eyebrow>404</Eyebrow>
      <Display as="h1" className="mt-6 max-w-[13ch]">
        This page has moved on.
      </Display>
      <Lede className="mt-7 max-w-[42ch]">The link is no longer pointing at anything.</Lede>
      <Link
        to="/"
        className="mt-10 inline-flex border border-white/15 px-7 py-3.5 text-sm font-semibold tracking-tight text-white transition-colors duration-300 hover:border-white/40"
      >
        Back to the overview
      </Link>
    </SectionShell>
  )
}
