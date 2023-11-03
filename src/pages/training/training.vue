<template>
  <ScreenLayout class="training">
    <template #header>
      <TopBar :title="currentDate" screen-title="Тренировка" />
    </template>
    <ul class="training__exercises" v-if="trainingStore.selectedDayTraining">
      <TransitionGroup name="fade">
        <li
          class="training__exercise"
          v-for="(exercise, i) in trainingStore.selectedDayTraining.exercises"
          :key="i"
        >
          <Exercise
            :exercise="exercise"
            @change-name="(name) => onExerciseNameChange(name, i)"
            @add-approach-click="trainingStore.addApproach(i)"
            @delete-approach-click="(approachIndex) => trainingStore.deleteApproach({
              approachIndex,
              exerciseIndex: i,
            })"
            @update-approach="(approachIndex, approach) => trainingStore.setApproach({
              approach,
              approachIndex,
              exerciseIndex: i,
            })"
          />
        </li>
      </TransitionGroup>
    </ul>

    <p class="training__empty" v-else>Сегодня ещё не было занатий</p>

    <template #footer>
      <div class="container">
        <VButton
          v-if="trainingStore.selectedDayTraining"
          :disabled="!trainingStore.canAddExercise"
          variant="outline"
          size="m"
          wide
          @click="trainingStore.addExercise()"
        >
          <VIcon name="plus" />
          Добавить упражнение
        </VButton>

        <VButton
          v-else
          size="m"
          wide
          @click="trainingStore.startTraining()"
        >
          Начать тренировку
        </VButton>
      </div>
    </template>
  </ScreenLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VButton } from '@ui/VButton';
import { VIcon } from '@ui/VIcon/';
import { useRoute } from 'vue-router';
import { TopBar } from '@/components/general/TopBar/';
import { formatDate } from '@/helpers/formatDate';
import { Exercise } from '@/components/training';
import { useTrainingStore } from '@/stores/training';
import ScreenLayout from '@/layouts/ScreenLayout/ScreenLayout.vue';

const route = useRoute();
const trainingStore = useTrainingStore();

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

const onExerciseNameChange = (name: string, exerciseIndex: number) => {
  trainingStore.setExerciseName(name, exerciseIndex);
};
</script>

<style scoped lang="scss" src="./training.scss"></style>
