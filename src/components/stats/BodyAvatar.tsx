import { BodyPart } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface BodyAvatarProps {
  selectedPart: BodyPart;
  onPartSelect: (part: BodyPart) => void;
}

export const BodyAvatar = ({ selectedPart, onPartSelect }: BodyAvatarProps) => {
  const isPartActive = (part: BodyPart) => selectedPart === part;

  return (
    <div className="relative w-40 h-52 mx-auto">
      <svg
        viewBox="0 0 200 280"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head - click for "all" */}
        <circle
          cx="100"
          cy="35"
          r="28"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-primary/20",
            isPartActive('all') && "fill-primary/20 stroke-primary"
          )}
          onClick={() => onPartSelect('all')}
        />
        
        {/* Neck */}
        <rect x="90" y="60" width="20" height="15" className="fill-muted stroke-border stroke-2" />
        
        {/* Left Arm */}
        <path
          d="M55 80 L45 80 Q30 82 25 100 L18 150 Q15 165 25 170 L40 175 Q50 175 55 165 L65 120 L65 80 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-warning/30",
            isPartActive('arms') && "fill-warning/30 stroke-warning"
          )}
          onClick={() => onPartSelect('arms')}
        />
        
        {/* Right Arm */}
        <path
          d="M145 80 L155 80 Q170 82 175 100 L182 150 Q185 165 175 170 L160 175 Q150 175 145 165 L135 120 L135 80 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-warning/30",
            isPartActive('arms') && "fill-warning/30 stroke-warning"
          )}
          onClick={() => onPartSelect('arms')}
        />
        
        {/* Torso (chest + back combined) */}
        <path
          d="M65 75 L135 75 Q145 75 145 85 L145 175 Q145 185 135 185 L65 185 Q55 185 55 175 L55 85 Q55 75 65 75 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-info-light",
            isPartActive('torso') && "fill-info-light stroke-info"
          )}
          onClick={() => onPartSelect('torso')}
        />
        
        {/* Pelvis */}
        <path
          d="M70 185 L130 185 L135 200 L65 200 Z"
          className="fill-muted stroke-border stroke-2"
        />
        
        {/* Left Leg */}
        <path
          d="M65 200 L95 200 L92 268 Q92 278 82 278 L78 278 Q68 278 68 268 Z"
          className={cn(
            "fill-muted stroke-border stroke-2 transition-all duration-200 cursor-pointer hover:fill-success-light",
            isPartActive('legs') && "fill-success-light stroke-primary"
          )}
          onClick={() => onPartSelect('legs')}
        />
        
        {/* Right Leg */}
        <path
          d="M105 200 L135 200 L132 268 Q132 278 122 278 L118 278 Q108 278 108 268 Z"
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
