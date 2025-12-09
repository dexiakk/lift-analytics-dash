import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateWeeklyMicrocycles, WeeklyMicrocycle } from '@/data/mockData';
import { PeriodType } from './PeriodSelector';

interface LoadMonitoringCalendarProps {
  selectedPeriod: PeriodType;
  dateRange: { from: Date; to: Date };
}

export const LoadMonitoringCalendar = ({ selectedPeriod, dateRange }: LoadMonitoringCalendarProps) => {
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


  const currentYear = new Date().getFullYear();

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
              <th className="py-2 px-1 text-center font-medium text-muted-foreground w-8">#</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Pn</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Wt</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Śr</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Cz</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Pt</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Sb</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Nd</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">Wolumen</th>
              <th className="py-2 px-1 text-center font-medium text-muted-foreground">ACWR</th>
            </tr>
          </thead>
          <tbody>
            {microcycles.map((week) => (
              <tr key={week.weekNumber}>
                <td className="py-1.5 px-1 text-center font-medium text-primary">{week.weekNumber}</td>
                {week.days.map((day, index) => (
                  <td key={index} className="py-1.5 px-1 text-center">
                    <div className={cn(
                      "w-7 h-7 mx-auto flex items-center justify-center rounded text-[10px]",
                      day.volume !== null ? "bg-green-400/80 text-green-900" : "bg-muted text-muted-foreground"
                    )}>
                      {day.volume !== null ? day.volume : '-'}
                    </div>
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