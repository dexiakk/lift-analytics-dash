export type BodyPart = 'arms' | 'torso' | 'legs' | 'all';

export type ExerciseCategory = 'wzmocnienie' | 'mobilność' | 'cardio';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  bodyPart: BodyPart;
}

export interface WorkoutSession {
  id: string;
  date: string;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    weight: number;
  }[];
}

export const exercises: Exercise[] = [
  // Arms (Ręce)
  { id: '1', name: 'Uginanie ramion ze sztangą', category: 'wzmocnienie', bodyPart: 'arms' },
  { id: '2', name: 'Prostowanie ramion na wyciągu', category: 'wzmocnienie', bodyPart: 'arms' },
  { id: '3', name: 'Uginanie ramion z hantlami', category: 'wzmocnienie', bodyPart: 'arms' },
  { id: '4', name: 'Rozciąganie bicepsów', category: 'mobilność', bodyPart: 'arms' },
  
  // Torso (Tułów - klatka + plecy + barki + brzuch)
  { id: '5', name: 'Wyciskanie leżąc', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '6', name: 'Rozpiętki z hantlami', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '7', name: 'Pompki', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '8', name: 'Rozciąganie klatki piersiowej', category: 'mobilność', bodyPart: 'torso' },
  { id: '13', name: 'Wiosłowanie sztangą', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '14', name: 'Podciąganie na drążku', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '15', name: 'Przyciąganie wyciągu górnego', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '16', name: 'Rozciąganie pleców', category: 'mobilność', bodyPart: 'torso' },
  { id: '17', name: 'Wyciskanie nad głowę', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '18', name: 'Unoszenie hantli bokiem', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '19', name: 'Arnoldki', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '20', name: 'Rozciąganie barków', category: 'mobilność', bodyPart: 'torso' },
  { id: '21', name: 'Plank', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '22', name: 'Brzuszki', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '23', name: 'Russian twist', category: 'wzmocnienie', bodyPart: 'torso' },
  { id: '24', name: 'Rozciąganie brzucha', category: 'mobilność', bodyPart: 'torso' },
  
  // Legs (Nogi)
  { id: '9', name: 'Przysiad ze sztangą', category: 'wzmocnienie', bodyPart: 'legs' },
  { id: '10', name: 'Martwy ciąg', category: 'wzmocnienie', bodyPart: 'legs' },
  { id: '11', name: 'Wyprost nóg na maszynie', category: 'wzmocnienie', bodyPart: 'legs' },
  { id: '12', name: 'Rozciąganie nóg', category: 'mobilność', bodyPart: 'legs' },
];

// Generate dates relative to today
const today = new Date();
const formatDate = (daysAgo: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const workoutHistory: WorkoutSession[] = [
  {
    id: 'w1',
    date: formatDate(28),
    exercises: [
      { exerciseId: '5', sets: 4, reps: 10, weight: 80 },
      { exerciseId: '6', sets: 3, reps: 12, weight: 20 },
      { exerciseId: '7', sets: 3, reps: 15, weight: 0 },
    ]
  },
  {
    id: 'w2',
    date: formatDate(26),
    exercises: [
      { exerciseId: '9', sets: 5, reps: 5, weight: 100 },
      { exerciseId: '10', sets: 4, reps: 6, weight: 120 },
      { exerciseId: '11', sets: 3, reps: 12, weight: 60 },
    ]
  },
  {
    id: 'w3',
    date: formatDate(24),
    exercises: [
      { exerciseId: '13', sets: 4, reps: 8, weight: 70 },
      { exerciseId: '14', sets: 4, reps: 8, weight: 0 },
      { exerciseId: '17', sets: 4, reps: 10, weight: 40 },
    ]
  },
  {
    id: 'w4',
    date: formatDate(21),
    exercises: [
      { exerciseId: '5', sets: 4, reps: 10, weight: 82.5 },
      { exerciseId: '6', sets: 3, reps: 12, weight: 22 },
      { exerciseId: '1', sets: 3, reps: 12, weight: 30 },
    ]
  },
  {
    id: 'w5',
    date: formatDate(18),
    exercises: [
      { exerciseId: '9', sets: 5, reps: 5, weight: 105 },
      { exerciseId: '10', sets: 4, reps: 6, weight: 125 },
      { exerciseId: '11', sets: 3, reps: 12, weight: 65 },
    ]
  },
  {
    id: 'w6',
    date: formatDate(15),
    exercises: [
      { exerciseId: '13', sets: 4, reps: 8, weight: 72.5 },
      { exerciseId: '14', sets: 4, reps: 10, weight: 0 },
      { exerciseId: '17', sets: 4, reps: 10, weight: 42.5 },
    ]
  },
  {
    id: 'w7',
    date: formatDate(12),
    exercises: [
      { exerciseId: '5', sets: 4, reps: 10, weight: 85 },
      { exerciseId: '7', sets: 4, reps: 20, weight: 0 },
      { exerciseId: '2', sets: 3, reps: 12, weight: 25 },
    ]
  },
  {
    id: 'w8',
    date: formatDate(9),
    exercises: [
      { exerciseId: '9', sets: 5, reps: 5, weight: 110 },
      { exerciseId: '10', sets: 4, reps: 6, weight: 130 },
    ]
  },
  {
    id: 'w9',
    date: formatDate(7),
    exercises: [
      { exerciseId: '17', sets: 4, reps: 10, weight: 45 },
      { exerciseId: '18', sets: 4, reps: 12, weight: 12 },
      { exerciseId: '19', sets: 3, reps: 10, weight: 16 },
    ]
  },
  {
    id: 'w10',
    date: formatDate(5),
    exercises: [
      { exerciseId: '5', sets: 4, reps: 10, weight: 87.5 },
      { exerciseId: '6', sets: 4, reps: 12, weight: 24 },
    ]
  },
  {
    id: 'w11',
    date: formatDate(3),
    exercises: [
      { exerciseId: '9', sets: 5, reps: 5, weight: 115 },
      { exerciseId: '11', sets: 4, reps: 12, weight: 70 },
    ]
  },
  {
    id: 'w12',
    date: formatDate(1),
    exercises: [
      { exerciseId: '13', sets: 4, reps: 8, weight: 75 },
      { exerciseId: '15', sets: 4, reps: 10, weight: 55 },
    ]
  },
];

export const userStats = {
  totalWorkouts: 12,
  totalExercises: 32,
  totalVolume: 15420,
  avatarUrl: null,
};

export const bodyPartLabels: Record<BodyPart, string> = {
  all: 'Wszystkie',
  arms: 'Ręce',
  torso: 'Tułów',
  legs: 'Nogi',
};

export const categoryLabels: Record<ExerciseCategory, string> = {
  wzmocnienie: 'Wzmocnienie',
  mobilność: 'Mobilność',
  cardio: 'Cardio',
};
