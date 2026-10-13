import { useEffect, useRef } from 'react'
import { gsap, useGSAP, parallax, OK, FINE } from '../lib/motion'
import SplitWords from './SplitWords'
import { Flower, Squiggle, Star, Heart, Spiral, Camera, Chart } from './Doodles'
import { SITE } from '../config'

export default function Hero({ ready }) {
  const root = useRef()
  const intro = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const t = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } })
        t.from('.hero__nav > *', { y: -20, opacity: 0, duration: 0.8, stagger: 0.1 })
          .from('.hero__photo', { scale: 0.55, opacity: 0, rotate: -8, duration: 1.5, ease: 'expo.out' }, 0)
          .from('.hero__back', { scale: 0, duration: 1.4, ease: 'expo.out' }, 0.15)
          .from('.hero__title .wi', { yPercent: 115, rotate: 6, duration: 1.1, stagger: 0.08 }, 0.2)
          .from('.hero__tag', { scale: 0, rotate: -25, duration: 0.9, ease: 'back.out(2)' }, '-=0.6')
          .from('.hero__sub, .hero__cta', { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 }, '-=0.7')
          .from('.doodle', { scale: 0, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'back.out(2.5)' }, '-=1.1')
        intro.current = t

        parallax(root.current, 'top top')
      })

      mm.add(`${OK} and ${FINE}`, () => {
        const layers = gsap.utils.toArray('.doodle').map((el) => ({
          x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
          y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
          d: parseFloat(el.dataset.depth),
        }))
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          layers.forEach((l) => {
            l.x(-nx * l.d * 70)
            l.y(-ny * l.d * 70)
          })
        }
        window.addEventListener('pointermove', onMove)
        return () => window.removeEventListener('pointermove', onMove)
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  useEffect(() => {
    if (ready) intro.current?.play()
  }, [ready])

  return (
    <section className="hero" ref={root}>
      <div className="blob blob--olive hero__blob1" data-speed="0.25" />
      <div className="blob blob--pink hero__blob2" data-speed="0.4" />

      <nav className="hero__nav">
        <span className="logo">
          <Flower className="logo__flower" />
          MINNA
        </span>
        <a className="pill" href={SITE.instagramDM} target="_blank" rel="noreferrer">
          Escribime
        </a>
      </nav>

      <div className="hero__text">
        <p className="hero__kicker">Community Manager</p>
        <SplitWords as="h1" className="hero__title" text="Vos ocupate de tu *negocio.*" mask />
        <p className="hero__tag">yo puedo ayudarte</p>
        <p className="hero__sub">Yo te ayudo a mantenerlo presente en Instagram.</p>
        <a className="btn hero__cta" href={SITE.instagramDM} target="_blank" rel="noreferrer">
          Consultas por MD
        </a>
      </div>

      <div className="hero__photo-wrap" data-speed="-0.08">
        <div className="hero__back" />
        <div className="hero__photo">
          <img
            src={`${import.meta.env.BASE_URL}img/minna.jpg`}
            width="1080"
            height="1350"
            alt="Minna, community manager, saludando"
            fetchPriority="high"
          />
        </div>
        <span className="doodle" data-depth="1.2" style={{ top: '-4%', right: '-2%' }}>
          <Camera className="d float" style={{ width: 54, color: 'var(--lime)' }} />
        </span>
        <span className="doodle" data-depth="0.8" style={{ bottom: '12%', left: '-6%' }}>
          <Chart className="d float float--b" style={{ width: 48, color: 'var(--pink)' }} />
        </span>
        <span className="doodle" data-depth="1.6" style={{ top: '38%', right: '-8%' }}>
          <Heart className="d float float--c" style={{ width: 34, color: 'var(--pink)' }} />
        </span>
      </div>

      <span className="doodle" data-depth="1" style={{ top: '13%', right: '8%' }}>
        <Star className="d float" style={{ width: 30, color: 'var(--lime)' }} />
      </span>
      <span className="doodle hide-sm" data-depth="1.4" style={{ bottom: '8%', left: '42%' }}>
        <Spiral className="d float float--b" style={{ width: 70, color: 'var(--lime)' }} />
      </span>
      <span className="doodle" data-depth="0.6" style={{ bottom: '4%', left: '6%' }}>
        <Squiggle className="d float float--c" style={{ width: 90, color: 'var(--pink)' }} />
      </span>
    </section>
  )
}
