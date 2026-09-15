import { event, formattedDate } from '../config/event'

export function EventInfo() {
  return <section className="info-section reveal" aria-labelledby="info-title">
    <div className="section-heading"><span className="eyebrow">La cita</span><h2 id="info-title">Todo lo que necesitás saber</h2></div>
    <div className="event-card">
      <div className="event-detail"><span aria-hidden="true">◷</span><div><small>CUÁNDO</small><b>{formattedDate}</b>{event.time && <p>{event.time}</p>}</div></div>
      <div className="event-detail"><span aria-hidden="true">⌖</span><div><small>DÓNDE</small><b>{event.venue}</b><p>{event.address}</p></div></div>
      <a className="button button-secondary" href={event.googleMapsUrl} target="_blank" rel="noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
    </div>
  </section>
}
