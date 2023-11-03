<template>
  <div class="exercise">
    <input
      v-model="name"
      placeholder="Введите название упражнения"
      type="text"
      class="exercise__name">

    <ul class="exercise__approaches">
      <TransitionGroup name="fade">
        <li v-for="(approach, i) in exercise.approaches" :key="approach.id ?? i" class="exercise__approach">
          <ExerciseApproach
            :approach="approach"
            :index="i"
            @delete-click="(index) => emit('delete-approach-click', index)"
            @update-approach="(newApproach) => emit('update-approach', i, newApproach)"
          />
        </li>
      </TransitionGroup>
    </ul>

    <div class="exercise__actions">
      <VButton variant="outline" wide @click="emit('add-approach-click')">
        <VIcon name="plus" />
        Добавить подход
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VButton } from '@ui/VButton';
import { VIcon } from '@ui/VIcon';
import { ref, watch } from 'vue';
import { TrainingExerciseModel, TrainingApproachModel } from '@/stores/training';
import { ExerciseApproach } from './ExerciseApproach';

type Emits = {
  (e: 'add-approach-click'): void,
  (e: 'delete-approach-click'): void,
  (e: 'change-name', value: string): void,
  (e: 'delete-approach-click', index: number): void
  (e: 'update-approach', approachIndex: number, approach: TrainingApproachModel): void
};
const emit = defineEmits<Emits>();

const props = defineProps<{
  exercise: TrainingExerciseModel
}>();

const name = ref(props.exercise.name ?? '');
watch(name, () => emit('change-name', name.value));
</script>

<style scoped lang="scss" src="./Exercise.scss"></style>
