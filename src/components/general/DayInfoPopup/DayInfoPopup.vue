<template>
  <div class="day-info-popup">
    <ul v-if="date && trainingStore.getTrainingByDate(date)" class="day-info-popup__list">
      <li v-for="exercise in trainingStore.getTrainingByDate(date).exercises" :key="exercise.name" class="day-info-popup__item">
        <div class="day-info-popup__exercise-title">{{ exercise.name }}</div>

        <ul v-if="exercise.approaches" class="day-info-popup__approaches-list">
          <li v-for="(approach, i) in exercise.approaches" :key="i" class="day-info-popup__approaches-list-item">
            {{ i + 1 }} подход <span class="day-info-popup__approach-reps">{{ approach.weight }} {{ approach.weightUnit }} x {{approach.reps}}</span>
          </li>
        </ul>
      </li>
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
        @click="onCopyClick"
      >
        Скопировать этот план
      </VButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VButton } from '@ui/VButton';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useTrainingStore } from '@/stores/training';

const props = defineProps<{
  date: Date | null
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
