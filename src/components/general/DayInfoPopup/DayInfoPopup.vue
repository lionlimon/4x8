<template>
  <div class="day-info-popup">
    <ul v-if="date && trainingStore.getTrainingByDate(date)" class="day-info-popup__list">
      <ExerciseCart
        v-for="exercise in trainingStore.getTrainingByDate(date)?.exercises"
        :key="exercise.name"
        :exercise="exercise"
      />
    </ul>

    <p class="day-info-popup__empty" v-else>Тренировок в этот день не было, но вы можете заполнить этот день</p>

    <div class="day-info-popup__actions">
      <VButton
        wide
        size="m"
        :to="{ name: 'training', query: { date: date?.toISOString() } }"
      >
        {{ changeButtonText }}
      </VButton>

      <VButton
        v-if="showCopyButton"
        wide
        size="m"
        variant="outline"
        @click="onCopyClick"
      >
        Повторить этот план
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VButton } from '@ui/VButton';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrainingStore } from '@/stores/training';
import ExerciseCart from '@/components/general/ExerciseCard/ExerciseCard.vue';

const props = defineProps<{
  date: Date
}>();

const router = useRouter();
const trainingStore = useTrainingStore();
const changeButtonText = computed(() => {
  if (props.date && trainingStore.getTrainingByDate(props.date)) {
    return 'Изменть';
  }

  return 'Заполнить день';
});

const showCopyButton = computed(() => props.date && !!trainingStore.getTrainingByDate(props.date));
const onCopyClick = () => {
  if (props.date) {
    trainingStore.copyTraining(props.date);

    router.push({ name: 'training', query: { mode: 'new-training' } });
  }
};
</script>

<style scoped lang="scss" src="./DayInfoPopup.scss"></style>
