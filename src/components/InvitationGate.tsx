type InvitationGateProps = { onChoose: (host: 'Matías' | 'Nicole') => void }

export function InvitationGate({ onChoose }: InvitationGateProps) {
  return <section className="invitation-gate" aria-labelledby="gate-title">
    <div className="gate-orbit gate-orbit-one" /><div className="gate-orbit gate-orbit-two" />
    <div className="gate-card">
      <p className="eyebrow">Una invitación para vos</p>
      <h1 id="gate-title">¿De parte de quién venís?</h1>
      <p>Elegí y abrí tu versión de la fiesta.</p>
      <div className="gate-options">
        <button className="gate-option matias-option" onClick={() => onChoose('Matías')}>
          <span aria-hidden="true">☻</span><b>Matías</b>
        </button>
        <button className="gate-option nicole-option" onClick={() => onChoose('Nicole')}>
          <span aria-hidden="true">✦</span><b>Nicole</b>
        </button>
      </div>
    </div>
  </section>
}
