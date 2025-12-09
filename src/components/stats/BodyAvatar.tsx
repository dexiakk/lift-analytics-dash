import { BodyPart } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface BodyAvatarProps {
  selectedPart: BodyPart;
  onPartSelect: (part: BodyPart) => void;
}

export const BodyAvatar = ({ selectedPart, onPartSelect }: BodyAvatarProps) => {
  const isPartActive = (part: Exclude<BodyPart, null>) => selectedPart === part;

  const handlePartClick = (part: Exclude<BodyPart, null>) => {
    if (selectedPart === part) {
      onPartSelect(null);
    } else {
      onPartSelect(part);
    }
  };

  return (
    <div className="relative w-32 h-56 mx-auto">
      <svg
        viewBox="0 0 100 180"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <circle
          cx="50"
          cy="18"
          r="15"
          className={cn(
            "fill-muted stroke-border stroke-[2] transition-all duration-200 cursor-pointer hover:fill-primary/20",
            isPartActive('head') && "fill-primary/40 stroke-primary"
          )}
          onClick={() => handlePartClick('head')}
        />
        
        {/* Torso */}
        <path
          d="M30 38 L30 90 L70 90 L70 38 L50 33 L30 38 Z"
          className={cn(
            "fill-muted stroke-border stroke-[2] transition-all duration-200 cursor-pointer hover:fill-info/20",
            isPartActive('torso') && "fill-info/40 stroke-info"
          )}
          onClick={() => handlePartClick('torso')}
        />
        
        {/* Left Arm */}
        <path
          d="M30 38 C20 40, 15 50, 14 70 C13 85, 16 100, 20 110 C22 112, 26 112, 28 108 C24 95, 22 80, 24 65 C25 55, 28 48, 30 45"
          className={cn(
            "fill-muted stroke-border stroke-[2] transition-all duration-200 cursor-pointer hover:fill-warning/20",
            isPartActive('arms') && "fill-warning/40 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        
        {/* Right Arm */}
        <path
          d="M70 38 C80 40, 85 50, 86 70 C87 85, 84 100, 80 110 C78 112, 74 112, 72 108 C76 95, 78 80, 76 65 C75 55, 72 48, 70 45"
          className={cn(
            "fill-muted stroke-border stroke-[2] transition-all duration-200 cursor-pointer hover:fill-warning/20",
            isPartActive('arms') && "fill-warning/40 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        
        {/* Left Leg */}
        <path
          d="M30 90 L32 130 C32 145, 30 160, 28 172 C28 176, 32 178, 38 178 C42 178, 44 176, 44 172 L46 130 L46 90"
          className={cn(
            "fill-muted stroke-border stroke-[2] transition-all duration-200 cursor-pointer hover:fill-success/20",
            isPartActive('legs') && "fill-success/40 stroke-success"
          )}
          onClick={() => handlePartClick('legs')}
        />
        
        {/* Right Leg */}
        <path
          d="M70 90 L68 130 C68 145, 70 160, 72 172 C72 176, 68 178, 62 178 C58 178, 56 176, 56 172 L54 130 L54 90"
          className={cn(
            "fill-muted stroke-border stroke-[2] transition-all duration-200 cursor-pointer hover:fill-success/20",
            isPartActive('legs') && "fill-success/40 stroke-success"
          )}
          onClick={() => handlePartClick('legs')}
        />
      </svg>
    </div>
  );
};
