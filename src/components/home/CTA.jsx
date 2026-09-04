import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionShell, Eyebrow, Display, Lede, Reveal } from '../Primitives'
import { CONTACT } from '../../data/site'

/* Quiet, single, no urgency copy. */
export default function CTA() {
  return (
    <SectionShell id="demo" label="Arrange a demo" className="cv-auto bg-ink-900">
      <div className="max-w-[46rem]">
        <Reveal>
          <Eyebrow>Next</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <Display className="mt-6 max-w-[13ch]">See it on your own counter.</Display>
        </Reveal>
        <Reveal delay={0.16}>
          <Lede className="mt-7 max-w-[46ch]">
            We set the system up with your menu and your prices, then walk it through with you. The
            showroom is at {CONTACT.showroom}.
          </Lede>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-accent-500 px-7 py-3.5 text-sm font-semibold tracking-tight text-ink-950 transition-colors duration-300 hover:bg-accent-600"
            >
              Arrange a demo
              <ArrowRight size={16} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <Link
              to="/hardware"
              className="inline-flex items-center gap-2 border border-white/15 px-7 py-3.5 text-sm font-semibold tracking-tight text-white transition-colors duration-300 hover:border-white/40"
            >
              See the hardware
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  )
}
