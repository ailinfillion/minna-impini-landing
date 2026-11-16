import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK, FINE } from '../lib/motion'
import SplitWords from './SplitWords'
import { Flower, Arrow, Camera } from './Doodles'
import { SITE } from '../config'
import mate from '../assets/img/minna-mate.webp'

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
        gsap.from('.cta__btn', {
          scale: 0,
          rotate: -40,
          duration: 1.2,
          ease: 'back.out(1.8)',
          scrollTrigger: { trigger: '.cta__btn', start: 'top 92%', once: true },
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

      mm.add(`${OK} and ${FINE}`, () => {
        const btn = root.current.querySelector('.cta__btn')
        const x = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
        const y = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' })
        const move = (e) => {
          const r = btn.getBoundingClientRect()
          x((e.clientX - (r.left + r.width / 2)) * 0.35)
          y((e.clientY - (r.top + r.height / 2)) * 0.35)
        }
        const leave = () => {
          x(0)
          y(0)
        }
        btn.addEventListener('pointermove', move)
        btn.addEventListener('pointerleave', leave)
        return () => {
          btn.removeEventListener('pointermove', move)
          btn.removeEventListener('pointerleave', leave)
        }
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="cta" id="contacto" ref={root}>
      <Flower className="cta__flower" />
      <Camera className="cta__camera float" />

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

      <a className="cta__btn" href={SITE.instagramDM} target="_blank" rel="noreferrer">
        <span>
          Consultas
          <br />
          por MD
        </span>
        <Arrow className="cta__arrow" />
      </a>

      <ul className="contact">
        <li>
          <span>Instagram</span>
          <a href="https://www.instagram.com/daianaimpini" target="_blank" rel="noreferrer">
            @daianaimpini
          </a>
        </li>
        <li>
          <span>Celular</span>
          <a href="tel:+543442581695">3442-581695</a>
        </li>
        <li>
          <span>Correo electrónico</span>
          <a href="mailto:deniseimpini@gmail.com">deniseimpini@gmail.com</a>
        </li>
      </ul>

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
