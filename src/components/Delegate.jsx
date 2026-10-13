import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Heart, Spiral } from './Doodles'

const PILLARS = [
  { n: '01', t: 'Crear', d: 'Ideas, fotos, videos y diseños para tus publicaciones.' },
  { n: '02', t: 'Organizar', d: 'Historias y posteos planificados para que nada quede para después.' },
  { n: '03', t: 'Mantener', d: 'Tus redes activas y tu negocio presente en Instagram.' },
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
        gsap.from('.pillar', {
          y: 70,
          opacity: 0,
          rotate: 3,
          duration: 1,
          stagger: 0.14,
          ease: 'power4.out',
          scrollTrigger: { trigger: '.pillars', start: 'top 88%', once: true },
        })
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="delegate" ref={root}>
      <div className="delegate__card">
        <div className="blob blob--sage delegate__blob" data-speed="0.25" />
        <Heart className="delegate__heart float" />
        <Spiral className="delegate__spiral float float--b" />

        <SplitWords as="h2" className="delegate__title" text="¿Y si pudieras *delegar* parte de ese trabajo?" mask />
        <p className="delegate__lead">
          En <strong>MINNA</strong> te ayudo a crear y organizar el contenido de tu negocio para mantener tus redes activas.
        </p>

        <div className="pillars">
          {PILLARS.map((p) => (
            <article className="pillar" key={p.n} data-cursor>
              <span className="pillar__n">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
