import { event, formattedDate } from '../config/event'
import { Countdown } from './Countdown'

export function Hero({ host }: { host: 'Matías' | 'Nicole' }) {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="confetti confetti-one" /><div className="confetti confetti-two" /><div className="confetti confetti-three" />
    <img className="gem-scatter" src={host === 'Matías' ? '/gemas-fiesta.png' : '/gemas-cromo.png'} alt="" aria-hidden="true" />
    <div className="hero-content">
      <p className="eyebrow">Guardá la fecha</p>
      <p className="invited">¡Estás invitado a celebrar!</p>
      <h1 id="hero-title">{host}<span> cumple años</span></h1>
      <div className="hero-details">
        <p><b>{formattedDate}</b>{event.time && <><span> · </span>{event.time}</>}</p>
        <p>{event.venue} <span>—</span> {event.address}</p>
      </div>
      <Countdown />
      <a className="button button-primary" href="#rsvp">Confirmar asistencia <span aria-hidden="true">↓</span></a>
    </div>
    <div className="hero-sun" aria-hidden="true"><span>✦</span></div>
  </section>
}
