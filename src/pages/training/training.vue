<template>
  <ScreenLayout class="training">
    <template #header>
      <TopBar :title="currentDate" screen-title="Тренировка" />
    </template>
    <ul class="training__exercises" v-if="trainingStore.selectedDayTraining?.exercises.length">
      <TransitionGroup name="fade">
        <li
          class="training__exercise"
          v-for="(exercise, i) in trainingStore.selectedDayTraining.exercises"
          :key="i"
        >
          <ExerciseCard
            can-edit
            :exercise="exercise"
            @edit-click="() => onEditClick(exercise.id)"
          />
        </li>
      </TransitionGroup>
    </ul>

    <p class="training__empty" v-else>Добавте упражнения</p>

    <template #footer>
      <div class="container">
        <VIconAction
          class="training__add"
          v-if="trainingStore.selectedDayTraining"
          size="m"
          icon="plus"
          @click="exerciseModal?.open()"
        />

        <VButton
          v-else
          size="m"
          wide
          @click="onStartClick"
        >
          Начать тренировку
        </VButton>
      </div>
    </template>

    <ExerciseDetailModal ref="exerciseModal" />
  </ScreenLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { VButton } from '@ui/VButton';
import { useRoute } from 'vue-router';
import { TopBar } from '@/components/general/TopBar/';
import { formatDate } from '@/helpers/formatDate';
import { useTrainingStore } from '@/stores/training';
import { ScreenLayout } from '@/layouts/ScreenLayout';
import { VIconAction } from '@ui/VIconAction';
import { ExerciseDetailModal } from '@/components/training/ExerciseDetailModal';
import { ExerciseCard } from '@/components/general/ExerciseCard';

const route = useRoute();
const trainingStore = useTrainingStore();
const exerciseModal = ref<InstanceType<typeof ExerciseDetailModal>>();

trainingStore.setSelectedDate(
  route.query.date ? new Date(route.query.date as string) : new Date(),
);

const currentDate = computed(() => {
  if (route.query.date) {
    return formatDate(new Date(route.query.date as string));
  }
  return formatDate(new Date());
});

if (route.query.date) {
  trainingStore.startTrainingByDate(new Date(route.query.date as string));
}

const onStartClick = () => {
  trainingStore.startTraining();
  exerciseModal.value?.open();
};

const onEditClick = (exerciseId: string) => {
  const date = trainingStore.selectedDayTraining?.date;
  if (!date) return;

  exerciseModal.value?.open({
    exerciseId,
    date: new Date(date),
  });
};
</script>

<style scoped lang="scss" src="./training.scss"></style>
