export const formatDate = (date: Date) => new Intl.DateTimeFormat('ru-RU', {
  dateStyle: 'long'
}).format(new Date(date))
