import { Exercise, WorkoutPlan, CompletedWorkout, UserProfile, ProgressData } from '@/types';

export const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-up',
    category: 'Strength',
    description: 'A classic bodyweight exercise that targets the chest, shoulders, and triceps.',
    instructions: [
      'Start in a plank position with your hands slightly wider than shoulder-width apart.',
      'Lower your body until your chest nearly touches the floor.',
      'Push yourself back up to the starting position.',
      'Keep your body in a straight line throughout the movement.'
    ],
    muscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    imageUrl: 'https://images.pexels.com/photos/4720236/pexels-photo-4720236.jpeg'
  },
  {
    id: '2',
    name: 'Squats',
    category: 'Strength',
    description: 'A compound exercise that primarily targets the quadriceps, hamstrings, and glutes.',
    instructions: [
      'Stand with feet shoulder-width apart.',
      'Bend your knees and lower your hips as if sitting in a chair.',
      'Keep your chest up and back straight.',
      'Lower until your thighs are parallel to the ground, then push back up.'
    ],
    muscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    imageUrl: 'https://images.pexels.com/photos/4761437/pexels-photo-4761437.jpeg'
  },
  {
    id: '3',
    name: 'Plank',
    category: 'Core',
    description: 'An isometric core exercise that helps build strength in your abdomen, back, and shoulders.',
    instructions: [
      'Start in a forearm plank position with elbows directly beneath your shoulders.',
      'Keep your body in a straight line from head to heels.',
      'Engage your core and hold the position.',
      'Breathe normally throughout the exercise.'
    ],
    muscles: ['Core', 'Shoulders', 'Back'],
    imageUrl: 'https://images.pexels.com/photos/917653/pexels-photo-917653.jpeg'
  },
  {
    id: '4',
    name: 'Lunges',
    category: 'Strength',
    description: 'A unilateral exercise that works the quadriceps, hamstrings, and glutes one leg at a time.',
    instructions: [
      'Stand with feet hip-width apart.',
      'Take a step forward with one leg and lower your body until both knees are bent at 90-degree angles.',
      'Push back up to the starting position.',
      'Repeat with the other leg.'
    ],
    muscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
    imageUrl: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg'
  },
  {
    id: '5',
    name: 'Jumping Jacks',
    category: 'Cardio',
    description: 'A full-body exercise that increases heart rate and improves coordination.',
    instructions: [
      'Start standing with feet together and arms at your sides.',
      'Jump up, spreading your feet beyond shoulder width and bringing your arms above your head.',
      'Jump again, returning to the starting position.',
      'Repeat at a quick pace.'
    ],
    muscles: ['Full Body', 'Cardio'],
    imageUrl: 'https://images.pexels.com/photos/4498603/pexels-photo-4498603.jpeg'
  },
];

export const workoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    title: 'Full Body Beginner',
    description: 'A beginner-friendly full body workout to build strength and endurance.',
    level: 'beginner',
    duration: 30,
    exercises: [
      { exerciseId: '1', sets: 3, reps: 10, rest: 60 },
      { exerciseId: '2', sets: 3, reps: 12, rest: 60 },
      { exerciseId: '3', sets: 3, reps: 0, rest: 60, time: 30 },
      { exerciseId: '5', sets: 2, reps: 0, rest: 30, time: 60 }
    ],
    imageUrl: 'https://images.pexels.com/photos/4498603/pexels-photo-4498603.jpeg'
  },
  {
    id: '2',
    title: 'Lower Body Focus',
    description: 'Target your legs and glutes with this effective lower body workout.',
    level: 'intermediate',
    duration: 45,
    exercises: [
      { exerciseId: '2', sets: 4, reps: 15, rest: 60 },
      { exerciseId: '4', sets: 3, reps: 12, rest: 60 },
      { exerciseId: '2', sets: 3, reps: 20, rest: 60, weight: 10 },
      { exerciseId: '5', sets: 3, reps: 0, rest: 30, time: 45 }
    ],
    imageUrl: 'https://images.pexels.com/photos/4761437/pexels-photo-4761437.jpeg'
  }
];

export const completedWorkouts: CompletedWorkout[] = [
  {
    id: '1',
    workoutPlanId: '1',
    date: '2025-07-01',
    duration: 35,
    exercises: [
      {
        exerciseId: '1',
        sets: [
          { reps: 10, completed: true },
          { reps: 10, completed: true },
          { reps: 8, completed: true }
        ]
      },
      {
        exerciseId: '2',
        sets: [
          { reps: 12, completed: true },
          { reps: 12, completed: true },
          { reps: 10, completed: true }
        ]
      },
      {
        exerciseId: '3',
        sets: [
          { time: 30, completed: true },
          { time: 30, completed: true },
          { time: 25, completed: true }
        ]
      },
      {
        exerciseId: '5',
        sets: [
          { time: 60, completed: true },
          { time: 45, completed: true }
        ]
      }
    ],
    calories: 250
  },
  {
    id: '2',
    workoutPlanId: '2',
    date: '2025-07-03',
    duration: 42,
    exercises: [
      {
        exerciseId: '2',
        sets: [
          { reps: 15, completed: true },
          { reps: 15, completed: true },
          { reps: 15, completed: true },
          { reps: 12, completed: true }
        ]
      },
      {
        exerciseId: '4',
        sets: [
          { reps: 12, completed: true },
          { reps: 12, completed: true },
          { reps: 10, completed: true }
        ]
      }
    ],
    calories: 320
  }
];

export const userProfile: UserProfile = {
  name: 'John Doe',
  age: 28,
  weight: 75,
  height: 180,
  fitnessGoal: 'gain',
  weeklyWorkouts: 4,
  profilePicture: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg'
};

export const progressData: ProgressData[] = [
  { date: '2025-06-01', weight: 77, workoutsCompleted: 0, totalTime: 0, totalCalories: 0 },
  { date: '2025-06-08', weight: 76.5, workoutsCompleted: 2, totalTime: 70, totalCalories: 400 },
  { date: '2025-06-15', weight: 76, workoutsCompleted: 3, totalTime: 110, totalCalories: 650 },
  { date: '2025-06-22', weight: 75.5, workoutsCompleted: 3, totalTime: 120, totalCalories: 700 },
  { date: '2025-06-29', weight: 75, workoutsCompleted: 4, totalTime: 165, totalCalories: 950 },
  { date: '2025-07-06', weight: 74.5, workoutsCompleted: 4, totalTime: 180, totalCalories: 1000 }
];