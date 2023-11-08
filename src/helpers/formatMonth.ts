import { capitalize } from 'vue';

export const formatMonth = (date: Date) => capitalize(
  new Intl.DateTimeFormat('ru', { month: 'long' })
    .format(date),
);
