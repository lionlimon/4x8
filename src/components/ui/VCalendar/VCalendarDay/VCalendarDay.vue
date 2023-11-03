<template>
  <button :class="['calendar-day', modifiers]">
    {{ day }}
    <span v-if="hasTraining" class="calendar-day__point" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type Emits = {};
const emit = defineEmits<Emits>();

const props = defineProps<{
  day: number,
  month: number,
  hasTraining?: boolean
}>();

const currentDate = new Date();
const modifiers = computed(() => ({
  'calendar-day--active': props.day === currentDate.getDate() && props.month === currentDate.getMonth(),
  'calendar-day--has-training': props.hasTraining,
}));
</script>

<style scoped lang="scss" src="./VCalendarDay.scss"></style>
