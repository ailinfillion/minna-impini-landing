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
import Cta from './components/Cta'

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
        <Cta />
      </main>
    </>
  )
}
