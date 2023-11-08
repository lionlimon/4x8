import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useTrainingSettingsStore } from '@/stores/training-settings';

import {
  TrainingRecord,
  SetApproachModel,
  DeleteApproachModel,
  TrainingApproachModel,
  TrainingExerciseModel,
} from './types';

const generateId = () => new Date().toISOString();

export const useTrainingStore = defineStore('training', () => {
  const trainingSettingsStore = useTrainingSettingsStore();
  const trainings = useStorage<TrainingRecord>('training-record', {});
  const selectedDayDate = ref(new Date());

  const getKeyFromDateForRecord = (date: Date) => {
    const dateForKey = new Date(date);

    dateForKey.setHours(0, 0, 0, 0);
    return dateForKey.toISOString();
  };

  const selectedDayTraining = computed(() => {
    const date = getKeyFromDateForRecord(selectedDayDate.value);
    return trainings.value[date];
  });

  const setSelectedDate = (date: Date) => selectedDayDate.value = date;

  const approachInitial: TrainingApproachModel = {
    reps: 0,
    weight: 0,
    weightUnit: trainingSettingsStore.settings.weightUnit,
    id: new Date().toISOString(),
  };

  const exerciseInitial: Omit<TrainingExerciseModel, 'id'> = {
    name: '',
    approaches: [],
    isBasedOnBodyWeight: false,
  };

  /**
   * Approach actions
   */
  const addApproach = (exerciseIndex: number) => {
    if (!selectedDayTraining.value) { return; }

    const currentExercise = selectedDayTraining.value.exercises[exerciseIndex];

    const newId = new Date().toISOString();
    if (currentExercise.approaches.length > 0) {
      currentExercise.approaches.push(
        {
          ...approachInitial,
          ...currentExercise.approaches[currentExercise.approaches.length - 1],
          id: newId,
        },
      );
    } else {
      currentExercise.approaches.push({ ...approachInitial, id: newId });
    }
  };

  const setApproach = ({ approachIndex, exerciseIndex, approach }: SetApproachModel) => {
    if (!selectedDayTraining.value) { return; }

    const currentExercise = selectedDayTraining.value.exercises[exerciseIndex];
    if (!currentExercise) { return; }

    const currentApproach = currentExercise.approaches[approachIndex];
    if (!currentApproach) { return; }

    currentExercise.approaches[approachIndex] = approach;
  };

  const deleteApproach = ({ exerciseIndex, approachIndex }: DeleteApproachModel) => {
    if (!selectedDayTraining.value) { return; }

    const currentExercise = selectedDayTraining.value.exercises[exerciseIndex];
    if (!currentExercise) { return; }

    currentExercise.approaches.splice(approachIndex, 1);
  };

  /**
   * Training actions
   */
  const initiateTraining = (trainingDate = new Date()) => {
    const date = trainingDate.toISOString();

    const dateForKeyISO = getKeyFromDateForRecord(trainingDate);

    if (trainings.value[dateForKeyISO]) {
      return;
    }

    trainings.value[dateForKeyISO] = {
      basedOnTraining: null,
      date,
      exercises: [],
      isSavedToServer: false,
    };
  };

  const startTraining = () => {
    initiateTraining();
  };

  const startTrainingByDate = (date: Date) => {
    setSelectedDate(date);
    initiateTraining(date);
  };

  const getTrainingByDate = (date: Date) => trainings.value[getKeyFromDateForRecord(date)];

  const deleteTraining = (date: Date) => delete trainings.value[getKeyFromDateForRecord(date)];

  const addExercise = (exercise?: TrainingExerciseModel) => {
    if (!selectedDayTraining.value) { return; }

    selectedDayTraining.value.exercises
      .push({ ...(exercise ?? { ...exerciseInitial, id: generateId() }) });
  };
  const copyTraining = (date: Date) => {
    const training = getTrainingByDate(date);
    if (training) {
      delete trainings.value[getKeyFromDateForRecord(new Date())];

      // Start today training
      startTrainingByDate(new Date());

      // Copy training
      training.exercises.forEach(({ name, isBasedOnBodyWeight }) => {
        addExercise({
          isBasedOnBodyWeight,
          name,
          id: generateId(),
          approaches: [],
        });
      });

      if (selectedDayTraining.value) {
        selectedDayTraining.value.basedOnTraining = training.date;
      }
    }
  };

  const deleteExercise = (date: Date, exerciseId: string) => {
    const training = getTrainingByDate(date);
    if (!training) return;

    training.exercises = training.exercises.filter((exercise) => exercise.id !== exerciseId);
  };

  const editExercise = (date: Date, exercise: Partial<TrainingExerciseModel> & { id: string }) => {
    if (!selectedDayTraining.value) { return; }

    const training = getTrainingByDate(date);
    if (!training) return;

    training.exercises = training.exercises.map((item) => {
      if (item.id === exercise.id) {
        return { ...item, ...exercise };
      }

      return item;
    });
  };

  const canAddExercise = computed(() => {
    if (!selectedDayTraining.value) { return true; }

    const { exercises } = selectedDayTraining.value;

    if (exercises.length === 0) { return true; }

    if (!exercises[exercises.length - 1]?.name) { return false; }

    return true;
  });

  return {
    startTraining,
    trainings,
    setSelectedDate,
    selectedDayTraining,
    deleteTraining,
    getTrainingByDate,
    startTrainingByDate,
    copyTraining,
    addExercise,
    canAddExercise,
    addApproach,
    setApproach,
    deleteApproach,
    trainingSettingsStore,
    editExercise,
    deleteExercise,
  };
});
