import React, { useEffect } from 'react';
import { BadgeAchievement } from '../../types';
import { sound } from '../../services/audioService';
import { X } from 'lucide-react';

interface BadgeUnlockedToastProps {
  badge: BadgeAchievement;
  onClose: () => void;
}

export const BadgeUnlockedToast: React.FC<BadgeUnlockedToastProps> = ({ badge, onClose }) => {
  useEffect(() => {
    sound.playVictory();
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [badge, onClose]);

  return (
    <div className="fixed top-16 right-4 z-50 max-w-xs w-full bg-white border border-blue-200 p-4 rounded-2xl shadow-xl flex items-start justify-between gap-3">
      
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0 mt-0.5">
          {badge.icon}
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 block">
            Badge Baru Terbuka!
          </span>
          <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
          <p className="text-[11px] text-slate-600 leading-snug">{badge.description}</p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
      >
        <X className="w-3.5 h-3.5" />
      </button>

    </div>
  );
};
