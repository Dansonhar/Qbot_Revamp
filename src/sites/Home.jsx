import Hero from '../components/home/Hero'
import Problem from '../components/home/Problem'
import Capabilities from '../components/home/Capabilities'
import Selector from '../components/home/Selector'
import Technology from '../components/home/Technology'
import Configured from '../components/home/Configured'
import Proof from '../components/home/Proof'
import CTA from '../components/home/CTA'

/* Section order is the argument: what it looks like, what you already run, what this does,
   what it looks like for you, what it is made of, what changes, where it runs, what next. */
export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Capabilities />
      <Selector />
      <Technology />
      <Configured />
      <Proof />
      <CTA />
    </>
  )
}
