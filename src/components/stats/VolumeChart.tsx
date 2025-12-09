import { useMemo } from 'react';
import {
  BarChart,
  Bar,
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

interface VolumeChartProps {
  selectedExercises: string[];
  dateRange: { from: Date; to: Date };
}

export const VolumeChart = ({ selectedExercises, dateRange }: VolumeChartProps) => {
  const chartData = useMemo(() => {
    const filteredWorkouts = workoutHistory.filter((workout) => {
      const workoutDate = parseISO(workout.date);
      return workoutDate >= dateRange.from && workoutDate <= dateRange.to;
    });

    const dataByDate: Record<string, Record<string, number>> = {};

    filteredWorkouts.forEach((workout) => {
      const dateKey = format(parseISO(workout.date), 'dd.MM', { locale: pl });
      
      if (!dataByDate[dateKey]) {
        dataByDate[dateKey] = {};
      }

      workout.exercises.forEach((ex) => {
        if (selectedExercises.length === 0 || selectedExercises.includes(ex.exerciseId)) {
          const volume = ex.sets * ex.reps * ex.weight;
          
          // If no exercises selected or multiple selected, sum everything into "Wolumen"
          if (selectedExercises.length === 0 || selectedExercises.length > 1) {
            if (!dataByDate[dateKey]['Wolumen']) {
              dataByDate[dateKey]['Wolumen'] = 0;
            }
            dataByDate[dateKey]['Wolumen'] += volume;
          } else {
            // Single exercise selected - show its name
            const exerciseName = exercises.find((e) => e.id === ex.exerciseId)?.name || 'Nieznane';
            if (!dataByDate[dateKey][exerciseName]) {
              dataByDate[dateKey][exerciseName] = 0;
            }
            dataByDate[dateKey][exerciseName] += volume;
          }
        }
      });
    });

    return Object.entries(dataByDate).map(([date, volumes]) => ({
      date,
      ...volumes,
    }));
  }, [selectedExercises, dateRange]);

  const exerciseNames = useMemo(() => {
    // If no exercises or multiple selected, show single "Wolumen" bar
    if (selectedExercises.length === 0 || selectedExercises.length > 1) {
      return ['Wolumen'];
    }
    // Single exercise - show its name
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
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 32%, 91%)" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
            axisLine={{ stroke: 'hsl(214, 32%, 91%)' }}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: 'hsl(215, 16%, 47%)' }}
            axisLine={{ stroke: 'hsl(214, 32%, 91%)' }}
            tickFormatter={(value) => `${value}kg`}
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
          {exerciseNames.length > 1 && <Legend />}
          {exerciseNames.slice(0, 4).map((name, index) => (
            <Bar
              key={name}
              dataKey={name}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
