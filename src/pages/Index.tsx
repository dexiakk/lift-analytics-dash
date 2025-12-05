import { useState, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BodyAvatar } from '@/components/stats/BodyAvatar';
import { StatsCards } from '@/components/stats/StatsCards';
import { PeriodSelector, PeriodType } from '@/components/stats/PeriodSelector';
import { ExerciseSelector } from '@/components/stats/ExerciseSelector';
import { VolumeChart } from '@/components/stats/VolumeChart';
import { ProgressChart } from '@/components/stats/ProgressChart';
import { BodyPart, userStats, workoutHistory, exercises, bodyPartLabels } from '@/data/mockData';
import { subDays, subMonths } from 'date-fns';

const Index = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('30d');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [customDateRange, setCustomDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const dateRange = useMemo(() => {
    const now = new Date();
    switch (selectedPeriod) {
      case '7d':
        return { from: subDays(now, 7), to: now };
      case '30d':
        return { from: subDays(now, 30), to: now };
      case '3m':
        return { from: subMonths(now, 3), to: now };
      case 'all':
        return { from: new Date('2024-01-01'), to: now };
      case 'custom':
        return customDateRange;
      default:
        return { from: subDays(now, 30), to: now };
    }
  }, [selectedPeriod, customDateRange]);

  // Calculate filtered stats based on body part
  const filteredStats = useMemo(() => {
    const relevantExerciseIds = selectedBodyPart === 'all'
      ? exercises.map((e) => e.id)
      : exercises.filter((e) => e.bodyPart === selectedBodyPart).map((e) => e.id);

    let totalWorkouts = 0;
    let totalExercisesCount = 0;
    let totalVolume = 0;

    workoutHistory.forEach((workout) => {
      const relevantExercisesInWorkout = workout.exercises.filter((e) =>
        relevantExerciseIds.includes(e.exerciseId)
      );

      if (relevantExercisesInWorkout.length > 0) {
        totalWorkouts++;
        totalExercisesCount += relevantExercisesInWorkout.length;
        relevantExercisesInWorkout.forEach((e) => {
          totalVolume += e.sets * e.reps * e.weight;
        });
      }
    });

    return { totalWorkouts, totalExercises: totalExercisesCount, totalVolume };
  }, [selectedBodyPart]);

  // Reset exercise selection when body part changes
  const handleBodyPartChange = (part: BodyPart) => {
    setSelectedBodyPart(part);
    setSelectedExercises([]);
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border px-4 py-3">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <button className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Statystyki</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Avatar Section */}
        <section className="bg-card rounded-2xl p-6 shadow-sm border border-border/50 animate-fade-in">
          <BodyAvatar
            selectedPart={selectedBodyPart}
            onPartSelect={handleBodyPartChange}
          />
          {selectedBodyPart !== 'all' && (
            <p className="text-center text-sm text-primary font-medium mt-3 animate-fade-in">
              Filtr: {bodyPartLabels[selectedBodyPart]}
            </p>
          )}
        </section>

        {/* Stats Cards */}
        <section>
          <StatsCards
            totalWorkouts={filteredStats.totalWorkouts}
            totalExercises={filteredStats.totalExercises}
            totalVolume={filteredStats.totalVolume}
          />
        </section>

        {/* Period Selector */}
        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 animate-fade-in">
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            customDateRange={customDateRange}
            onCustomDateChange={setCustomDateRange}
          />
        </section>

        {/* Exercise Selector */}
        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 animate-fade-in">
          <ExerciseSelector
            selectedExercises={selectedExercises}
            onExercisesChange={setSelectedExercises}
            bodyPartFilter={selectedBodyPart}
          />
        </section>

        {/* Charts */}
        <section className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 animate-fade-in">
          <Tabs defaultValue="volume" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="volume">Wolumen</TabsTrigger>
              <TabsTrigger value="progress">Progres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="volume" className="mt-0">
              <VolumeChart
                selectedExercises={selectedExercises}
                dateRange={dateRange}
              />
            </TabsContent>
            
            <TabsContent value="progress" className="mt-0">
              <ProgressChart
                selectedExercises={selectedExercises}
                dateRange={dateRange}
              />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </main>
  );
};

export default Index;
