import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { FINE } from '../lib/motion'

export default function Cursor() {
  const el = useRef()

  useEffect(() => {
    if (!window.matchMedia(FINE).matches) return
    const node = el.current
    const x = gsap.quickTo(node, 'x', { duration: 0.35, ease: 'power3' })
    const y = gsap.quickTo(node, 'y', { duration: 0.35, ease: 'power3' })
    const move = (e) => {
      node.classList.add('is-on')
      x(e.clientX)
      y(e.clientY)
    }
    const over = (e) => node.classList.toggle('is-big', !!e.target.closest('a, button, [data-cursor]'))
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [])

  return <div className="cursor" ref={el} aria-hidden />
}
