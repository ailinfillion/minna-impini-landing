import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Flower, Camera } from './Doodles'
import { SITE } from '../config'
import mate from '../assets/img/minna-mate.webp'

const CONTACT = [
  { label: 'Instagram · @daianaimpini', text: 'Consultas por MD', href: SITE.instagramDM, external: true },
  { label: 'WhatsApp · 3442-581695', text: 'Escribime por WhatsApp', href: SITE.whatsapp, external: true },
  { label: 'Correo electrónico', text: 'deniseimpini@gmail.com', href: 'mailto:deniseimpini@gmail.com' },
]

export default function Cta() {
  const root = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        revealWords('.cta__title', '.cta__title .wi')
        gsap.from('.cta__sub > *', {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cta__sub', start: 'top 90%', once: true },
        })
        gsap.from('.contact li', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.contact', start: 'top 92%', once: true },
        })
        gsap.from('.cta__back', {
          scaleY: 0,
          transformOrigin: '50% 100%',
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.cta__stage', start: 'top 92%', once: true },
        })
        gsap.from('.cta__photo', {
          y: 120,
          opacity: 0,
          duration: 1.3,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.cta__stage', start: 'top 92%', once: true },
        })
        gsap.to('.cta__flower', {
          rotate: 180,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        })
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="cta" id="contacto" ref={root}>
      <Flower className="cta__flower" />
      <Camera className="cta__camera float" />

      <div className="cta__main">
        <SplitWords as="h2" className="cta__title" text="Vos ocupate de tu *negocio.*" mask />
        <div className="cta__sub">
          <p>
            Yo te ayudo a <span className="pink">mantenerlo presente</span> en Instagram.
          </p>
          <p className="cta__small">
            Si sentís que tu Instagram está frenado, desordenado o abandonado, podemos charlar y ver si soy la persona
            indicada para ayudarte.
          </p>
        </div>

        <ul className="contact">
          {CONTACT.map((c) => (
            <li key={c.label}>
              <a href={c.href} {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <span>{c.label}</span>
                <b>{c.text}</b>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="cta__stage">
        <div className="cta__back" />
        <img
          className="cta__photo"
          src={mate}
          width="900"
          height="1065"
          loading="lazy"
          alt="Minna con el mate, lista para charlar"
        />
      </div>
    </section>
  )
}
