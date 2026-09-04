import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'

/* Every route is lazy — and so is the footer, which is markup nothing above the fold needs. */
const Home = lazy(() => import('./sites/Home'))
const Hardware = lazy(() => import('./sites/Hardware'))
const Modules = lazy(() => import('./sites/Modules'))
const Contact = lazy(() => import('./sites/Contact'))
const NotFound = lazy(() => import('./sites/NotFound'))
const Footer = lazy(() => import('./components/Footer'))

/* A multi-page SPA has no per-page <title> unless something writes one. */
function useDocumentMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = {
      '/': [
        'QPOS — One system behind every counter.',
        'Counter, mobile and self-service running on one device. Ordering, queueing, entry, payment and reporting settling into a single dashboard.',
      ],
      '/hardware': [
        'Hardware — QPOS',
        'Q1 Stand, Q1 Desktop, Q1 Duo, K2 Kiosk and QSentry. Preconfigured and loaded with your menu before it ships.',
      ],
      '/modules': [
        'Modules — QPOS',
        'Fourteen modules on one platform: POS, mPOS, kiosk, webstore, scan to order, kitchen display, queue, loyalty, inventory and AI insights.',
      ],
      '/contact': [
        'Contact — QPOS',
        'Visit the Publika showroom in Kuala Lumpur, or arrange a demo at your counter.',
      ],
    }
    const [title, description] = meta[pathname] || ['QPOS', 'Page not found.']
    document.title = title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [pathname])
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return   // let the browser resolve an anchor itself
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  useDocumentMeta()

  return (
    // reducedMotion="user" strips transforms from every motion component in one place.
    <MotionConfig reducedMotion="user">
      {/* Theme classes belong on the shell, not the page: nav and footer are siblings of
          <main>, so a page-scoped repaint leaves a white button in the bar above it. */}
      <div className="min-h-screen bg-ink-950">
        <ScrollToTop />
        <Nav />
        <main>
          <Suspense fallback={<div className="min-h-[100svh]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hardware" element={<Hardware />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </MotionConfig>
  )
}
