export type TrainingApproachModel = {
  reps: number,
  weight: number,
  weightUnit: string,
  id: string
};

export type TrainingExerciseModel = {
  name: string,
  approaches: TrainingApproachModel[],
};

export type TrainingModel = {
  isFinished: boolean,
  isSavedToServer: boolean,
  // ISO date
  finishDate: string | null,
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
