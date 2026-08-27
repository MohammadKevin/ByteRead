import React, { useState } from 'react';
import { UserProfile, Book } from '../../types';
import { getLast14DaysHistory, getStreakMultiplier } from '../../services/streakEngine';
import { getLevelInfo } from '../../data/levels';
import { sound } from '../../services/audioService';
import { 
  X, 
  Flame, 
  Bookmark, 
  Trophy, 
  Camera, 
  Play, 
  Trash2, 
  Share2, 
  Calendar,
  Lock,
  Zap
} from 'lucide-react';

export type LibraryTab = 'STREAK' | 'SAVED' | 'QUOTES' | 'BADGES';

interface MyLibraryDrawerProps {
  user: UserProfile;
  allBooks: Book[];
  initialTab?: LibraryTab;
  onClose: () => void;
  onStartReading: (book: Book) => void;
  onRemoveBookmark: (bookId: string) => void;
  onDeleteQuote: (quoteId: string) => void;
  onOpenQuoteGenerator: (quote: { bookTitle: string; author: string; quote: string }) => void;
}

export const MyLibraryDrawer: React.FC<MyLibraryDrawerProps> = ({
  user,
  allBooks,
  initialTab = 'STREAK',
  onClose,
  onStartReading,
  onRemoveBookmark,
  onDeleteQuote,
  onOpenQuoteGenerator
}) => {
  const [activeTab, setActiveTab] = useState<LibraryTab>(initialTab);

  const { currentLevel, nextLevel, progressPercentage } = getLevelInfo(user.xp);
  const calendar14Days = getLast14DaysHistory(user.streak.streakHistory);
  const streakMultiplier = getStreakMultiplier(user.streak.currentStreak);

  const bookmarkedBooks = allBooks.filter(b => user.bookmarkedBookIds.includes(b.id));
  const completedBooks = allBooks.filter(b => user.completedBookIds.includes(b.id));

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end">
      
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between overflow-hidden z-10">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 space-y-3 bg-slate-50">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">{user.name}</h3>
              <span className="text-xs text-blue-700 font-mono font-medium">{user.levelTitle}</span>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Time Saved Highlight Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <div className="flex items-center gap-2 text-emerald-800">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span className="font-medium">Total Waktu Membaca Dihemat:</span>
            </div>
            <span className="font-bold text-emerald-800 font-mono text-sm">
              ~{user.totalHoursSaved} Jam
            </span>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-800 font-bold">{user.xp} XP</span>
              <span className="text-slate-500">Target: {nextLevel?.minXp || 'Maksimal'} XP</span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-200/80 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('STREAK');
              }}
              className={`py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'STREAK'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Habit</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('SAVED');
              }}
              className={`py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'SAVED'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Rak ({bookmarkedBooks.length})</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('QUOTES');
              }}
              className={`py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'QUOTES'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Kutipan</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('BADGES');
              }}
              className={`py-1.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-1 ${
                activeTab === 'BADGES'
                  ? 'bg-white text-blue-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Badge</span>
            </button>
          </div>

        </div>

        {/* Tab Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5">
          
          {/* TAB 1: HABIT TRACKER */}
          {activeTab === 'STREAK' && (
            <div className="space-y-4">
              
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="text-lg font-bold text-slate-900 font-mono">
                      {user.streak.currentStreak} Hari Beruntun
                    </span>
                  </div>
                  {streakMultiplier > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-mono font-semibold border border-amber-200">
                      +{streakMultiplier}% Bonus XP
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  Rekor terpanjang: <span className="text-slate-900 font-mono font-semibold">{user.streak.longestStreak} hari</span>. Selesaikan 1 ringkasan sebelum tengah malam.
                </p>
              </div>

              {/* 14-Day Calendar Heatmap */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>Aktivitas 14 Hari Terakhir</span>
                  </span>
                  <span className="font-mono text-emerald-700 font-semibold">
                    {calendar14Days.filter(d => d.active).length} / 14 Hari Aktif
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 pt-1">
                  {calendar14Days.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                          day.active
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
                            : 'bg-white text-slate-300 border-slate-200'
                        }`}
                        title={`${day.dateStr}: ${day.active ? `Aktif (${day.xp} XP)` : 'Belum Membaca'}`}
                      >
                        {day.active ? '✓' : ''}
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">{day.dayLabel}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reading Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-mono block">Waktu Fokus Membaca</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">{user.totalMinutesRead} Menit</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-mono block">Rata-Rata Akurasi Kuis</span>
                  <span className="text-sm font-bold text-cyan-800 font-mono">{user.quizAccuracyAverage}%</span>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SAVED & FINISHED */}
          {activeTab === 'SAVED' && (
            <div className="space-y-5">
              
              {/* Bookmarks */}
              <div className="space-y-2.5">
                <span className="text-xs font-semibold text-slate-500 uppercase font-mono block">
                  Buku Tersimpan ({bookmarkedBooks.length})
                </span>

                {bookmarkedBooks.length > 0 ? (
                  <div className="space-y-2">
                    {bookmarkedBooks.map((b) => (
                      <div key={b.id} className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={b.coverImage} alt={b.title} className="w-9 h-12 object-cover rounded-md border border-slate-200 flex-shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{b.title}</h4>
                            <span className="text-[10px] text-slate-500">{b.author} • {b.estimatedMinutes}m</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            onClick={() => {
                              sound.playClick();
                              onClose();
                              onStartReading(b);
                            }}
                            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                            title="Mulai Membaca"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                          </button>
                          <button
                            onClick={() => onRemoveBookmark(b.id)}
                            className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 border border-slate-200"
                            title="Hapus dari Rak"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    Belum ada buku yang disimpan ke rak.
                  </p>
                )}
              </div>

              {/* Completed */}
              <div className="space-y-2.5 pt-3 border-t border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase font-mono block">
                  Buku Selesai Dibaca ({completedBooks.length})
                </span>

                {completedBooks.length > 0 ? (
                  <div className="space-y-2">
                    {completedBooks.map((b) => (
                      <div key={b.id} className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-3 shadow-2xs">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={b.coverImage} alt={b.title} className="w-9 h-12 object-cover rounded-md border border-slate-200 flex-shrink-0" />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">{b.title}</h4>
                            <span className="text-[10px] text-emerald-700 font-medium">✓ Selesai & Lulus Kuis</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            sound.playClick();
                            onClose();
                            onStartReading(b);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium transition-colors"
                        >
                          Baca Ulang
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    Belum ada buku yang selesai dibaca.
                  </p>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: QUOTES */}
          {activeTab === 'QUOTES' && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase font-mono block">
                Koleksi Kutipan ({user.savedQuotes.length})
              </span>

              {user.savedQuotes.length > 0 ? (
                <div className="space-y-2.5">
                  {user.savedQuotes.map((q) => (
                    <div key={q.id} className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-2 shadow-2xs">
                      <p className="text-xs text-slate-800 italic font-serif leading-relaxed">
                        "{q.quote}"
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px]">
                        <div>
                          <span className="font-bold text-slate-800 block">— {q.author}</span>
                          <span className="text-slate-500">{q.bookTitle}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onOpenQuoteGenerator({
                              bookTitle: q.bookTitle,
                              author: q.author,
                              quote: q.quote
                            })}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            title="Buat Kartu Gambar"
                          >
                            <Share2 className="w-3.5 h-3.5 text-blue-600" />
                          </button>
                          <button
                            onClick={() => onDeleteQuote(q.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-rose-600"
                            title="Hapus Kutipan"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  Belum ada kutipan disimpan. Klik ikon kamera saat membaca ringkasan untuk membuat kartu kutipan.
                </p>
              )}
            </div>
          )}

          {/* TAB 4: BADGES */}
          {activeTab === 'BADGES' && (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-slate-500 uppercase font-mono block">
                Pencapaian Badge ({user.badges.filter(b => b.unlocked).length}/{user.badges.length})
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {user.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-xl border space-y-1.5 transition-colors ${
                      badge.unlocked
                        ? 'bg-white border-blue-200 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-2xl">{badge.icon}</span>
                      {badge.unlocked ? (
                        <span className="text-[10px] font-mono text-emerald-700 font-bold">
                          Terbuka
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> Terkunci
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-snug">{badge.description}</p>
                    </div>

                    {!badge.unlocked && badge.progressTarget && (
                      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${Math.min(100, (((badge.progressCurrent || 0) / badge.progressTarget) * 100))}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
