import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK, FINE } from '../lib/motion'
import SplitWords from './SplitWords'
import { Flower, Arrow, Camera } from './Doodles'
import { SITE } from '../config'

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
    <section className="cta" ref={root}>
      <div className="blob blob--pink cta__blob" data-speed="0.3" />
      <Flower className="cta__flower" />
      <Camera className="cta__camera float" />

      <SplitWords as="h2" className="cta__title" text="Vos ocupate de tu *negocio.*" mask />
      <div className="cta__sub">
        <p>
          Yo te ayudo a <span className="pink">mantenerlo presente</span> en Instagram.
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

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} {SITE.name} · {SITE.role}
        </span>
      </footer>
    </section>
  )
}
