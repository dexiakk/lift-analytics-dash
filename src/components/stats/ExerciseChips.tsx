import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Exercise, 
  BodyPart, 
  exercises, 
  bodyPartLabels 
} from '@/data/mockData';

interface ExerciseChipsProps {
  selectedExercises: string[];
  onExercisesChange: (exerciseIds: string[]) => void;
  bodyPartFilter: BodyPart;
  onClearFilter: () => void;
}

export const ExerciseChips = ({
  selectedExercises,
  onExercisesChange,
  bodyPartFilter,
  onClearFilter,
}: ExerciseChipsProps) => {
  const filteredExercises = exercises.filter((ex) => ex.bodyPart === bodyPartFilter);

  const toggleExercise = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      onExercisesChange(selectedExercises.filter((id) => id !== exerciseId));
    } else {
      onExercisesChange([...selectedExercises, exerciseId]);
    }
  };

  if (bodyPartFilter === 'all') {
    return null;
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Ćwiczenia: {bodyPartLabels[bodyPartFilter]}
        </p>
        <span className="text-xs text-muted-foreground">
          {selectedExercises.length > 0 
            ? `Wybrano: ${selectedExercises.length}` 
            : 'Kliknij, aby wybrać'}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filteredExercises.map((exercise) => (
          <button
            key={exercise.id}
            onClick={() => toggleExercise(exercise.id)}
            className={cn(
              "exercise-chip",
              selectedExercises.includes(exercise.id)
                ? "exercise-chip-active"
                : "exercise-chip-inactive"
            )}
          >
            {exercise.name}
          </button>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-2">
          Brak ćwiczeń dla tej partii ciała
        </p>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={onClearFilter}
        className="w-full mt-2"
      >
        <X className="w-4 h-4 mr-2" />
        Usuń filtry
      </Button>
    </div>
  );
};
