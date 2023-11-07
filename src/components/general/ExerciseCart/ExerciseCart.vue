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

    <ul v-if="exercise.approaches" class="exercise-cart__approaches-list">
      <li v-for="(approach, i) in exercise.approaches" :key="i" class="exercise-cart__approaches-list-item">
        {{ i + 1 }} подход
        <span class="exercise-cart__approach-reps">
          <strong>{{ approach.weight }}</strong> {{ weightUnits[approach.weightUnit] }} x <strong>{{approach.reps}}</strong> повторений
        </span>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { TrainingExerciseModel } from '@/stores/training';
import { weightUnits } from '@/constants/weightUnits';
import VIcon from '@ui/VIcon/VIcon.vue';

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

<style scoped lang="scss" src="./ExerciseCart.scss"></style>
