import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { TrainingSettings } from '@/stores/training-settings/types';

export const useTrainingSettingsStore = defineStore('training-settings', () => {
  const settings = useStorage<TrainingSettings>('training-settings-state', {
    weightUnit: 'kg',
  });

  return {
    settings,
  };
});
