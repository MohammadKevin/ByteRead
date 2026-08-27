import React, { useState } from 'react';
import { UserProfile } from '../../types';
import { getLevelInfo } from '../../data/levels';
import { sound } from '../../services/audioService';
import { 
  Flame, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Radio,
  Zap,
  User,
  LogOut,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  user: UserProfile;
  soundFxEnabled: boolean;
  ambientEnabled: boolean;
  onToggleSoundFx: () => void;
  onToggleAmbient: () => void;
  onOpenLibrary: (initialTab?: 'STREAK' | 'SAVED' | 'QUOTES' | 'BADGES') => void;
  onOpenStreakModal: () => void;
  onNavigateHome: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  soundFxEnabled,
  ambientEnabled,
  onToggleSoundFx,
  onToggleAmbient,
  onOpenLibrary,
  onOpenStreakModal,
  onNavigateHome,
  onOpenAuthModal,
  onLogout
}) => {
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const { currentLevel, nextLevel, progressPercentage } = getLevelInfo(user.xp);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 h-15 flex items-center justify-between shadow-xs">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-3">
        
        {/* BRAND LOGO */}
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center font-black text-sm shadow-xs transition-colors">
            ⚡
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-slate-900 font-heading">
              Byte<span className="text-cyan-600">Read</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-medium">
              Intisari 3 Menit
            </span>
          </div>
        </button>

        {/* TIME SAVED & LEVEL HUD (Desktop/Tablet) */}
        <div className="hidden md:flex items-center gap-4 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-xl">
          
          {/* Time Saved Stat */}
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium border-r border-slate-200 pr-3">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hemat <strong className="text-emerald-800 font-mono">{user.totalHoursSaved} jam</strong></span>
          </div>

          {/* Level & XP Progress Bar */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-slate-700 font-mono">
              Lv.{currentLevel.level}
            </span>
            <div className="w-24 lg:w-32 flex flex-col justify-center">
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">
              {user.xp} XP
            </span>
          </div>

          {/* Streak Flame */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenStreakModal();
            }}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold font-mono transition-colors"
            title="Lihat riwayat streak membaca harian"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{user.streak.currentStreak} hari</span>
          </button>

        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-2">
          
          {/* Ambient Study Sound Button */}
          <button
            onClick={onToggleAmbient}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              ambientEnabled 
                ? 'bg-cyan-50 text-cyan-700 border-cyan-300 font-semibold' 
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            }`}
            title={ambientEnabled ? 'Matikan audio fokus' : 'Nyalakan audio fokus latar'}
          >
            <Radio className="w-3.5 h-3.5 text-cyan-600" />
            <span className="hidden sm:inline">Audio Fokus</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSoundFx}
            className={`p-2 rounded-lg text-xs border transition-colors ${
              soundFxEnabled 
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' 
                : 'bg-white text-slate-400 border-slate-200'
            }`}
            title={soundFxEnabled ? 'Matikan efek suara' : 'Aktifkan efek suara'}
          >
            {soundFxEnabled ? <Volume2 className="w-4 h-4 text-blue-600" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Streak */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenStreakModal();
            }}
            className="md:hidden flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 text-xs font-mono font-bold"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{user.streak.currentStreak}d</span>
          </button>

          {/* Rak Saya Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenLibrary('SAVED');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Rak Saya</span>
            {user.bookmarkedBookIds.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-blue-800 text-white text-[10px] font-mono font-bold">
                {user.bookmarkedBookIds.length}
              </span>
            )}
          </button>

          {/* User Account / Auth Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Akun Saya"
            >
              <div className="w-7 h-7 rounded-md bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold text-xs font-heading">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-xl p-2 shadow-xl z-50 space-y-1 text-xs">
                <div className="px-2.5 py-1.5 border-b border-slate-100">
                  <span className="font-bold text-slate-900 block truncate">{user.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{user.username}</span>
                </div>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenAuthModal();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 flex items-center gap-2 text-slate-700 font-medium"
                >
                  <LogIn className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ganti / Masuk Akun</span>
                </button>

                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar (Logout)</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
