import { useState } from 'react'
import { EventInfo } from './components/EventInfo'
import { Hero } from './components/Hero'
import { InvitationGate } from './components/InvitationGate'
import { RSVPForm } from './components/RSVPForm'

export default function App() {
  const [host, setHost] = useState<'Matías' | 'Nicole' | null>(null)
  if (!host) return <main><InvitationGate onChoose={setHost} /></main>
  return <main className={`invitation theme-${host === 'Matías' ? 'matias' : 'nicole'}`}>
    <Hero host={host} />
    <EventInfo />
    <section className="rsvp-section reveal" id="rsvp" aria-labelledby="rsvp-title">
      <div className="section-heading">
        <span className="eyebrow">RSVP</span>
        <h2 id="rsvp-title">¿Te sumás a la fiesta?</h2>
        <p>Contanos antes del gran día. Nos ayuda muchísimo con la organización.</p>
      </div>
      <RSVPForm comingFrom={host} />
    </section>
  </main>
}
