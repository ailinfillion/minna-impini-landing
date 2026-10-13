import { useRef } from 'react'
import { gsap, useGSAP, parallax, revealWords, OK } from '../lib/motion'
import SplitWords from './SplitWords'
import { Squiggle, Spiral } from './Doodles'

const TASKS = [
  'Pensar ideas.',
  'Crear contenido.',
  'Preparar fotos y videos.',
  'Diseñar publicaciones.',
  'Organizar las historias.',
]

export default function Tasks() {
  const root = useRef()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        revealWords('.tasks__title', '.tasks__title .wi')

        gsap.utils.toArray('.task').forEach((li) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: li, start: 'top 90%', once: true } })
          tl.from(li.querySelectorAll('.task__n, .task__t'), {
            x: -40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power4.out',
          }).from(li.querySelector('.task__line'), { scaleX: 0, duration: 1.1, ease: 'expo.out' }, 0)
        })

        gsap.from('.tasks__foot', {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.tasks__foot', start: 'top 92%', once: true },
        })
        gsap.to('.tasks__spiral', {
          rotate: 120,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        parallax(root.current)
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section className="tasks" ref={root}>
      <div className="blob blob--olive tasks__blob" data-speed="0.3" />
      <Spiral className="tasks__spiral" />

      <SplitWords as="h2" className="tasks__title" text="Mantener una cuenta *activa* lleva tiempo:" mask />
      <Squiggle className="tasks__squiggle" />

      <ul className="tasks__list">
        {TASKS.map((t, i) => (
          <li className="task" key={t} data-cursor>
            <span className="task__n">0{i + 1}</span>
            <span className="task__t">{t}</span>
            <span className="task__line" />
          </li>
        ))}
      </ul>

      <p className="tasks__foot">Y todo eso se suma a las tareas de todos los días.</p>
    </section>
  )
}
