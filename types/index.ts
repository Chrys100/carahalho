export type Exercise = {
  id: string;
  name: string;
  category: string;
  description: string;
  instructions: string[];
  muscles: string[];
  imageUrl: string;
  videoUrl?: string;
};

export type WorkoutPlan = {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  exercises: WorkoutExercise[];
  imageUrl: string;
};

export type WorkoutExercise = {
  exerciseId: string;
  sets: number;
  reps: number;
  rest: number; // in seconds
  weight?: number; // in kg
  time?: number; // in seconds (for timed exercises)
};

export type CompletedWorkout = {
  id: string;
  workoutPlanId: string;
  date: string;
  duration: number; // in minutes
  exercises: CompletedExercise[];
  calories: number;
};

export type CompletedExercise = {
  exerciseId: string;
  sets: CompletedSet[];
};

export type CompletedSet = {
  reps: number;
  weight?: number;
  time?: number; // in seconds
  completed: boolean;
};

export type UserProfile = {
  name: string;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  fitnessGoal: 'lose' | 'maintain' | 'gain';
  weeklyWorkouts: number;
  profilePicture?: string;
};

export type ProgressData = {
  date: string;
  weight: number;
  workoutsCompleted: number;
  totalTime: number;
  totalCalories: number;
};