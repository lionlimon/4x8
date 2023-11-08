<template>
  <Transition mode="out-in" name="fade">
    <ul
      class="approaches-list"
      v-if="approaches.length"
    >
      <TransitionGroup name="fade">
        <li
          class="approaches-list__approach"
          v-for="(approach, i) in approaches"
          :key="approach.id"
        >
          <ExerciseApproach
            :is-based-on-body-weight="isBasedOnBodyWeight"
            :index="i"
            v-model:approach="approaches[i]"
            @delete-click="emit('delete-click', approach.id)"
          />
        </li>
      </TransitionGroup>
    </ul>

    <p v-else class="empty-message">Подходы пока не добавлены</p>
  </Transition>
</template>

<script setup lang="ts">
import { ExerciseApproach } from '@/components/training';
import { useVModel } from '@vueuse/core';
import { TrainingApproachModel } from '@/stores/training';

type Emits = {
  (e: 'update:modelValue', approaches: TrainingApproachModel[]): void,
  (e: 'delete-click', id: string): void,
};
type Props = {
  modelValue: TrainingApproachModel[],
  isBasedOnBodyWeight: boolean,
};

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const approaches = useVModel(props, 'modelValue', emit);
</script>

<style scoped lang="scss" src="./ApproachesList.scss"></style>
