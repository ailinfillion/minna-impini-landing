import { useRef, useState } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Wave } from './Doodles'
import magicaAntes from '../assets/img/case-magica-antes.webp'
import magicaDespues from '../assets/img/case-magica-despues.webp'
import en3dAntes from '../assets/img/case-en3d-antes.webp'
import en3dDespues from '../assets/img/case-en3d-despues.webp'

const CASES = [
  {
    id: 'magica',
    name: 'Mágica',
    before: 'Sin identidad visual',
    after: 'Identidad definida',
    desc: 'Desarrollo de identidad visual y gestión de Instagram. Diseño de logo, paleta de colores y tipografía. Organización del feed, edición de imágenes y publicaciones constantes.',
    stat: '13,8 mil',
    statLabel: 'visualizaciones en los últimos 30 días',
    imgs: [magicaAntes, magicaDespues],
  },
  {
    id: 'en3d',
    name: 'Impresiones En3D',
    before: 'Perfil básico',
    after: 'Marca profesional',
    desc: 'Desarrollo de identidad visual y gestión de Instagram. Diseño de logo, elección de paleta de colores y tipografía. Producción de contenido propio: fotografías, edición y publicaciones constantes.',
    stat: '7,5 mil',
    statLabel: 'visualizaciones en los últimos 30 días',
    imgs: [en3dAntes, en3dDespues],
  },
]

function BeforeAfter({ before, after, pos, setPos, onTouch }) {
  return (
    <div className="ba" style={{ '--pos': `${pos}%` }}>
      <img className="ba__img" src={before} width="640" height="1053" alt="Perfil de Instagram antes del trabajo" />
      <img
        className="ba__img ba__img--after"
        src={after}
        width="640"
        height="1053"
        alt="Perfil de Instagram después del trabajo"
      />
      <span className="ba__tag ba__tag--l">Antes</span>
      <span className="ba__tag ba__tag--r">Después</span>
      <span className="ba__line" aria-hidden>
        <span className="ba__knob">‹ ›</span>
      </span>
      <input
        className="ba__range"
        type="range"
        min="0"
        max="100"
        step="0.5"
        value={pos}
        aria-label="Deslizá para comparar antes y después"
        onPointerDown={onTouch}
        onKeyDown={onTouch}
        onChange={(e) => setPos(parseFloat(e.target.value))}
      />
    </div>
  )
}

export default function Cases() {
  const root = useRef()
  const demo = useRef(null)
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const c = CASES[active]

  const stopDemo = () => demo.current?.kill()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        revealWords('.cases__title', '.cases__title .wi')
        gsap.from('.cases__lead, .cases__tabs', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cases__lead', start: 'top 90%', once: true },
        })
        gsap.from('.cases__stage', {
          y: 90,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.cases__stage',
            start: 'top 88%',
            once: true,
            // al aparecer, el divisor se mueve solo una vez para invitar a deslizar
            onEnter: () => {
              const p = { v: 50 }
              demo.current = gsap
                .timeline({ delay: 0.5 })
                .to(p, { v: 18, duration: 1, ease: 'power2.inOut', onUpdate: () => setPos(p.v) })
                .to(p, { v: 82, duration: 1.6, ease: 'power2.inOut', onUpdate: () => setPos(p.v) })
                .to(p, { v: 50, duration: 1, ease: 'power2.inOut', onUpdate: () => setPos(p.v) })
            },
          },
        })
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  const pick = (i) => {
    stopDemo()
    setActive(i)
    setPos(50)
  }

  return (
    <section className="cases" id="casos" ref={root}>
      <div className="blob blob--pink cases__blob" data-speed="0.3" />
      <SplitWords as="h2" className="cases__title" text="Antes y *después*" mask />
      <p className="cases__lead">
        Cuando el contenido se organiza y se sostiene en el tiempo, la percepción de la marca cambia.
      </p>

      <div className="cases__tabs" role="tablist" aria-label="Cuentas trabajadas">
        {CASES.map((k, i) => (
          <button
            key={k.id}
            role="tab"
            aria-selected={i === active}
            className={`tab ${i === active ? 'is-on' : ''}`}
            onClick={() => pick(i)}
          >
            {k.name}
          </button>
        ))}
      </div>

      <div className="cases__stage">
        <BeforeAfter before={c.imgs[0]} after={c.imgs[1]} pos={pos} setPos={setPos} onTouch={stopDemo} />

        <div className="cases__info" key={c.id}>
          <p className="cases__moves">
            <span>{c.before}</span>
            <Wave className="cases__wave" />
            <strong>{c.after}</strong>
          </p>
          <p className="cases__desc">{c.desc}</p>
          <p className="cases__stat">
            <b>{c.stat}</b>
            <span>{c.statLabel}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
