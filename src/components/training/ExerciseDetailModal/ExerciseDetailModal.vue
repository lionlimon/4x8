<template>
  <VModal
    full-height
    ref="bottomSheet"
    class="exercise-detail-modal"
    @on-close="onClose">
    <div class="exercise-detail-modal__container container">
      <NameInput v-model="form.name" />

      <ExerciseTopBar
        v-model="settings"
        class="exercise-detail-modal__top-bar"
        :hide-deletion="!!currentExercisePayload"
        @delete-exercise-click="onDeleteExerciseClick"
      />

      <ApproachesList
        :weight-unit="settings.weightUnit"
        v-model="form.approaches"
        :is-based-on-body-weight="form.isBasedOnBodyWeight"
        @delete-click="onDeleteClick"
      />

      <p v-if="pastExercise">Прошлое занятие</p>
      <ExerciseCard
        v-if="pastExercise"
        :exercise="pastExercise"
      />

      <ActionButtons
        @add-approach-click="addApproach"
        @save-click="onSaveClick"
        :disabled="validation.$invalid"
      />
    </div>

    <DeletionConfirmModal
      ref="deletionConfirmModal"
      text="Удалить упражнение?"
      @confirm="onConfirmExerciseDeletion"
    />
  </VModal>
</template>

<script setup lang="ts">
import { VModal } from '@ui/VModal';
import { ref, watch, computed } from 'vue';
import { useTrainingStore, TrainingExerciseModel } from '@/stores/training';
import { ExerciseSettings } from '@/components/training/ExerciseTopBar/types';
import { useTrainingSettingsStore } from '@/stores/training-settings';
import { required } from '@vuelidate/validators';
import { useValidation } from '@/composables/useValidation';
import { cloneObject } from '@/helpers/cloneObject';
import { DeletionConfirmModal } from '@/components/general/DeletionConfirmModal';
import ExerciseCard from '@/components/general/ExerciseCard/ExerciseCard.vue';
import { ApproachesList } from './ApproachesList';
import { ExerciseTopBar } from '../ExerciseTopBar';
import { NameInput } from './NameInput';
import { ActionButtons } from './ActionButtons';

const trainingStore = useTrainingStore();
const settingsStore = useTrainingSettingsStore();
const currentExercisePayload = ref<{ date: Date, exerciseId: string } | null>(null);

const bottomSheet = ref<InstanceType<typeof VModal>>();
const deletionConfirmModal = ref<InstanceType<typeof DeletionConfirmModal>>();

const getInitialSettings = () => ({
  bodyWeight: false,
  weightUnit: settingsStore.settings.weightUnit,
});

const settings = ref<ExerciseSettings>(getInitialSettings());

const getInitialForm = () => ({
  name: '',
  approaches: [],
  id: new Date().toISOString(),
  isBasedOnBodyWeight: false,
  weightUnit: settings.value.weightUnit,
});

const form = ref<TrainingExerciseModel>(getInitialForm());

const rules = {
  name: {
    required,
  },
};

const { validation } = useValidation(rules, form);

const addApproach = () => {
  const approach = form.value.approaches[form.value.approaches.length - 1] ?? {
    weightUnit: settings.value.weightUnit,
    weight: 0,
    reps: 0,
    id: (new Date()).toISOString(),
  };

  form.value.approaches.push({ ...approach });
};

const onDeleteClick = (id: string) => {
  const index = form.value.approaches.findIndex((approach) => approach.id === id);
  form.value.approaches.splice(index, 1);
};

const onClose = () => {
  currentExercisePayload.value = null;
  settings.value = getInitialSettings();
  form.value = getInitialForm();
};

const onSaveClick = async () => {
  if (!await validation.value.$validate()) return;

  if (currentExercisePayload.value) {
    trainingStore.editExercise(currentExercisePayload.value.date, form.value);
  } else {
    trainingStore.addExercise(form.value);
  }

  bottomSheet.value?.close();
};

const onDeleteExerciseClick = () => {
  deletionConfirmModal.value?.open();
};

const onConfirmExerciseDeletion = () => {
  if (!currentExercisePayload.value) return;
  trainingStore.deleteExercise(currentExercisePayload.value.date, currentExercisePayload.value.exerciseId);
  bottomSheet.value?.close();
};

watch(() => settings.value.weightUnit, (weightUnit) => {
  form.value.weightUnit = weightUnit;
});

watch(() => settings.value.bodyWeight, (isBasedOnBodyWeight) => {
  form.value.isBasedOnBodyWeight = isBasedOnBodyWeight;
});

const pastExercise = computed(() => {
  const { pastTraining } = trainingStore;

  return pastTraining?.exercises.find(({ name }) => name === form.value.name);
});

defineExpose({
  open: (payload?: { exerciseId: string, date: Date }) => {
    bottomSheet.value?.open();

    if (!payload) return;

    const training = trainingStore.getTrainingByDate(payload.date);
    if (!training) return;

    const exercise = training.exercises.find(
      (exerciseItem) => exerciseItem.id === payload?.exerciseId,
    );
    if (!exercise) return;

    form.value = cloneObject(exercise);
    settings.value = {
      weightUnit: exercise.weightUnit,
      bodyWeight: exercise.isBasedOnBodyWeight,
    };
    currentExercisePayload.value = { exerciseId: payload.exerciseId, date: payload.date };
  },

  close: () => bottomSheet.value?.close(),
});
</script>

<style scoped lang="scss" src="./ExerciseDetailModal.scss"></style>
