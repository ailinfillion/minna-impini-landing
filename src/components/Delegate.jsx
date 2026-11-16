import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Heart, Spiral, Check } from './Doodles'
import presenta from '../assets/img/minna-presenta.webp'

const DOES = [
  'Planifico el contenido',
  'Creo y diseño publicaciones',
  'Genero fotos y videos',
  'Edito Reels',
  'Creo historias',
  'Programo las publicaciones',
]

export default function Delegate() {
  const root = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        // la tarjeta rosa se expande hasta ocupar todo el ancho
        gsap.fromTo(
          '.delegate__card',
          { clipPath: 'inset(14% 6% round 56px)' },
          {
            clipPath: 'inset(0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 95%', end: 'top 15%', scrub: true },
          },
        )
        revealWords('.delegate__title', '.delegate__title .wi')
        gsap.from('.delegate__lead', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.delegate__lead', start: 'top 90%', once: true },
        })
        revealWords('.delegate__sub', '.delegate__sub .wi')
        gsap.from('.check', {
          x: -50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.checks', start: 'top 85%', once: true },
        })
        gsap.from('.delegate__photo', {
          y: 120,
          opacity: 0,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.delegate__photo', start: 'top 95%', once: true },
        })
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="delegate" id="que-hago" ref={root}>
      <div className="delegate__card">
        <div className="blob blob--sage delegate__blob" data-speed="0.25" />
        <Heart className="delegate__heart float" />
        <Spiral className="delegate__spiral float float--b" />

        <SplitWords as="h2" className="delegate__title" text="¿Y si pudieras *delegar* parte de ese trabajo?" mask />
        <p className="delegate__lead">
          En <strong>MINNA</strong> te ayudo a crear y organizar el contenido de tu negocio para mantener tus redes activas.
        </p>

        <div className="delegate__grid">
          <div className="delegate__list">
            <SplitWords as="h3" className="delegate__sub" text="¿Qué hago por tu cuenta?" mask />
            <ul className="checks">
              {DOES.map((t) => (
                <li className="check" key={t}>
                  <span className="check__i">
                    <Check />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <img
            className="delegate__photo"
            src={presenta}
            width="900"
            height="1089"
            loading="lazy"
            alt="Minna señalando la lista de tareas que hace por tu cuenta"
          />
        </div>
      </div>
    </section>
  )
}
