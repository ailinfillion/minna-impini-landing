import { useRef } from 'react'
import { gsap, useGSAP, parallax, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Wave, Star } from './Doodles'

export default function Statement() {
  const root = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        const scrub = (sel, start, end) =>
          gsap.fromTo(
            `${sel} .wi`,
            { opacity: 0.14 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.12,
              scrollTrigger: { trigger: sel, start, end, scrub: true },
            },
          )
        scrub('.statement__big', 'top 85%', 'bottom 55%')
        scrub('.statement__small', 'top 90%', 'bottom 65%')

        gsap.fromTo(
          '.statement .draw',
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.statement__wave', start: 'top 90%', end: 'top 55%', scrub: true },
          },
        )
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="statement" ref={root}>
      <div className="blob blob--pink statement__blob1" data-speed="0.3" />
      <div className="blob blob--lime statement__blob2" data-speed="0.15" />
      <Star className="statement__star" />

      <SplitWords
        as="p"
        className="statement__big"
        text="Entre atender *clientes,* organizar *pedidos* y ocuparte de tu *negocio,* Instagram muchas veces queda para después."
      />
      <Wave draw className="statement__wave" />
      <SplitWords
        as="p"
        className="statement__small"
        text="Y cuando finalmente tenés un rato libre, quizás no sabés qué *publicar.*"
      />
    </section>
  )
}
