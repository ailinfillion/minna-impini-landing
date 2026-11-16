import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, OK } from './lib/motion'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Statement from './components/Statement'
import Tasks from './components/Tasks'
import Delegate from './components/Delegate'
import Process from './components/Process'
import Cases from './components/Cases'
import Packs from './components/Packs'
import Cta from './components/Cta'
import { Flower } from './components/Doodles'
import { SITE } from './config'

const motionOk = typeof window !== 'undefined' && window.matchMedia(OK).matches

export default function App() {
  const [ready, setReady] = useState(!motionOk)
  const [loaderGone, setLoaderGone] = useState(!motionOk)
  const lenis = useRef(null)

  useEffect(() => {
    if (!motionOk) return
    const l = new Lenis({ lerp: 0.1 })
    lenis.current = l
    l.stop()
    l.on('scroll', ScrollTrigger.update)
    const tick = (t) => l.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => {
      gsap.ticker.remove(tick)
      l.destroy()
    }
  }, [])

  useEffect(() => {
    if (ready) lenis.current?.start()
  }, [ready])

  return (
    <>
      {!loaderGone && <Loader onReveal={() => setReady(true)} onGone={() => setLoaderGone(true)} />}
      <Cursor />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <Statement />
        <Tasks />
        <Delegate />
        <Process />
        <Cases />
        <Packs />
        <Cta />
      </main>
      <footer className="footer">
        <Flower className="footer__flower" />
        <span className="footer__brand">MINNA</span>
        <span>
          © {new Date().getFullYear()} {SITE.name} · {SITE.role}
        </span>
        <a href="https://www.instagram.com/daianaimpini" target="_blank" rel="noreferrer">
          @daianaimpini
        </a>
      </footer>
    </>
  )
}
