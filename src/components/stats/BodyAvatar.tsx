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
    <div className="relative w-36 h-64 mx-auto">
      <svg
        viewBox="0 0 120 200"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head - circle */}
        <circle
          cx="60"
          cy="22"
          r="18"
          className={cn(
            "fill-[#e8e8ec] stroke-[#9ca3af] stroke-[2] transition-all duration-200 cursor-pointer hover:fill-primary/20",
            isPartActive('head') && "fill-primary/40 stroke-primary"
          )}
          onClick={() => handlePartClick('head')}
        />
        
        {/* Torso - rectangular body */}
        <path
          d="M32 48 L32 105 L88 105 L88 48 L32 48 Z"
          className={cn(
            "fill-[#f5f5f7] stroke-[#9ca3af] stroke-[2] transition-all duration-200 cursor-pointer hover:fill-info/20",
            isPartActive('torso') && "fill-info/40 stroke-info"
          )}
          onClick={() => handlePartClick('torso')}
        />
        
        {/* Left Arm */}
        <path
          d="M32 48 
             C22 50, 16 58, 14 75 
             C12 92, 14 110, 18 125
             C20 132, 30 132, 32 125
             C28 110, 26 92, 28 75
             C29 62, 32 54, 32 48 Z"
          className={cn(
            "fill-[#f5f5f7] stroke-[#9ca3af] stroke-[2] transition-all duration-200 cursor-pointer hover:fill-warning/20",
            isPartActive('arms') && "fill-warning/40 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        
        {/* Right Arm */}
        <path
          d="M88 48 
             C98 50, 104 58, 106 75 
             C108 92, 106 110, 102 125
             C100 132, 90 132, 88 125
             C92 110, 94 92, 92 75
             C91 62, 88 54, 88 48 Z"
          className={cn(
            "fill-[#f5f5f7] stroke-[#9ca3af] stroke-[2] transition-all duration-200 cursor-pointer hover:fill-warning/20",
            isPartActive('arms') && "fill-warning/40 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        
        {/* Left Leg */}
        <path
          d="M32 105
             L32 108
             L54 108
             L54 105
             L54 165
             C54 175, 52 185, 48 192
             C44 198, 32 198, 30 192
             C34 180, 36 165, 34 150
             L32 105 Z"
          className={cn(
            "fill-[#f5f5f7] stroke-[#9ca3af] stroke-[2] transition-all duration-200 cursor-pointer hover:fill-success/20",
            isPartActive('legs') && "fill-success/40 stroke-success"
          )}
          onClick={() => handlePartClick('legs')}
        />
        
        {/* Right Leg */}
        <path
          d="M88 105
             L88 108
             L66 108
             L66 105
             L66 165
             C66 175, 68 185, 72 192
             C76 198, 88 198, 90 192
             C86 180, 84 165, 86 150
             L88 105 Z"
          className={cn(
            "fill-[#f5f5f7] stroke-[#9ca3af] stroke-[2] transition-all duration-200 cursor-pointer hover:fill-success/20",
            isPartActive('legs') && "fill-success/40 stroke-success"
          )}
          onClick={() => handlePartClick('legs')}
        />
      </svg>
    </div>
  );
};
