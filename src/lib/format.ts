const eventDateFormatter = new Intl.DateTimeFormat('hu-HU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'Europe/Budapest',
})

export function formatEventDate(value: string | Date): string {
  return eventDateFormatter.format(new Date(value))
}
