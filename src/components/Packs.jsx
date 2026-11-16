import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Squiggle, Heart } from './Doodles'

const PACKS = [
  { name: 'Pack Básico', items: ['4 posteos mensuales', '8 historias mensuales'], price: '$100.000' },
  { name: 'Pack Intermedio', items: ['8 posteos mensuales', '12 historias mensuales', '1 reel mensual'], price: '$150.000' },
  { name: 'Pack Full', items: ['12 posteos mensuales', '16 historias mensuales', '1 reel mensual'], price: '$200.000' },
]

export default function Packs() {
  const root = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        revealWords('.packs__title', '.packs__title .wi')
        gsap.from('.packs__lead', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.packs__lead', start: 'top 92%', once: true },
        })
        gsap.from('.pack', {
          y: 80,
          opacity: 0,
          rotate: 2.5,
          duration: 1,
          stagger: 0.14,
          ease: 'power4.out',
          clearProps: 'all', // al terminar, el hover del CSS vuelve a funcionar
          scrollTrigger: { trigger: '.packs__grid', start: 'top 88%', once: true },
        })
        gsap.from('.pay > *', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.pay', start: 'top 90%', once: true },
        })
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="packs" id="packs" ref={root}>
      <div className="blob blob--olive packs__blob" data-speed="0.3" />
      <Heart className="packs__heart float" />

      <SplitWords as="h2" className="packs__title" text="Servicios de *gestión* de Instagram" mask />
      <p className="packs__lead">Elegí el nivel de gestión que necesitás y dejá de preocuparte por tu Instagram.</p>

      <div className="packs__grid">
        {PACKS.map((p) => (
          <article className="pack" key={p.name} data-cursor>
            <h3>{p.name}</h3>
            <ul>
              {p.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
              <li>Gestión y publicación del contenido</li>
            </ul>
            <p className="pack__price">
              <b>{p.price}</b> / mes
            </p>
          </article>
        ))}
      </div>

      <p className="packs__note">
        Mantener una cuenta activa y organizada requiere tiempo. Delegarlo te permite enfocarte en vender.
      </p>

      <div className="pay">
        <h3 className="pay__title">Formas de pago</h3>
        <Squiggle className="pay__squiggle" />
        <div className="pay__opts">
          <p>
            <b>1 pago mensual</b>
            del 1 al 5 de cada mes.
          </p>
          <p>
            <b>2 pagos</b>
            50% del 1 al 5 y 50% del 15 al 20.
          </p>
        </div>
        <p className="pay__methods">
          Medios de pago: <span>Transferencia bancaria</span> <span>Efectivo</span>
        </p>
      </div>
    </section>
  )
}
