import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateWeeklyMicrocycles, Training, WeeklyMicrocycle } from '@/data/mockData';
import { PeriodType } from './PeriodSelector';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface LoadMonitoringCalendarProps {
  selectedPeriod: PeriodType;
  dateRange: { from: Date; to: Date };
}

const dayNames = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'];

interface TrainingCellProps {
  training: Training;
  showValue?: boolean;
}

const TrainingCell = ({ training, showValue = true }: TrainingCellProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button 
          className={cn(
            "w-full h-6 flex items-center justify-center rounded text-[9px] transition-colors cursor-pointer hover:ring-2 hover:ring-primary/50",
            "bg-green-400/80 text-green-900"
          )}
        >
          {showValue ? `${training.duration}'×${training.intensity}` : ''}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" side="top">
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Czas × Intensywność:</span>
            <span className="font-medium">{training.duration}min × RPE {training.intensity}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Obciążenie:</span>
            <span className="font-medium">{training.duration * training.intensity}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Wolumen:</span>
            <span className="font-medium">{training.volume} kg</span>
          </div>
          {training.note && (
            <p className="text-xs text-muted-foreground italic border-t border-border pt-2">
              „{training.note}"
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const EmptyCell = () => (
  <div className="w-full h-6 flex items-center justify-center rounded text-[9px] bg-muted text-muted-foreground">
    -
  </div>
);

// Flatten week data into rows where each training is a separate row
interface FlattenedRow {
  weekNumber: number;
  startDate: Date;
  endDate: Date;
  isFirstRowOfWeek: boolean;
  dayIndex: number;
  trainingIndex: number;
  training: Training | null;
  date: Date;
  isFirstTrainingOfDay: boolean;
  weekTotalVolume: number;
  weekAcwr: number;
}

const flattenWeekToRows = (week: WeeklyMicrocycle): FlattenedRow[] => {
  const rows: FlattenedRow[] = [];
  
  // Find max trainings in any day of this week
  const maxTrainingsPerDay = Math.max(1, ...week.days.map(d => d.trainings.length));
  
  for (let trainingIdx = 0; trainingIdx < maxTrainingsPerDay; trainingIdx++) {
    const row: FlattenedRow = {
      weekNumber: week.weekNumber,
      startDate: week.startDate,
      endDate: week.endDate,
      isFirstRowOfWeek: trainingIdx === 0,
      dayIndex: 0,
      trainingIndex: trainingIdx,
      training: null,
      date: week.startDate,
      isFirstTrainingOfDay: trainingIdx === 0,
      weekTotalVolume: week.totalVolume,
      weekAcwr: week.acwr,
    };
    rows.push(row);
  }
  
  return rows;
};

export const LoadMonitoringCalendar = ({ selectedPeriod, dateRange }: LoadMonitoringCalendarProps) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());

  const toggleWeekExpanded = (weekNumber: number) => {
    setExpandedWeeks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(weekNumber)) {
        newSet.delete(weekNumber);
      } else {
        newSet.add(weekNumber);
      }
      return newSet;
    });
  };
  const weeksCount = useMemo(() => {
    switch (selectedPeriod) {
      case '7d':
        return 1;
      case '30d':
        return 4;
      case '3m':
        return 12;
      case 'all':
        return 16;
      case 'custom':
        const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(1, Math.ceil(diffDays / 7));
      default:
        return 4;
    }
  }, [selectedPeriod, dateRange]);

  const microcycles = useMemo(() => generateWeeklyMicrocycles(weeksCount), [weeksCount]);

  const getAcwrColor = (acwr: number) => {
    if (acwr < 0.8) return 'bg-blue-400 text-blue-900';
    if (acwr <= 1.3) return 'bg-green-400 text-green-900';
    return 'bg-red-400 text-red-900';
  };

  const formatWeekRange = (start: Date, end: Date) => {
    const startStr = format(start, 'd.MM', { locale: pl });
    const endStr = format(end, 'd.MM', { locale: pl });
    return `${startStr}-${endStr}`;
  };

  const currentYear = new Date().getFullYear();

  const handleDayHeaderClick = (dayIndex: number) => {
    setSelectedDayFilter(prev => prev === dayIndex ? null : dayIndex);
  };

  // Filter data for specific day view
  const filteredDayData = useMemo(() => {
    if (selectedDayFilter === null) return null;
    
    const allTrainings: { date: Date; training: Training; isFirst: boolean }[] = [];
    microcycles.forEach(week => {
      const day = week.days[selectedDayFilter];
      day.trainings.forEach((training, idx) => {
        allTrainings.push({
          date: day.date,
          training,
          isFirst: idx === 0,
        });
      });
    });
    return allTrainings;
  }, [microcycles, selectedDayFilter]);

  // Filtered day view
  if (selectedDayFilter !== null && filteredDayData) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            Treningi w {dayNames[selectedDayFilter]}
          </h3>
          <button 
            onClick={() => setSelectedDayFilter(null)}
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="py-2 px-2 text-left font-medium text-muted-foreground">Data</th>
                <th className="py-2 px-2 text-center font-medium text-muted-foreground">Czas × Int.</th>
                <th className="py-2 px-2 text-center font-medium text-muted-foreground">Wolumen</th>
              </tr>
            </thead>
            <tbody>
              {filteredDayData.map((entry, idx) => (
                <tr key={`${idx}`}>
                  <td className="py-1.5 px-2 text-left">
                    {entry.isFirst ? (
                      <span className="font-medium">
                        {format(entry.date, 'd MMMM', { locale: pl })}
                      </span>
                    ) : null}
                  </td>
                  <td className="py-1.5 px-2 text-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="bg-green-400/80 text-green-900 rounded px-2 py-1 font-medium hover:ring-2 hover:ring-primary/50 transition-colors">
                          {entry.training.duration}min × {entry.training.intensity}
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56 p-3" side="top">
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Obciążenie:</span>
                            <span className="font-medium">{entry.training.duration * entry.training.intensity}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Wolumen:</span>
                            <span className="font-medium">{entry.training.volume} kg</span>
                          </div>
                          {entry.training.note && (
                            <p className="text-xs text-muted-foreground italic border-t border-border pt-2">
                              „{entry.training.note}"
                            </p>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                  <td className="py-1.5 px-2 text-center">
                    <div className="bg-blue-400/80 text-blue-900 rounded px-2 py-1 font-medium inline-block">
                      {entry.training.volume} kg
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDayData.length === 0 && (
          <p className="text-center text-muted-foreground py-4">
            Brak treningów w {dayNames[selectedDayFilter]} w wybranym okresie
          </p>
        )}
      </div>
    );
  }

  // Calculate max trainings per day across all weeks for row generation
  const maxTrainingsInAnyDay = useMemo(() => {
    let max = 1;
    microcycles.forEach(week => {
      week.days.forEach(day => {
        if (day.trainings.length > max) max = day.trainings.length;
      });
    });
    return max;
  }, [microcycles]);

  // Default calendar view with multiple rows per week if needed
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-4">
        <button className="p-1 hover:bg-secondary rounded transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-semibold text-lg">{currentYear}</span>
        <button className="p-1 hover:bg-secondary rounded transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 px-1 text-center font-medium text-muted-foreground w-16">Tydzień</th>
              {dayNames.map((day, index) => (
                <th 
                  key={day} 
                  className="py-2 px-1 text-center font-medium text-muted-foreground cursor-pointer hover:text-primary hover:bg-secondary/50 rounded transition-colors"
                  onClick={() => handleDayHeaderClick(index)}
                >
                  {day}
                </th>
              ))}
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Wolumen</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">ACWR</th>
              <th className="py-2 px-1 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {microcycles.map((week) => {
              // Find max trainings for this week
              const maxTrainingsThisWeek = Math.max(1, ...week.days.map(d => d.trainings.length));
              const isExpanded = expandedWeeks.has(week.weekNumber);
              const hasMultipleTrainings = maxTrainingsThisWeek > 1;
              
              // Generate rows for this week
              const rows = [];
              const rowsToShow = isExpanded ? maxTrainingsThisWeek : 1;
              
              for (let rowIdx = 0; rowIdx < rowsToShow; rowIdx++) {
                const isFirstRow = rowIdx === 0;
                rows.push(
                  <tr key={`${week.weekNumber}-${rowIdx}`}>
                    <td className="py-1 px-1 text-center font-medium text-primary text-[10px]">
                      {isFirstRow ? formatWeekRange(week.startDate, week.endDate) : ''}
                    </td>
                    {week.days.map((day, dayIndex) => {
                      const training = day.trainings[rowIdx];
                      return (
                        <td key={dayIndex} className="py-1 px-0.5 text-center">
                          {training ? (
                            <TrainingCell training={training} />
                          ) : (
                            isFirstRow ? <EmptyCell /> : <div className="h-6" />
                          )}
                        </td>
                      );
                    })}
                    <td className="py-1 px-1 text-center">
                      {isFirstRow ? (
                        <div className="bg-blue-400/80 text-blue-900 rounded px-2 py-1 font-medium">
                          {week.totalVolume}
                        </div>
                      ) : null}
                    </td>
                    <td className="py-1 px-1 text-center">
                      {isFirstRow ? (
                        <div className={cn(
                          "rounded px-2 py-1 font-medium",
                          getAcwrColor(week.acwr)
                        )}>
                          {week.acwr.toFixed(2)}
                        </div>
                      ) : null}
                    </td>
                    <td className="py-1 px-1 text-center">
                      {isFirstRow && hasMultipleTrainings ? (
                        <button
                          onClick={() => toggleWeekExpanded(week.weekNumber)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              }
              return rows;
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-blue-400"></div>
          <span>&lt; 0.8</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-400"></div>
          <span>0.8 - 1.3</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-400"></div>
          <span>&gt; 1.3</span>
        </div>
      </div>
    </div>
  );
};