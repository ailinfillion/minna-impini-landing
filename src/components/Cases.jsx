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

const clamp = (v) => Math.min(100, Math.max(0, v))

// El divisor se arrastra desde cualquier punto de la imagen (no solo desde la barra).
function BeforeAfter({ cases, active, pos, setPos, onTouch }) {
  const box = useRef()
  const dragging = useRef(false)

  const moveTo = (e) => {
    const r = box.current.getBoundingClientRect()
    setPos(clamp(((e.clientX - r.left) / r.width) * 100))
  }

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    onTouch()
    setPos((p) => clamp(p + (e.key === 'ArrowRight' ? 5 : -5)))
  }

  return (
    <div className="ba-wrap">
      <div className="ba__labels" aria-hidden>
        <span className="ba__lab ba__lab--l" style={{ opacity: pos > 22 ? 1 : 0.35 }}>
          Antes
        </span>
        <span className="ba__lab ba__lab--r" style={{ opacity: pos < 78 ? 1 : 0.35 }}>
          Después
        </span>
      </div>
      <div
        ref={box}
        className="ba"
        role="slider"
        tabIndex={0}
        aria-label="Deslizá para comparar antes y después"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        style={{ '--pos': `${pos}%` }}
        onPointerDown={(e) => {
          onTouch()
          dragging.current = true
          box.current.setPointerCapture(e.pointerId)
          moveTo(e)
        }}
        onPointerMove={(e) => dragging.current && moveTo(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        onKeyDown={onKeyDown}
      >
        {/* todas las cuentas viven en el DOM: cambiar de una a otra no carga imágenes */}
        {cases.map((k, i) => (
          <div className={`ba__set ${i === active ? 'is-on' : ''}`} key={k.id} aria-hidden={i !== active}>
            <img
              className="ba__img"
              src={k.imgs[0]}
              width="640"
              height="1053"
              alt={i === active ? `Perfil de ${k.name} antes del trabajo` : ''}
              draggable="false"
              decoding="sync"
            />
            <img
              className="ba__img ba__img--after"
              src={k.imgs[1]}
              width="640"
              height="1053"
              alt={i === active ? `Perfil de ${k.name} después del trabajo` : ''}
              draggable="false"
              decoding="sync"
            />
          </div>
        ))}
        <span className="ba__line" aria-hidden>
          <span className="ba__knob">‹ ›</span>
        </span>
      </div>
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
        <BeforeAfter cases={CASES} active={active} pos={pos} setPos={setPos} onTouch={stopDemo} />

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
