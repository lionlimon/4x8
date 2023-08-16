<template>
  <BaseLayout class="training">
    <template #header>
      <TopBar back-link="/" :title="currentDate" screen-title="Тренировка"/>
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
              exerciseIndex: i
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

    <template #footer>
      <MainFooter class="training__footer">
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
      </MainFooter>
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import { BaseLayout } from "@/layouts/BaseLayout";
import { TopBar } from "@/components/general/TopBar/";
import { computed } from "vue";
import { formatDate } from "@/helpers/formatDate";
import { Exercise } from "@/components/training";
import { MainFooter } from "@/components/general/MainFooter/";
import { VButton } from "@ui/VButton";
import { VIcon } from "@ui/VIcon/";
import {useTrainingStore} from "@/stores/training";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const currentDate = computed(() => {
  if (route.query.date) {
    return formatDate(new Date(route.query.date as string));
  }
  return formatDate(new Date())
})

const currentTraining = computed(() => {
  if (route.query.date) {
    return trainingStore.getTrainingByDate(new Date(route.query.date as string));
  }

  return trainingStore.todayTraining;
})

const trainingStore = useTrainingStore();

if (!trainingStore.todayTraining && route.query.mode === 'new-training') {
  trainingStore.startTraining();
}

if (route.query.date) {
  trainingStore.startTrainingByDate(new Date(route.query.date as string));
}

const onExerciseNameChange = (name: string, exerciseIndex: number) => {
  trainingStore.setExerciseName(name, exerciseIndex);
}

const onSaveClick = () => {
  if (route.query.mode === 'new-training') {
    trainingStore.finishExercise();
  }

  router.push({ name: 'home' });
}

const saveButtonText = computed(() => {
  if (route.query.mode === 'new-training' && !trainingStore.todayTraining?.isFinished) {return 'Завершить'}
  return 'Сохранить';
})
</script>

<style scoped lang="scss" src="./training.scss"></style>