import React from 'react';
import { Sparkles, Bookmark, Compass, Layers } from 'lucide-react';
import { sound } from '../../services/audioService';

export type MainNavTab = 'FEED' | 'DISCOVER' | 'STORY_DECK' | 'SHELF';

interface BottomNavProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  bookmarkCount: number;
  streakDays: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  bookmarkCount,
  streakDays
}) => {
  const handleNav = (tab: MainNavTab) => {
    sound.playClick();
    onSelectTab(tab);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        
        <button
          onClick={() => handleNav('FEED')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
            activeTab === 'FEED'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px]">Beranda</span>
        </button>

        <button
          onClick={() => handleNav('DISCOVER')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
            activeTab === 'DISCOVER'
              ? 'text-cyan-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px]">Kebutuhan</span>
        </button>

        <button
          onClick={() => handleNav('STORY_DECK')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
            activeTab === 'STORY_DECK'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px]">Swipe 60s</span>
        </button>

        <button
          onClick={() => handleNav('SHELF')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors relative ${
            activeTab === 'SHELF'
              ? 'text-blue-700 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-4 h-4" />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-2 px-1 rounded-full bg-blue-600 text-white text-[8px] font-mono font-bold">
                {bookmarkCount}
              </span>
            )}
          </div>
          <span className="text-[10px]">Rak Buku</span>
        </button>

      </div>
    </nav>
  );
};
