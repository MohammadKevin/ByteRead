import React from 'react';
import { UserProfile, AppView } from '../types';
import { sound } from '../services/audio';
import { Volume2, VolumeX, Shield, Zap, Terminal, Trophy, Flame } from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  currentView: AppView;
  onNavigateLobby: () => void;
  onOpenLeaderboard: () => void;
  onToggleSound: () => void;
  soundEnabled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  currentView,
  onNavigateLobby,
  onOpenLeaderboard,
  onToggleSound,
  soundEnabled
}) => {
  const xpPercentage = Math.min(100, Math.round((user.xp / user.maxXp) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.08)] px-4 lg:px-8 h-16 flex items-center shadow-[0px_0.7px_1.5px_rgba(0,0,0,0.015),0px_3px_9px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button 
          onClick={() => {
            sound.playClick();
            onNavigateLobby();
          }}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0075de] flex items-center justify-center text-white font-bold text-base shadow-sm">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base text-[#000000] tracking-tight">
                ByteRead
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f6d5b8] text-[#000000] font-medium">
                Notion Style
              </span>
            </div>
          </div>
        </button>

        {/* Global XP & Level Bar */}
        <div className="hidden md:flex items-center gap-6 bg-[#f6f5f4] px-4 py-1.5 rounded-xl border border-[rgba(0,0,0,0.06)]">
          
          {/* Level Info */}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0075de]" />
            <div className="text-xs font-medium text-[#000000]">
              {user.title}
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="w-36">
            <div className="flex justify-between text-[11px] font-mono-code text-[#615d59] mb-0.5">
              <span className="flex items-center gap-1 text-[#0075de] font-semibold">
                <Zap className="w-3 h-3 fill-[#0075de]" /> {user.xp} XP
              </span>
              <span>{user.maxXp} XP</span>
            </div>
            <div className="w-full bg-[#e4e2df] h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#0075de] rounded-full transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>

          {/* Streak Counter */}
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffb110]/20 text-[#000000] text-xs font-medium">
            <Flame className="w-3.5 h-3.5 fill-[#e89d01] text-[#e89d01]" />
            <span>{user.streakDays} Hari Streak</span>
          </div>

        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Leaderboard Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenLeaderboard();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#f6f5f4] text-[#000000] border border-[rgba(0,0,0,0.12)] transition-colors text-xs font-medium"
            title="Lihat Klasemen Kampus"
          >
            <Trophy className="w-3.5 h-3.5 text-[#e89d01]" />
            <span className="hidden sm:inline">Leaderboard</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-white hover:bg-[#f6f5f4] text-[#615d59] hover:text-[#000000] border border-[rgba(0,0,0,0.12)] transition-colors text-xs"
            title={soundEnabled ? 'Matikan Suara FX' : 'Aktifkan Suara FX'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#0075de]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#757575]" />
            )}
          </button>

          {/* Current View Badge if not in lobby */}
          {currentView !== 'LOBBY' && (
            <button
              onClick={() => {
                sound.playClick();
                onNavigateLobby();
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white text-xs font-semibold transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5" />
              Lobby
            </button>
          )}

        </div>

      </div>
    </header>
  );
};
