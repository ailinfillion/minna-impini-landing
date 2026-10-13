import { useRef } from 'react'
import { gsap, useGSAP, OK, ScrollTrigger } from '../lib/motion'
import { Flower } from './Doodles'

const WORDS = ['Community Manager', 'Instagram', 'Contenido', 'Historias', 'Organización']

const Group = () => (
  <div className="marquee__group" aria-hidden>
    {[...WORDS, ...WORDS].map((w, i) => (
      <span className="marquee__item" key={i}>
        {w}
        <Flower className="marquee__flower" />
      </span>
    ))}
  </div>
)

export default function Marquee() {
  const root = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        const loop = gsap.to('.marquee__track', { xPercent: -50, repeat: -1, duration: 28, ease: 'none' })
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (s) => {
            const boost = 1 + Math.min(Math.abs(s.getVelocity()) / 250, 6)
            gsap.to(loop, {
              timeScale: s.direction * boost,
              duration: 0.1,
              overwrite: true,
              onComplete: () => gsap.to(loop, { timeScale: 1, duration: 1.2 }),
            })
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <div className="marquee-wrap" ref={root}>
      <div className="marquee">
        <div className="marquee__track">
          <Group />
          <Group />
        </div>
      </div>
    </div>
  )
}
