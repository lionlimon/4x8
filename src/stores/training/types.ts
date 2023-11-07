import { WeightUnit } from '@/constants/weightUnits';

export type TrainingApproachModel = {
  reps: number,
  weight: number,
  weightUnit: WeightUnit,
  id: string
};

export type TrainingExerciseModel = {
  name: string,
  id: string,
  approaches: TrainingApproachModel[],
};

export type TrainingModel = {
  isSavedToServer: boolean,
  basedOnTraining: string | null,
  // ISO date
  date: string,
  exercises: TrainingExerciseModel[],
};

/**
 * key - ISO date
 */
export type TrainingRecord = Record<string, TrainingModel | undefined>;

export type SetApproachModel = {
  approach: TrainingApproachModel,
  approachIndex: number,
  exerciseIndex: number
};

export type DeleteApproachModel = {
  approachIndex: number,
  exerciseIndex: number
};
