<template>
  <div class="calendar">
    <div
      v-for="day in dayNames"
      :key="day"
      class="calendar__day-name"
    >
      {{ day }}
    </div>

    <VCalendarDay
      v-for="({day, month, year}) in allDays"
      :key="`${day}${month}${year}`"
      :day="day"
      :month="month"
      class="calendar__day"
      :has-training="isTrainingDayChecker(new Date(`${month + 1}/${day}/${year}`))"
      @click="emit('day-click', new Date(`${month + 1}/${day}/${year}`))"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, computed, watch} from "vue";
import { VCalendarDay } from "./VCalendarDay";

type Emits = { (e: 'day-click', date: Date): void};
type Day = {day: number, month: number, year: number};
const emit = defineEmits<Emits>();

const props = defineProps<{
  currentDate: Date,
  isTrainingDayChecker: (date: Date) => boolean
}>();

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const currentDate = ref(props.currentDate);
watch(() => props.currentDate, (value) => {
  currentDate.value = value;
});
const getDaysCount = (year: number, month: number) => {
  const dateFrom = new Date(year, month, 1);
  const dateTo = new Date(year, month + 1, 1);

  return Math.round((Number(dateTo) - Number(dateFrom)) / 1000 / 3600 / 24);
}

const currentMonthDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();

  return getDaysCount(year, month);
});

const allDays = computed(() => {
  const currentDays: Day[]  = [];

  const mapDay = (date: Date, day: number) => ({
    day: day,
    month: date.getMonth(),
    year: date.getFullYear(),
  });

  for (let i = 1; i <= currentMonthDays.value; i ++) {
    currentDays.push(mapDay(currentDate.value, i));
  }

  const date = new Date(currentDate.value);
  date.setDate(1);

  const needAddBefore = date.getDay() === 0 ? date.getDay() + 7 - 1 : date.getDay() - 1;
  const daysCountInPrevMonth = getDaysCount(date.getFullYear(), date.getMonth() - 1);
  const prevDays: Day[] = [];

  for (let i = daysCountInPrevMonth + 1 - needAddBefore; i <= daysCountInPrevMonth; i++) {
    const prevDate = new Date(currentDate.value);
    prevDate.setMonth(currentDate.value.getMonth() - 1);
    prevDays.push(mapDay(prevDate, i));
  }

  date.setDate(currentMonthDays.value);
  const needAddAfter = date.getDay() > 0 ? 7 - date.getDay() : 0;
  const nextDays: Day[] = [];

  for (let i = 1; i <= needAddAfter; i++) {
    const nextDate = new Date(currentDate.value);
    nextDate.setMonth(currentDate.value.getMonth() + 1);
    nextDays.push(mapDay(nextDate, i));
  }

  return [...prevDays, ...currentDays, ...nextDays];
});
</script>

<style scoped lang="scss" src="./VCalendar.scss"></style>
