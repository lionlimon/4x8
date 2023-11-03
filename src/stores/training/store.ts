import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useTrainingSettingsStore } from '@/stores/training-settings';
import { weightUnits } from '@/constants/weightUnits';
import {
  TrainingRecord,
  SetApproachModel,
  DeleteApproachModel,
  TrainingApproachModel,
  TrainingExerciseModel,
} from './types';

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
    weightUnit: weightUnits[trainingSettingsStore.settings.weightUnit],
    id: new Date().toISOString(),
  };

  const exerciseInitial: TrainingExerciseModel = {
    name: '',
    approaches: [],
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
   * Exercise actions
   */
  const addExercise = () => {
    if (!selectedDayTraining.value) { return; }

    selectedDayTraining.value.exercises.push({ ...exerciseInitial });
  };

  const canAddExercise = computed(() => {
    if (!selectedDayTraining.value) { return true; }

    const { exercises } = selectedDayTraining.value;

    if (exercises.length === 0) { return true; }

    if (!exercises[exercises.length - 1]?.name) { return false; }

    return true;
  });

  const setExerciseName = (name: string, exerciseIndex: number) => {
    if (!selectedDayTraining.value) { return; }

    const currentExercise = selectedDayTraining.value.exercises[exerciseIndex];

    currentExercise.name = name;
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
      date,
      exercises: [{ ...exerciseInitial }],
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

  const copyTraining = (date: Date) => {
    const training = getTrainingByDate(date);
    if (training) {
      trainings.value[getKeyFromDateForRecord(new Date())] = undefined;

      startTraining();

      training.exercises.forEach(({ name }, i) => {
        if (i !== 0) {
          addExercise();
        }
        setExerciseName(name, i);
      });
    }
  };

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
    setExerciseName,
    canAddExercise,
    addApproach,
    setApproach,
    deleteApproach,
    trainingSettingsStore,
  };
});
