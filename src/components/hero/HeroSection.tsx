import React, { useState } from 'react';
import { Book, UserProfile } from '../../types';
import { sound } from '../../services/audioService';
import { 
  Search, 
  Flame, 
  Play, 
  ShieldCheck, 
  AlertTriangle,
  X,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Clock
} from 'lucide-react';

interface HeroSectionProps {
  dailyPick: Book;
  user: UserProfile;
  searchQuery: string;
  displayMode: 'SCAN_QUICK' | 'GRID_CARDS';
  onSearchChange: (query: string) => void;
  onToggleDisplayMode: (mode: 'SCAN_QUICK' | 'GRID_CARDS') => void;
  onStartReading: (book: Book) => void;
  onOpenStoryDeck: () => void;
  onViewCitation: (book: Book) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  dailyPick,
  user,
  searchQuery,
  displayMode,
  onSearchChange,
  onToggleDisplayMode,
  onStartReading,
  onOpenStoryDeck,
  onViewCitation
}) => {
  const [isDailyExpanded, setIsDailyExpanded] = useState<boolean>(true);

  return (
    <section className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-7 space-y-6">
      
      {/* TOP GREETING & SUMMARY STATS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-800">
            Hai, {user.name.split(' ')[0]} 👋
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-xs text-blue-700 font-medium">
            {user.levelTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Saved Metric */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hemat {user.totalHoursSaved} jam membaca</span>
          </div>

          {/* Daily Streak Indicator */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-mono font-semibold">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{user.streak.currentStreak} hari beruntun</span>
          </div>
        </div>
      </div>

      {/* HEADLINE & ACTION CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Headline & Search */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-heading leading-tight">
              Insight buku non-fiksi, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600">
                cepat dicerna dalam 3 menit.
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Solusi cerdas menyerap intisari buku non-fiksi tanpa membaca ratusan halaman. Dilengkapi sitasi ISBN terverifikasi, analogi konkret, dan evaluasi pemahaman cepat.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari buku, topik (e.g. Atomic Habits, Finansial, Fokus, Karir)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white border border-slate-300 focus:border-blue-500 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action Row: Reading Mode Toggles */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            
            {/* 60s Story Swipe Mode Trigger */}
            <button
              onClick={() => {
                sound.playClick();
                onOpenStoryDeck();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mode Swipe 60 Detik</span>
            </button>

            {/* Quick Scan vs Cards Mode Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                onToggleDisplayMode(displayMode === 'SCAN_QUICK' ? 'GRID_CARDS' : 'SCAN_QUICK');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
                displayMode === 'SCAN_QUICK'
                  ? 'bg-cyan-50 border-cyan-300 text-cyan-800 font-semibold'
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>{displayMode === 'SCAN_QUICK' ? 'Poin Kunci Terbuka (Aktif)' : 'Mode Kartu Standar'}</span>
            </button>

          </div>

        </div>

        {/* Right Column: Daily Highlight Pick with Instant 30s Takeaways */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-4.5 space-y-3 shadow-xs">
          
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 font-mono">
              Rekomendasi Hari Ini
            </span>

            {dailyPick.verificationStatus === 'VERIFIED' ? (
              <button
                onClick={() => onViewCitation(dailyPick)}
                className="flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-800 font-medium"
                title="Lihat ISBN & Sitasi Resmi"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Terverifikasi Resmi</span>
              </button>
            ) : (
              <span className="flex items-center gap-1 text-[11px] text-amber-700 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Perlu Verifikasi</span>
              </span>
            )}
          </div>

          <div className="flex items-start gap-3">
            <img
              src={dailyPick.coverImage}
              alt={dailyPick.title}
              className="w-14 h-20 object-cover rounded-lg border border-slate-200 flex-shrink-0 shadow-2xs"
            />
            <div className="space-y-1 min-w-0 flex-1">
              <h3 className="text-sm font-bold text-slate-900 line-clamp-1 font-heading">
                {dailyPick.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-1">
                {dailyPick.author} • {dailyPick.category}
              </p>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                "{dailyPick.oneSentenceSummary}"
              </p>
            </div>
          </div>

          {/* Instant 30s Key Takeaways (Scannable without deep clicks) */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setIsDailyExpanded(!isDailyExpanded)}
              className="w-full flex items-center justify-between text-xs text-slate-700 hover:text-blue-700 font-medium"
            >
              <span>3 Poin Inti (Baca 30 Detik)</span>
              {isDailyExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            </button>

            {isDailyExpanded && (
              <div className="space-y-1.5 pt-1 text-xs text-slate-700">
                {dailyPick.quickTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                    <span className="text-cyan-700 font-bold font-mono">✓</span>
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTA */}
          <button
            onClick={() => {
              sound.playClick();
              onStartReading(dailyPick);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Buka Ringkasan Lengkap (3 Menit)</span>
          </button>

        </div>

      </div>

    </section>
  );
};
