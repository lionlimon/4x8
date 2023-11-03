<template>
  <ScreenLayout class="training">
    <template #header>
      <TopBar :title="currentDate" screen-title="Тренировка" />
    </template>
    <ul class="training__exercises" v-if="currentTraining">
      <TransitionGroup name="fade">
        <li
          class="training__exercise"
          v-for="(exercise, i) in currentTraining.exercises"
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

    <VButton
      :disabled="!trainingStore.canAddExercise"
      variant="outline"
      size="m"
      wide
      @click="trainingStore.addExercise()"
    >
      <VIcon name="plus" />
      Добавить упражнение
    </VButton>
    <VButton size="m" wide @click="onSaveClick">{{ saveButtonText }}</VButton>
  </ScreenLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { VButton } from '@ui/VButton';
import { VIcon } from '@ui/VIcon/';
import { useRoute, useRouter } from 'vue-router';
import { BaseLayout } from '@/layouts/BaseLayout';
import { TopBar } from '@/components/general/TopBar/';
import { formatDate } from '@/helpers/formatDate';
import { Exercise } from '@/components/training';
import { MainFooter } from '@/components/general/MainFooter/';
import { useTrainingStore } from '@/stores/training';
import ScreenLayout from '@/layouts/ScreenLayout/ScreenLayout.vue';

const route = useRoute();
const router = useRouter();
const trainingStore = useTrainingStore();

const currentDate = computed(() => {
  if (route.query.date) {
    return formatDate(new Date(route.query.date as string));
  }
  return formatDate(new Date());
});

const currentTraining = computed(() => {
  if (route.query.date) {
    return trainingStore.getTrainingByDate(new Date(route.query.date as string));
  }

  return trainingStore.todayTraining;
});

if (!trainingStore.todayTraining && route.query.mode === 'new-training') {
  trainingStore.startTraining();
}

if (route.query.date) {
  trainingStore.startTrainingByDate(new Date(route.query.date as string));
}

const onExerciseNameChange = (name: string, exerciseIndex: number) => {
  trainingStore.setExerciseName(name, exerciseIndex);
};

const onSaveClick = () => {
  if (route.query.mode === 'new-training') {
    trainingStore.finishExercise();
  }

  router.push({ name: 'home' });
};

const saveButtonText = computed(() => {
  if (route.query.mode === 'new-training' && !trainingStore.todayTraining?.isFinished) { return 'Завершить'; }
  return 'Сохранить';
});
</script>

<style scoped lang="scss" src="./training.scss"></style>
