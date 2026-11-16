import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Star, Squiggle } from './Doodles'
import laptop from '../assets/img/minna-laptop.webp'

const STEPS = [
  ['Comunicación clara', 'Coordinamos contenido e ideas de forma simple y directa.'],
  ['Trabajo personalizado', 'Cada cuenta se adapta al rubro, estilo y objetivos del emprendimiento.'],
  ['Organización del contenido', 'Planificación de posteos e historias para mantener la cuenta ordenada y activa.'],
  ['Todo se charla y se adapta', 'Flexibilidad para ajustar el trabajo según lo que el cliente necesita en cada etapa.'],
  ['Publicaciones constantes', 'Frecuencia sostenida para que la cuenta no quede inactiva y tenga mayor visibilidad.'],
]

export default function Process() {
  const root = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        revealWords('.process__title', '.process__title .wi')
        gsap.from('.step', {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.steps', start: 'top 85%', once: true },
        })
        gsap.from('.process__laptop', {
          y: 100,
          opacity: 0,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.process__media', start: 'top 90%', once: true },
        })
        gsap.from('.process__back', {
          scale: 0.4,
          opacity: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.process__media', start: 'top 90%', once: true },
        })
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="process" ref={root}>
      <div className="process__inner">
        <div className="process__media">
          <div className="process__back" />
          <img
            className="process__laptop"
            src={laptop}
            width="900"
            height="929"
            loading="lazy"
            alt="Minna trabajando en su laptop con auriculares"
          />
          <Star className="process__star float" />
        </div>

        <div className="process__body">
          <SplitWords as="h2" className="process__title" text="Forma de *trabajo*" mask />
          <Squiggle className="process__squiggle" />
          <ul className="steps">
            {STEPS.map(([t, d]) => (
              <li className="step" key={t} data-cursor>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
