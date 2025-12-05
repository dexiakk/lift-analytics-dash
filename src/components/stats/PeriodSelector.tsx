import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export type PeriodType = '7d' | '30d' | '3m' | 'all' | 'custom';

interface PeriodSelectorProps {
  selectedPeriod: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  customDateRange?: { from: Date; to: Date };
  onCustomDateChange?: (range: { from: Date; to: Date }) => void;
}

const periods: { value: PeriodType; label: string }[] = [
  { value: '7d', label: '7 dni' },
  { value: '30d', label: '30 dni' },
  { value: '3m', label: '3 mies.' },
  { value: 'all', label: 'Wszystko' },
];

export const PeriodSelector = ({
  selectedPeriod,
  onPeriodChange,
  customDateRange,
  onCustomDateChange,
}: PeriodSelectorProps) => {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: customDateRange?.from,
    to: customDateRange?.to,
  });

  const handleDateSelect = (date: Date | undefined) => {
    if (!dateRange.from || (dateRange.from && dateRange.to)) {
      setDateRange({ from: date, to: undefined });
    } else {
      const newRange = { from: dateRange.from, to: date };
      setDateRange(newRange);
      if (date && onCustomDateChange) {
        onCustomDateChange({ from: dateRange.from, to: date });
        onPeriodChange('custom');
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">Okres</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={cn(
              "period-btn",
              selectedPeriod === period.value ? "period-btn-active" : "period-btn-inactive"
            )}
          >
            {period.label}
          </button>
        ))}
        
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "period-btn flex items-center gap-1",
                selectedPeriod === 'custom' ? "period-btn-active" : "period-btn-inactive"
              )}
            >
              <Calendar className="w-3 h-3" />
              {selectedPeriod === 'custom' && customDateRange
                ? `${format(customDateRange.from, 'dd.MM', { locale: pl })} - ${format(customDateRange.to, 'dd.MM', { locale: pl })}`
                : 'Własny'}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={dateRange.to || dateRange.from}
              onSelect={handleDateSelect}
              initialFocus
              className="p-3 pointer-events-auto"
              locale={pl}
            />
            {dateRange.from && !dateRange.to && (
              <p className="text-xs text-center text-muted-foreground pb-3">
                Wybierz datę końcową
              </p>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
