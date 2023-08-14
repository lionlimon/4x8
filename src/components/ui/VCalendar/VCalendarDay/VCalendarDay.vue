<template>
  <button :class="['calendar-day', modifiers]">
    {{ day }}
    <span class="calendar-day__badge">
      <VIcon class="calendar-day__badge-icon" name="dumb" width="19" height="11"/>
    </span>
  </button>
</template>

<script setup lang="ts">
import {computed} from "vue";
import VIcon from "@ui/VIcon/VIcon.vue";

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
