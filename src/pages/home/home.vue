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
      <template #actions>
        <VIconAction
          v-if="trainingStore.getTrainingByDate(selectedDate)"
          theme="dangerous"
          icon="trash"
          @click="() => deletionBottomSheet?.open()"
        />
      </template>
      <DayInfoPopup :date="selectedDate" />
    </VModal>
    <DeletionConfirmModal
      ref="deletionBottomSheet"
      text="Удалить тренировку?"
      @confirm="onConfirmDeletion"
    />
  </ScreenLayout>
</template>

<script setup lang="ts">
import { VCalendar } from '@ui/VCalendar';
import { ref } from 'vue';
import { VModal } from '@ui/VModal';
import { HomeTopBar } from '@/components/home';
import { useCalendarStore } from '@/stores/calendar';
import { useTrainingStore } from '@/stores/training';
import { DayInfoPopup } from '@/components/general/DayInfoPopup';
import { formatDate } from '@/helpers/formatDate';
import { ScreenLayout } from '@/layouts/ScreenLayout';
import { VIconAction } from '@ui/VIconAction';
import { DeletionConfirmModal } from '@/components/general/DeletionConfirmModal';

const calendarStore = useCalendarStore();
const trainingStore = useTrainingStore();

const bottomSheet = ref<InstanceType<typeof VModal>>();
const deletionBottomSheet = ref<InstanceType<typeof DeletionConfirmModal>>();

const selectedDate = ref<Date>(new Date());
const onDayClick = async (date: Date) => {
  bottomSheet.value?.open();
  selectedDate.value = date;
};

const onConfirmDeletion = () => {
  trainingStore.deleteTraining(selectedDate.value);
  bottomSheet.value?.close();
};
const isTrainingDayChecker = (date: Date) => !!trainingStore.getTrainingByDate(date);
</script>

<style scoped lang="scss" src="./home.scss"></style>
