import { useEffect, useState } from 'react'
import { event } from '../config/event'

type Remaining = { days: number; hours: number; minutes: number; isPast: boolean }

function remaining(): Remaining {
  const difference = new Date(event.date).getTime() - Date.now()
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, isPast: true }
  return {
    days: Math.floor(difference / 86_400_000),
    hours: Math.floor((difference / 3_600_000) % 24),
    minutes: Math.floor((difference / 60_000) % 60),
    isPast: false,
  }
}

export function Countdown() {
  const [time, setTime] = useState(remaining)
  useEffect(() => {
    const timer = window.setInterval(() => setTime(remaining()), 30_000)
    return () => window.clearInterval(timer)
  }, [])
  if (time.isPast) return <p className="countdown">¡La fiesta ya empezó!</p>
  return <p className="countdown" aria-label={`Faltan ${time.days} días, ${time.hours} horas y ${time.minutes} minutos`}>
    <strong>Faltan</strong> {time.days} días <i>·</i> {String(time.hours).padStart(2, '0')} horas <i>·</i> {String(time.minutes).padStart(2, '0')} minutos
  </p>
}
