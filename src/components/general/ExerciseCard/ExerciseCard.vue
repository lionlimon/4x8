<template>
  <li class="exercise-cart">
    <div class="exercise-cart__title">
      {{ exercise.name }}
      <button
        type="button"
        v-if="canEdit"
        class="exercise-cart__edit"
        @click="emit('edit-click')"
      >
        <VIcon name="edit" width="18" height="18" />
      </button>
    </div>

    <ul v-if="exercise.approaches.length" class="exercise-cart__approaches-list">
      <li v-for="(approach, i) in exercise.approaches" :key="i" class="exercise-cart__approaches-list-item">
        {{ i + 1 }} подход
        <div class="exercise-cart__approach-reps">
          <VIcon v-if="exercise.isBasedOnBodyWeight" class="exercise-cart__body-icon" name="body" />
          {{ exercise.isBasedOnBodyWeight ? '+' : null }}
          {{ approach.weight }}
          {{ weightUnits[exercise.weightUnit] }}
          <div>
            по {{approach.reps}} повторений
          </div>
        </div>
      </li>
    </ul>

    <p class="exercise-cart__empty empty-message" v-else>
      Подходы пока не добавлены
    </p>
  </li>
</template>

<script setup lang="ts">
import { TrainingExerciseModel } from '@/stores/training';
import { weightUnits } from '@/constants/weightUnits';
import { VIcon } from '@ui/VIcon';

type Emits = {
  (e: 'edit-click'): void
};

type Props = {
  exercise: TrainingExerciseModel,
  canEdit?: boolean
};

const emit = defineEmits<Emits>();

defineProps<Props>();
</script>

<style scoped lang="scss" src="./ExerciseCard.scss"></style>
