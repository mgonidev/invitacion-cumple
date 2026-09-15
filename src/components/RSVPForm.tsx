import { FormEvent, useState } from 'react'

type FormValues = { name: string; attending: 'yes' | 'no' }
const initialForm: FormValues = { name: '', attending: 'yes' }

export function RSVPForm({ comingFrom }: { comingFrom: 'Matías' | 'Nicole' }) {
  const [values, setValues] = useState(initialForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const attending = values.attending === 'yes'

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => setValues(current => ({ ...current, [key]: value }))
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!values.name.trim()) { setError('Por favor, completá tu nombre.'); return }
    const endpoint = import.meta.env.VITE_RSVP_ENDPOINT
    if (!endpoint) { setError('Falta configurar VITE_RSVP_ENDPOINT. Revisá el archivo .env.local.'); return }
    setError(''); setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name: values.name.trim(), comingFrom, attending, submittedAt: new Date().toISOString() }),
      })
      const result: { success?: boolean; error?: string } = await response.json()
      if (!response.ok || !result.success) throw new Error(result.error || 'No pudimos registrar tu respuesta.')
      setStatus('success')
    } catch (caught) {
      setStatus('error'); setError(caught instanceof Error ? caught.message : 'Ocurrió un error inesperado. Probá nuevamente.')
    }
  }
  if (status === 'success') return <div className="success-message" role="status"><span>{attending ? '🎉' : '❤️'}</span><h3>{attending ? '¡Listo!' : 'Gracias por avisar.'}</h3><p>{attending ? 'Tu asistencia quedó confirmada. Nos vemos en el cumple.' : 'Te vamos a extrañar.'}</p></div>
  return <form className="rsvp-form" onSubmit={submit} noValidate>
    <label>Nombre<input required autoComplete="name" value={values.name} onChange={e => update('name', e.target.value)} placeholder="Ej. Juan Pérez" disabled={status === 'sending'} /></label>
    <fieldset disabled={status === 'sending'}><legend>¿Vas a venir?</legend><div className="attendance-options">
      <label className={attending ? 'selected' : ''}><input type="radio" name="attending" checked={attending} onChange={() => update('attending', 'yes')} /> Sí, obvio 🎉</label>
      <label className={!attending ? 'selected' : ''}><input type="radio" name="attending" checked={!attending} onChange={() => update('attending', 'no')} /> No, te odio 😢</label>
    </div></fieldset>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando…' : 'Confirmar asistencia'} <span aria-hidden="true">→</span></button>
  </form>
}
