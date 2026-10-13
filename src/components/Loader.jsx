import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/motion'
import { Flower } from './Doodles'

const fontsReady = () =>
  Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 3000))])

export default function Loader({ onReveal, onGone }) {
  const root = useRef()

  useGSAP(
    () => {
      gsap
        .timeline()
        .from('.loader__flower', { scale: 0, rotate: -180, duration: 1, ease: 'back.out(1.6)' })
        .from('.loader__word span', { yPercent: 110, duration: 0.8, stagger: 0.06, ease: 'power4.out' }, '-=0.6')

      const minDelay = new Promise((r) => setTimeout(r, 1500))
      Promise.all([fontsReady(), minDelay]).then(() => {
        gsap
          .timeline({ onComplete: onGone })
          .to('.loader__inner', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
          .call(onReveal, null, '>-0.1')
          .to(root.current, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '<')
      })
    },
    { scope: root },
  )

  return (
    <div className="loader" ref={root} role="status" aria-label="Cargando">
      <div className="loader__inner">
        <Flower className="loader__flower" />
        <p className="loader__word" aria-hidden>
          {'MINNA'.split('').map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </p>
      </div>
    </div>
  )
}
