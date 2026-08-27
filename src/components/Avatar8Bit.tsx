import React from 'react';
import { Crown } from 'lucide-react';

interface AvatarProps {
  seed?: number;
  size?: number;
  className?: string;
  showCrown?: boolean;
}

export const Avatar8Bit: React.FC<AvatarProps> = ({
  size = 48,
  className = '',
  showCrown = false
}) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center rounded-full bg-white border-2 border-[#097fe8] p-0.5 shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {showCrown && (
        <div className="absolute -top-2 -right-1 bg-[#ffb110] text-black p-0.5 rounded-full z-10 border border-white">
          <Crown className="w-3 h-3 fill-black" />
        </div>
      )}
      
      <div className="w-full h-full rounded-full bg-[#f6f5f4] overflow-hidden flex items-center justify-center relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Flat illustrated face */}
          <circle cx="50" cy="50" r="48" fill="#ffffff" />
          <circle cx="50" cy="46" r="22" fill="#ffe2d1" />
          
          {/* Hair */}
          <path d="M 28 42 Q 50 18 72 42 Q 60 26 50 26 Q 40 26 28 42 Z" fill="#000000" />

          {/* Glasses */}
          <rect x="34" y="38" width="13" height="10" rx="3" fill="none" stroke="#000000" strokeWidth="2.5" />
          <rect x="53" y="38" width="13" height="10" rx="3" fill="none" stroke="#000000" strokeWidth="2.5" />
          <line x1="47" y1="42" x2="53" y2="42" stroke="#000000" strokeWidth="2.5" />

          {/* Eyes */}
          <circle cx="40.5" cy="43" r="1.5" fill="#000000" />
          <circle cx="59.5" cy="43" r="1.5" fill="#000000" />

          {/* Smile */}
          <path d="M 43 56 Q 50 61 57 56" stroke="#000000" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* Live Badge online status */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full" />
      </div>
    </div>
  );
};
