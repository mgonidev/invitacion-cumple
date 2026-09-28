import { useState } from 'react'
import { EventInfo } from './components/EventInfo'
import { Hero } from './components/Hero'
import { InvitationGate } from './components/InvitationGate'

export default function App() {
  const [host, setHost] = useState<'Matías' | 'Nicole' | null>(null)
  if (!host) return <main><InvitationGate onChoose={setHost} /></main>
  return <main className={`invitation theme-${host === 'Matías' ? 'matias' : 'nicole'}`}>
    <Hero host={host} />
    <EventInfo />
  </main>
}
