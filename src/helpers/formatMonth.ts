import {capitalize} from "vue";

export const formatMonth = (Date) => capitalize(
  new Intl.DateTimeFormat('ru', { month: 'long' })
    .format(Date)
);
