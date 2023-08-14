<template>
  <BaseLayout class="home">
    <template #header>
      <HomeTopBar />
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

    <template #footer>
      <MainFooter>
        <VButton :to="{ name: 'training', query: { mode: 'new-training' } }" size="m" wide>
          {{ footerButton }}
        </VButton>
      </MainFooter>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseLayout } from '@/layouts/BaseLayout';
import { HomeTopBar } from "@/components/home";
import { VCalendar } from "@ui/VCalendar";
import { useCalendarStore } from "@/stores/calendar";
import {MainFooter} from "@/components/general/MainFooter";
import {VButton} from "@ui/VButton";
import {useTrainingStore} from "@/stores/training";
import {computed, ref} from "vue";
import { VModal } from "@ui/VModal";
import { DayInfoPopup } from "@/components/general/DayInfoPopup";
import {formatDate} from "@/helpers/formatDate";

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
}

const isTrainingDayChecker = (date: Date) => {
  return !!trainingStore.getTrainingByDate(date);
}
</script>

<style scoped lang="scss" src="./home.scss"></style>
