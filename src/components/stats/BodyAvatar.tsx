import { BodyPart } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface BodyAvatarProps {
  selectedPart: BodyPart;
  onPartSelect: (part: BodyPart) => void;
}

export const BodyAvatar = ({ selectedPart, onPartSelect }: BodyAvatarProps) => {
  const isPartActive = (part: Exclude<BodyPart, null>) => selectedPart === part;

  const handlePartClick = (part: Exclude<BodyPart, null>) => {
    // Toggle selection - if already selected, deselect
    if (selectedPart === part) {
      onPartSelect(null);
    } else {
      onPartSelect(part);
    }
  };

  return (
    <div className="relative w-32 h-56 mx-auto">
      <svg
        viewBox="0 0 120 220"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hair */}
        <ellipse
          cx="60"
          cy="12"
          rx="14"
          ry="6"
          className="fill-amber-600"
        />
        
        {/* Head - for endurance exercises */}
        <ellipse
          cx="60"
          cy="22"
          rx="12"
          ry="14"
          className={cn(
            "fill-muted stroke-border stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-primary/30",
            isPartActive('head') && "fill-primary/40 stroke-primary"
          )}
          onClick={() => handlePartClick('head')}
        />
        
        {/* Neck */}
        <rect x="56" y="35" width="8" height="8" className="fill-muted stroke-border stroke-[1.5]" />
        
        {/* Jersey (Torso) */}
        <path
          d="M38 43 L82 43 L82 95 L38 95 Z"
          className={cn(
            "fill-slate-700 stroke-slate-800 stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-info/40",
            isPartActive('torso') && "fill-info/50 stroke-info"
          )}
          onClick={() => handlePartClick('torso')}
        />
        
        {/* Jersey V-neck detail */}
        <path
          d="M54 43 L60 52 L66 43"
          className="stroke-red-500 stroke-2 fill-none"
        />
        
        {/* Jersey collar */}
        <path
          d="M48 43 L48 47 L72 47 L72 43"
          className="stroke-slate-600 stroke-[1.5] fill-slate-600"
        />
        
        {/* Jersey crest */}
        <path
          d="M55 55 L65 55 L65 65 L60 68 L55 65 Z"
          className="fill-slate-500 stroke-slate-600 stroke-[0.5]"
        />
        
        {/* Left Sleeve & Arm */}
        <path
          d="M38 43 L28 48 L25 70 L38 72 L38 43"
          className={cn(
            "fill-slate-700 stroke-slate-800 stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-warning/40",
            isPartActive('arms') && "fill-warning/50 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        {/* Left forearm */}
        <path
          d="M25 70 L22 95 L32 95 L38 72"
          className={cn(
            "fill-muted stroke-border stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-warning/30",
            isPartActive('arms') && "fill-warning/40 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        
        {/* Right Sleeve & Arm */}
        <path
          d="M82 43 L92 48 L95 70 L82 72 L82 43"
          className={cn(
            "fill-slate-700 stroke-slate-800 stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-warning/40",
            isPartActive('arms') && "fill-warning/50 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        {/* Right forearm */}
        <path
          d="M95 70 L98 95 L88 95 L82 72"
          className={cn(
            "fill-muted stroke-border stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-warning/30",
            isPartActive('arms') && "fill-warning/40 stroke-warning"
          )}
          onClick={() => handlePartClick('arms')}
        />
        
        {/* Shorts */}
        <path
          d="M38 95 L82 95 L78 130 L42 130 Z"
          className="fill-red-500 stroke-red-600 stroke-[1.5]"
        />
        
        {/* Shorts number */}
        <text x="60" y="118" textAnchor="middle" className="fill-white text-[10px] font-bold">10</text>
        
        {/* Left Leg */}
        <path
          d="M42 130 L48 130 L50 175 L40 175 Z"
          className={cn(
            "fill-muted stroke-border stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-success/30",
            isPartActive('legs') && "fill-success/40 stroke-primary"
          )}
          onClick={() => handlePartClick('legs')}
        />
        
        {/* Right Leg */}
        <path
          d="M72 130 L78 130 L80 175 L70 175 Z"
          className={cn(
            "fill-muted stroke-border stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-success/30",
            isPartActive('legs') && "fill-success/40 stroke-primary"
          )}
          onClick={() => handlePartClick('legs')}
        />
        
        {/* Left Sock */}
        <path
          d="M40 175 L50 175 L50 200 L40 200 Z"
          className={cn(
            "fill-cyan-400 stroke-cyan-500 stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-success/30",
            isPartActive('legs') && "fill-success/40 stroke-primary"
          )}
          onClick={() => handlePartClick('legs')}
        />
        
        {/* Right Sock */}
        <path
          d="M70 175 L80 175 L80 200 L70 200 Z"
          className={cn(
            "fill-cyan-400 stroke-cyan-500 stroke-[1.5] transition-all duration-200 cursor-pointer hover:fill-success/30",
            isPartActive('legs') && "fill-success/40 stroke-primary"
          )}
          onClick={() => handlePartClick('legs')}
        />
        
        {/* Left Boot */}
        <path
          d="M38 200 L52 200 L52 210 L35 210 L35 205 Z"
          className="fill-lime-500 stroke-lime-600 stroke-[1.5]"
        />
        
        {/* Right Boot */}
        <path
          d="M68 200 L82 200 L85 205 L85 210 L68 210 Z"
          className="fill-lime-500 stroke-lime-600 stroke-[1.5]"
        />
        
        {/* Boot studs */}
        <rect x="38" y="210" width="3" height="3" className="fill-slate-800" />
        <rect x="44" y="210" width="3" height="3" className="fill-slate-800" />
        <rect x="50" y="210" width="3" height="3" className="fill-slate-800" />
        <rect x="70" y="210" width="3" height="3" className="fill-slate-800" />
        <rect x="76" y="210" width="3" height="3" className="fill-slate-800" />
        <rect x="82" y="210" width="3" height="3" className="fill-slate-800" />
      </svg>
    </div>
  );
};