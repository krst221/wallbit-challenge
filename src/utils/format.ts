export const formatDate = (date: Date | string): string => {
  // Convierte la fecha a Date si viene de localStorage
  if (typeof date === 'string') {
    date = new Date(date)
  }

  // Usa el locale del usuario para el formato de la fecha
  const userLocale = navigator.language || 'en-US'

  const dateStr = date.toLocaleDateString(userLocale, {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })

  const timeStr = date.toLocaleTimeString(userLocale, {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${dateStr} - ${timeStr}`
}