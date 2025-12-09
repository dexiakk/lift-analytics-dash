import { useState } from 'react';
import { ChevronDown, Dumbbell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { 
  Exercise, 
  ExerciseCategory, 
  BodyPart, 
  exercises, 
  categoryLabels,
  bodyPartLabels 
} from '@/data/mockData';

interface ExerciseSelectorProps {
  selectedExercises: string[];
  onExercisesChange: (exerciseIds: string[]) => void;
  bodyPartFilter: BodyPart;
}

export const ExerciseSelector = ({
  selectedExercises,
  onExercisesChange,
  bodyPartFilter,
}: ExerciseSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const filteredExercises = exercises.filter((ex) => {
    const matchesBodyPart = bodyPartFilter === null || ex.bodyPart === bodyPartFilter;
    const matchesCategory = !selectedCategory || ex.category === selectedCategory;
    return matchesBodyPart && matchesCategory;
  });

  const categories = Array.from(new Set(
    exercises
      .filter((ex) => bodyPartFilter === null || ex.bodyPart === bodyPartFilter)
      .map((ex) => ex.category)
  ));

  const toggleExercise = (exerciseId: string) => {
    if (selectedExercises.includes(exerciseId)) {
      onExercisesChange(selectedExercises.filter((id) => id !== exerciseId));
    } else if (selectedExercises.length < 2) {
      onExercisesChange([...selectedExercises, exerciseId]);
    }
  };

  const selectedExerciseNames = selectedExercises
    .map((id) => exercises.find((ex) => ex.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Dumbbell className="w-4 h-4" />
        <span className="text-sm font-medium">Porównaj ćwiczenia (max 2)</span>
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-left font-normal"
          >
            <span className="truncate">
              {selectedExerciseNames.length > 0
                ? selectedExerciseNames.join(', ')
                : 'Wybierz ćwiczenia...'}
            </span>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-3 border-b border-border">
            <p className="text-xs text-muted-foreground mb-2">Kategoria</p>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  !selectedCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                Wszystkie
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          </div>
          
          <div className="max-h-64 overflow-y-auto p-2">
            {filteredExercises.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Brak ćwiczeń dla wybranych filtrów
              </p>
            ) : (
              filteredExercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => toggleExercise(exercise.id)}
                  disabled={
                    selectedExercises.length >= 2 && 
                    !selectedExercises.includes(exercise.id)
                  }
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                    selectedExercises.includes(exercise.id)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-secondary",
                    selectedExercises.length >= 2 && 
                    !selectedExercises.includes(exercise.id) &&
                    "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="text-left">{exercise.name}</span>
                  {selectedExercises.includes(exercise.id) && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))
            )}
          </div>
        </PopoverContent>
      </Popover>

      {selectedExercises.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedExercises.map((id) => {
            const exercise = exercises.find((ex) => ex.id === id);
            if (!exercise) return null;
            return (
              <span
                key={id}
                className="exercise-chip exercise-chip-active flex items-center gap-1"
              >
                {exercise.name}
                <button
                  onClick={() => toggleExercise(id)}
                  className="ml-1 hover:text-primary-foreground/70"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
