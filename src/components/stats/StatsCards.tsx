import { Dumbbell, Activity, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  totalWorkouts: number;
  totalExercises: number;
  totalVolume: number;
}

export const StatsCards = ({ totalWorkouts, totalExercises, totalVolume }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="stat-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 rounded-full bg-success-light flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary" />
          </div>
        </div>
        <p className="text-2xl font-bold text-primary">{totalWorkouts}</p>
        <p className="text-xs text-muted-foreground">Treningów</p>
      </div>
      
      <div className="stat-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 rounded-full bg-info-light flex items-center justify-center">
            <Activity className="w-5 h-5 text-info" />
          </div>
        </div>
        <p className="text-2xl font-bold text-info">{totalExercises}</p>
        <p className="text-xs text-muted-foreground">Ćwiczeń</p>
      </div>
      
      <div className="stat-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-warning" />
          </div>
        </div>
        <p className="text-2xl font-bold text-warning">{totalVolume.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">kg wolumenu</p>
      </div>
    </div>
  );
};
