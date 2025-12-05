import { BodyPart } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface BodyAvatarProps {
  selectedPart: BodyPart;
  onPartSelect: (part: BodyPart) => void;
}

export const BodyAvatar = ({ selectedPart, onPartSelect }: BodyAvatarProps) => {
  const isPartActive = (part: BodyPart) => selectedPart === part;

  return (
    <div className="relative w-48 h-56 mx-auto">
      <svg
        viewBox="0 0 200 280"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <circle
          cx="100"
          cy="35"
          r="28"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-success-light",
            isPartActive('all') && "fill-success-light stroke-primary"
          )}
          onClick={() => onPartSelect('all')}
        />
        
        {/* Neck */}
        <rect x="90" y="60" width="20" height="15" className="fill-muted stroke-border stroke-2" />
        
        {/* Shoulders */}
        <path
          d="M60 80 Q70 75 90 75 L110 75 Q130 75 140 80 L145 95 L55 95 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-info-light",
            isPartActive('shoulders') && "fill-info-light stroke-info"
          )}
          onClick={() => onPartSelect('shoulders')}
        />
        
        {/* Left Arm */}
        <path
          d="M55 95 L45 95 Q35 95 30 105 L20 145 Q18 155 25 160 L35 165 Q42 168 48 160 L60 125 L60 95 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-warning/30",
            isPartActive('arms') && "fill-warning/30 stroke-warning"
          )}
          onClick={() => onPartSelect('arms')}
        />
        
        {/* Right Arm */}
        <path
          d="M145 95 L155 95 Q165 95 170 105 L180 145 Q182 155 175 160 L165 165 Q158 168 152 160 L140 125 L140 95 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-warning/30",
            isPartActive('arms') && "fill-warning/30 stroke-warning"
          )}
          onClick={() => onPartSelect('arms')}
        />
        
        {/* Chest */}
        <path
          d="M60 95 L140 95 L140 125 Q140 135 130 140 L100 145 L70 140 Q60 135 60 125 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-destructive/20",
            isPartActive('chest') && "fill-destructive/20 stroke-destructive"
          )}
          onClick={() => onPartSelect('chest')}
        />
        
        {/* Core/Abs */}
        <path
          d="M70 140 L130 140 L125 175 L75 175 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-chart-4/30",
            isPartActive('core') && "fill-chart-4/30 stroke-chart-4"
          )}
          onClick={() => onPartSelect('core')}
        />
        
        {/* Back (hidden behind, but clickable area) */}
        <rect
          x="75"
          y="95"
          width="50"
          height="80"
          className="fill-transparent cursor-pointer"
          onClick={() => onPartSelect('back')}
        />
        
        {/* Pelvis */}
        <path
          d="M75 175 L125 175 L130 195 L70 195 Z"
          className="fill-muted stroke-border stroke-2"
        />
        
        {/* Left Leg */}
        <path
          d="M70 195 L90 195 L88 260 Q88 270 82 270 L78 270 Q72 270 72 260 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-success-light",
            isPartActive('legs') && "fill-success-light stroke-primary"
          )}
          onClick={() => onPartSelect('legs')}
        />
        
        {/* Right Leg */}
        <path
          d="M110 195 L130 195 L128 260 Q128 270 122 270 L118 270 Q112 270 112 260 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-success-light",
            isPartActive('legs') && "fill-success-light stroke-primary"
          )}
          onClick={() => onPartSelect('legs')}
        />
      </svg>
    </div>
  );
};
