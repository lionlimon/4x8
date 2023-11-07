<template>
  <div class="exercise-top-bar">
    <div class="exercise-top-bar__actions">
      <VButton variant="outline" @click="settingsAreOpened = !settingsAreOpened">
        <VIcon name="settings" /> {{ settingsButtonText }}
      </VButton>

      <VIconAction
        v-if="hideDeletion"
        theme="dangerous"
        icon="trash"
        @click="emit('delete-exercise-click')"
      />
    </div>

    <Transition name="fade" mode="out-in">
      <div v-if="settingsAreOpened" class="exercise-top-bar__settings">
        <VSwitch v-model="settings.bodyWeight">Собственный вес</VSwitch>
        <VSelect v-model="settings.weightUnit" :options="options">Ед. Измерения</VSelect>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { VButton } from '@ui/VButton';
import { VIcon } from '@ui/VIcon';
import { VIconAction } from '@ui/VIconAction';
import { ref, computed } from 'vue';
import { VSwitch } from '@ui/VSwitch';
import { VSelect } from '@ui/VSelect';
import { weightUnits, WeightUnit } from '@/constants/weightUnits';
import { ExerciseSettings } from '@/components/training/ExerciseTopBar/types';
import { useVModel } from '@vueuse/core';

type Props = {
  modelValue: ExerciseSettings,
  hideDeletion: boolean,
};

type Emits = {
  (e: 'update:modelValue', value: ExerciseSettings): void
  (e: 'delete-exercise-click'): void
};

const settingsAreOpened = ref(false);
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const settings = useVModel(props, 'modelValue', emit);

const options = Object.keys(weightUnits).map((key) => ({
  title: weightUnits[key as WeightUnit],
  value: key,
}));

const settingsButtonText = computed(() => (settingsAreOpened.value ? 'Закрыть' : 'Параметры'));
</script>

<style scoped lang="scss" src="./ExerciseTopBar.scss"></style>
