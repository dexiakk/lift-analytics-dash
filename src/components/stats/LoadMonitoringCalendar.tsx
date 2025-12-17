import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateWeeklyMicrocycles, DayData, Training } from '@/data/mockData';
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

const DayCell = ({ day, onDayClick }: { day: DayData; onDayClick?: () => void }) => {
  const totalLoad = day.trainings.reduce((sum, t) => sum + (t.duration * t.intensity), 0);
  const totalVolume = day.trainings.reduce((sum, t) => sum + t.volume, 0);
  const hasTraining = day.trainings.length > 0;
  
  const displayValue = hasTraining 
    ? day.trainings.length > 1 
      ? `${day.trainings.length}×` 
      : Math.round(totalLoad / 10)
    : '-';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button 
          className={cn(
            "w-7 h-7 mx-auto flex items-center justify-center rounded text-[10px] transition-colors cursor-pointer hover:ring-2 hover:ring-primary/50",
            hasTraining ? "bg-green-400/80 text-green-900" : "bg-muted text-muted-foreground"
          )}
          onClick={onDayClick}
        >
          {displayValue}
        </button>
      </PopoverTrigger>
      {hasTraining && (
        <PopoverContent className="w-64 p-3" side="top">
          <div className="space-y-2">
            <p className="font-medium text-sm">
              {format(day.date, 'EEEE, d MMMM', { locale: pl })}
            </p>
            {day.trainings.map((training, idx) => (
              <div key={training.id} className="text-xs space-y-1 border-t border-border pt-2">
                {day.trainings.length > 1 && (
                  <p className="font-medium text-muted-foreground">Trening {idx + 1}</p>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Czas × Intensywność:</span>
                  <span className="font-medium">{training.duration}min × RPE {training.intensity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Obciążenie:</span>
                  <span className="font-medium">{training.duration * training.intensity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wolumen:</span>
                  <span className="font-medium">{training.volume} kg</span>
                </div>
                {training.note && (
                  <p className="text-muted-foreground italic mt-1">„{training.note}"</p>
                )}
              </div>
            ))}
            <div className="border-t border-border pt-2 flex justify-between font-medium text-sm">
              <span>Suma wolumenu:</span>
              <span>{totalVolume} kg</span>
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export const LoadMonitoringCalendar = ({ selectedPeriod, dateRange }: LoadMonitoringCalendarProps) => {
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | null>(null);
  
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

  // Filter data for specific day view
  const filteredDayData = useMemo(() => {
    if (selectedDayFilter === null) return null;
    
    const allDaysOfType: { date: Date; trainings: Training[] }[] = [];
    microcycles.forEach(week => {
      const day = week.days[selectedDayFilter];
      if (day.trainings.length > 0) {
        allDaysOfType.push({
          date: day.date,
          trainings: day.trainings,
        });
      }
    });
    return allDaysOfType;
  }, [microcycles, selectedDayFilter]);

  const handleDayHeaderClick = (dayIndex: number) => {
    setSelectedDayFilter(prev => prev === dayIndex ? null : dayIndex);
  };

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
              {filteredDayData.map((dayEntry, idx) => (
                dayEntry.trainings.map((training, tIdx) => (
                  <tr key={`${idx}-${tIdx}`}>
                    <td className="py-2 px-2 text-left">
                      <span className="font-medium">
                        {format(dayEntry.date, 'd MMMM', { locale: pl })}
                      </span>
                      {dayEntry.trainings.length > 1 && (
                        <span className="text-muted-foreground ml-1">
                          (trening {tIdx + 1}/{dayEntry.trainings.length})
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-2 text-center">
                      <div className="bg-green-400/80 text-green-900 rounded px-2 py-1 font-medium inline-block">
                        {training.duration}min × {training.intensity}
                      </div>
                    </td>
                    <td className="py-2 px-2 text-center">
                      <div className="bg-blue-400/80 text-blue-900 rounded px-2 py-1 font-medium inline-block">
                        {training.volume} kg
                      </div>
                    </td>
                  </tr>
                ))
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

  // Default calendar view
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
            </tr>
          </thead>
          <tbody>
            {microcycles.map((week) => (
              <tr key={week.weekNumber}>
                <td className="py-1.5 px-1 text-center font-medium text-primary text-[10px]">
                  {formatWeekRange(week.startDate, week.endDate)}
                </td>
                {week.days.map((day, index) => (
                  <td key={index} className="py-1.5 px-1 text-center">
                    <DayCell day={day} />
                  </td>
                ))}
                <td className="py-1.5 px-1 text-center">
                  <div className="bg-blue-400/80 text-blue-900 rounded px-2 py-1 font-medium">
                    {week.totalVolume}
                  </div>
                </td>
                <td className="py-1.5 px-1 text-center">
                  <div className={cn(
                    "rounded px-2 py-1 font-medium",
                    getAcwrColor(week.acwr)
                  )}>
                    {week.acwr.toFixed(2)}
                  </div>
                </td>
              </tr>
            ))}
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