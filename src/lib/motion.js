import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const OK = '(prefers-reduced-motion: no-preference)'
export const FINE = '(hover: hover) and (pointer: fine)'

// Mueve cada [data-speed] a distinto ritmo mientras se hace scroll.
export function parallax(scope, start = 'top bottom') {
  gsap.utils.toArray(scope.querySelectorAll('[data-speed]')).forEach((el) => {
    gsap.to(el, {
      y: () => -parseFloat(el.dataset.speed) * window.innerHeight * 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start,
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
  })
}

// Palabras que suben desde una máscara al entrar en pantalla.
export function revealWords(trigger, targets, extra = {}) {
  gsap.from(targets, {
    yPercent: 115,
    rotate: 5,
    duration: 1,
    ease: 'power4.out',
    stagger: 0.07,
    scrollTrigger: { trigger, start: 'top 85%', once: true },
    ...extra,
  })
}

export { gsap, ScrollTrigger, useGSAP }
