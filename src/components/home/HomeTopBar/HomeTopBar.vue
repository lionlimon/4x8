<template>
  <div class="home-top-bar">
    <TopBar>
      <VMonthPicker v-model="currentMonth" />
    </TopBar>
  </div>
</template>

<script setup lang="ts">
import { VMonthPicker } from '@ui/VMonthPicker';
import { ref, watch } from 'vue';
import { TopBar } from '@/components/general/TopBar';
import { useCalendarStore } from '@/stores/calendar';

const calendarStore = useCalendarStore();

type Emits = {};
defineEmits<Emits>();

const currentMonth = ref(calendarStore.currentMonth);
watch(currentMonth, () => calendarStore.setMonth(currentMonth.value));
</script>

<style scoped lang="scss" src="./HomeTopBar.scss"></style>
