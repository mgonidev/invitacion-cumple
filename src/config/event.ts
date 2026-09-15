/** Editá únicamente estos valores para personalizar la invitación. */
export const event = {
  eventName: 'El cumple de Matías y Nicole',
  hostName: 'Matías y Nicole',
  // Fecha y hora ISO con zona horaria. Usala también para la cuenta regresiva.
  date: '2026-10-10T00:00:00-03:00',
  time: 'A partir de las 23 hs',
  venue: 'El lugar de la fiesta',
  address: 'La ubicación está en Google Maps',
  googleMapsUrl: 'https://maps.app.goo.gl/DtJRLX7x5WBqWi2H9?g_st=iw',
} as const

export const formattedDate = new Intl.DateTimeFormat('es-AR', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
}).format(new Date(event.date))
