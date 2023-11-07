<template>
  <div class="exercise-approach">
    <div class="exercise-approach__head">
      <div class="exercise-approach__count">
        {{ index + 1 }} подход
      </div>

      <button
        type="button"
        class="exercise-approach__delete"
        @click="emit('delete-click', approach.id)"
      >
        <VIcon name="trash" width="18" height="18" />
      </button>
    </div>

    <div class="exercise-approach__actions">
      <div class="exercise-approach__actions-group">
        <div class="exercise-approach__actions-title">Повторения</div>
        <VCounter v-model="approachForm.reps" />
      </div>
      <div class="exercise-approach__actions-group">
        <div class="exercise-approach__actions-title">Вес ({{ weightUnits[approach.weightUnit] }})</div>
        <VMiniInput
          ref="input"
          inputmode="numeric"
          type="number"
          v-model="approachForm.weight"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VIcon } from '@ui/VIcon';
import { ref } from 'vue';
import { VCounter } from '@ui/VCounter';
import { VMiniInput } from '@ui/VMiniInput';
import { TrainingApproachModel } from '@/stores/training';
import { useVModel } from '@vueuse/core';
import { weightUnits } from '../../../constants/weightUnits';

type Emits = {
  (e: 'delete-click', id: string): void,
  (e: 'update:approach', approach: TrainingApproachModel): void
};

const emit = defineEmits<Emits>();

const props = defineProps<{
  approach: TrainingApproachModel,
  index: number
}>();

const approachForm = useVModel(props, 'approach', emit);

const input = ref<InstanceType<typeof VMiniInput>>();
</script>

<style scoped lang="scss" src="./ExerciseApproach.scss"></style>
