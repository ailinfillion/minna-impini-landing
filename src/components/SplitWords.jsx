import { Fragment } from 'react'

// Parte un texto en palabras. Lo que va entre *asteriscos* queda resaltado
// (incluí la puntuación dentro: *negocio.*).
export default function SplitWords({ text, as: Tag = 'span', className = '', mask = false }) {
  const words = []
  text
    .split(/(\*[^*]+\*)/)
    .filter(Boolean)
    .forEach((part) => {
      const hl = part.startsWith('*')
      const clean = hl ? part.slice(1, -1) : part
      clean
        .split(' ')
        .filter(Boolean)
        .forEach((w) => words.push({ w, hl }))
    })

  return (
    <Tag className={`split ${mask ? 'split--mask' : ''} ${className}`}>
      {words.map((o, i) => (
        <Fragment key={i}>
          <span className="w">
            <span className={`wi ${o.hl ? 'hl' : ''}`}>{o.w}</span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  )
}
