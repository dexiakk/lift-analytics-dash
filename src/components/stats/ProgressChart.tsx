import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { exercises, workoutHistory } from '@/data/mockData';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

interface ProgressChartProps {
  selectedExercises: string[];
  dateRange: { from: Date; to: Date };
}

export const ProgressChart = ({ selectedExercises, dateRange }: ProgressChartProps) => {
  const chartData = useMemo(() => {
    const filteredWorkouts = workoutHistory
      .filter((workout) => {
        const workoutDate = parseISO(workout.date);
        return workoutDate >= dateRange.from && workoutDate <= dateRange.to;
      })
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

    const cumulativeData: Record<string, Record<string, number>> = {};
    const runningTotals: Record<string, number> = {};

    filteredWorkouts.forEach((workout) => {
      const dateKey = format(parseISO(workout.date), 'dd.MM', { locale: pl });

      workout.exercises.forEach((ex) => {
        if (selectedExercises.length === 0 || selectedExercises.includes(ex.exerciseId)) {
          const volume = ex.sets * ex.reps * ex.weight;
          const exerciseName = exercises.find((e) => e.id === ex.exerciseId)?.name || 'Nieznane';

          if (!runningTotals[exerciseName]) {
            runningTotals[exerciseName] = 0;
          }
          runningTotals[exerciseName] += volume;

          if (!cumulativeData[dateKey]) {
            cumulativeData[dateKey] = { ...runningTotals };
          } else {
            cumulativeData[dateKey][exerciseName] = runningTotals[exerciseName];
          }
        }
      });

      // Ensure all exercises have values for this date
      if (cumulativeData[dateKey]) {
        Object.keys(runningTotals).forEach((name) => {
          if (!cumulativeData[dateKey][name]) {
            cumulativeData[dateKey][name] = runningTotals[name];
          }
        });
      }
    });

    return Object.entries(cumulativeData).map(([date, volumes]) => ({
      date,
      ...volumes,
    }));
  }, [selectedExercises, dateRange]);

  const exerciseNames = useMemo(() => {
    if (selectedExercises.length === 0) {
      return Array.from(
        new Set(
          workoutHistory.flatMap((w) =>
            w.exercises.map((e) => exercises.find((ex) => ex.id === e.exerciseId)?.name || '')
          )
        )
      ).filter(Boolean).slice(0, 4);
    }
    return selectedExercises
      .map((id) => exercises.find((ex) => ex.id === id)?.name || '')
      .filter(Boolean);
  }, [selectedExercises]);

  const colors = ['hsl(152, 69%, 45%)', 'hsl(199, 89%, 48%)', 'hsl(38, 92%, 50%)', 'hsl(280, 67%, 60%)'];

  if (chartData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        Brak danych dla wybranego okresu
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
            axisLine={{ stroke: 'hsl(214, 32%, 91%)' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
            axisLine={{ stroke: 'hsl(214, 32%, 91%)' }}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(0, 0%, 100%)',
              border: '1px solid hsl(214, 32%, 91%)',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            formatter={(value: number) => [`${value.toLocaleString()} kg`, '']}
          />
          {selectedExercises.length > 1 && <Legend />}
          {exerciseNames.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ fill: colors[index % colors.length], strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
