<template>
  <ScreenLayout class="home">
    <template #header>
      <HomeTopBar class="layout-header" />
    </template>

    <VCalendar
      :current-date="new Date(calendarStore.currentMonth)"
      @day-click="onDayClick"
      class="home__calendar"
      :is-training-day-checker="isTrainingDayChecker"
    />

    <VModal
      ref="bottomSheet"
      :sub-title="formatDate(selectedDate)"
      title="Тренировка"
      @on-close="selectedDate = new Date()"
    >
      <DayInfoPopup :date="selectedDate" />
    </VModal>
  </ScreenLayout>
</template>

<script setup lang="ts">
import { VCalendar } from '@ui/VCalendar';
import { VButton } from '@ui/VButton';
import { computed, ref } from 'vue';
import { VModal } from '@ui/VModal';
import { BaseLayout } from '@/layouts/BaseLayout';
import { HomeTopBar } from '@/components/home';
import { useCalendarStore } from '@/stores/calendar';
import { MainFooter } from '@/components/general/MainFooter';
import { useTrainingStore } from '@/stores/training';
import { DayInfoPopup } from '@/components/general/DayInfoPopup';
import { formatDate } from '@/helpers/formatDate';
import ScreenLayout from '@/layouts/ScreenLayout/ScreenLayout.vue';

const calendarStore = useCalendarStore();
const trainingStore = useTrainingStore();

const footerButton = computed(() => {
  if (trainingStore.todayTraining?.isFinished) {
    return 'Изменить тренировку';
  }

  if (trainingStore.todayTraining) {
    return 'К тренировке';
  }

  return 'Начать тренировку';
});

const bottomSheet = ref<InstanceType<typeof VModal>>();

const selectedDate = ref<Date>(new Date());
const onDayClick = async (date: Date) => {
  bottomSheet.value?.open();
  selectedDate.value = date;
};

const isTrainingDayChecker = (date: Date) => !!trainingStore.getTrainingByDate(date);
</script>

<style scoped lang="scss" src="./home.scss"></style>
