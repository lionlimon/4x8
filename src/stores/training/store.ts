import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  TrainingRecord,
  SetApproachModel,
  DeleteApproachModel,
  TrainingApproachModel,
  TrainingExerciseModel,
} from './types';

export const useTrainingStore = defineStore('training', () => {
  const trainings = useStorage<TrainingRecord>('training-record', {});
  const router = useRouter();
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
    reps: 1,
    weight: 1,
    weightUnit: 'кг',
    id: new Date().toISOString(),
  };

  const exerciseInitial: TrainingExerciseModel = {
    name: '',
    approaches: [{ ...approachInitial, id: new Date().toISOString() }],
  };

  const initiateTraining = (isToday = true, trainingDate = new Date()) => {
    const date = trainingDate.toISOString();

    const dateForKeyISO = getKeyFromDateForRecord(trainingDate);

    if (trainings.value[dateForKeyISO]) {
      return;
    }

    const checkIsFinished = () => {
      const nowDate = new Date();
      const selectedDate = new Date(trainingDate);

      nowDate.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      return Number(selectedDate) < Number(nowDate);
    };

    trainings.value[dateForKeyISO] = {
      date,
      exercises: [{ ...exerciseInitial }],
      isFinished: isToday ? false : checkIsFinished(),
      finishDate: null,
      isSavedToServer: false,
    };
  };

  const startTraining = () => {
    initiateTraining();
  };

  const startTrainingByDate = (date: Date) => {
    setSelectedDate(date);
    initiateTraining(false, date);
  };

  const todayTraining = computed(() => {
    const date = getKeyFromDateForRecord(new Date());
    return trainings.value[date];
  });

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

  const finishExercise = () => {
    if (!todayTraining.value) { return; }
    todayTraining.value.isFinished = true;
    router.push({ name: 'home' });
  };

  const getTrainingByDate = (date: Date) => trainings.value[getKeyFromDateForRecord(date)];

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
    todayTraining,
    addExercise,
    setExerciseName,
    addApproach,
    setApproach,
    canAddExercise,
    deleteApproach,
    finishExercise,
    getTrainingByDate,
    setSelectedDate,
    startTrainingByDate,
    copyTraining,
  };
});
