import React, { useState } from 'react';
import { Book } from '../../types';
import { MOODS_METADATA } from '../../data/moods';
import { sound } from '../../services/audioService';
import { 
  ShieldCheck, 
  AlertTriangle,
  Clock, 
  Star, 
  Bookmark, 
  Play, 
  FileText,
  ChevronDown,
  ChevronUp,
  Zap,
  Check
} from 'lucide-react';

interface BookCardProps {
  book: Book;
  isBookmarked: boolean;
  isCompleted: boolean;
  displayMode?: 'SCAN_QUICK' | 'GRID_CARDS';
  onStartReading: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
  onViewCitation: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  isBookmarked,
  isCompleted,
  displayMode = 'SCAN_QUICK',
  onStartReading,
  onToggleBookmark,
  onViewCitation
}) => {
  const [isQuickExpanded, setIsQuickExpanded] = useState<boolean>(displayMode === 'SCAN_QUICK');
  const primaryMood = MOODS_METADATA[book.moodTags[0]];

  return (
    <div className="bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-xl p-4.5 flex flex-col justify-between transition-colors space-y-3.5 shadow-xs">
      
      <div className="space-y-3">
        
        {/* Top Header: Cover, Metadata & Action */}
        <div className="flex items-start justify-between gap-3">
          
          <div className="flex items-start gap-3">
            
            {/* Book Cover */}
            <div className="relative w-14 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-2xs">
              <img 
                src={book.coverImage} 
                alt={book.title} 
                className="w-full h-full object-cover"
              />
              {isCompleted && (
                <div className="absolute top-1 left-1 px-1 rounded bg-emerald-600 text-white text-[9px] font-bold flex items-center gap-0.5 shadow-xs">
                  <Check className="w-2.5 h-2.5" />
                  <span>Selesai</span>
                </div>
              )}
            </div>

            {/* Title & Author Info */}
            <div className="space-y-1 min-w-0">
              
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-700">
                  {book.category}
                </span>

                {/* Source Verification Badge */}
                {book.verificationStatus === 'VERIFIED' ? (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onViewCitation(book);
                    }}
                    className="flex items-center gap-0.5 text-[10px] text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
                    title="Lihat ISBN & Sitasi Resmi"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Terverifikasi</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onViewCitation(book);
                    }}
                    className="flex items-center gap-0.5 text-[10px] text-amber-700 hover:text-amber-800 font-medium transition-colors"
                    title="Data sedang diverifikasi kurator"
                  >
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    <span>Perlu Verifikasi</span>
                  </button>
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1 font-heading">
                {book.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-1">
                {book.author} ({book.citation.originalPublishYear})
              </p>

              {/* Time Saved & Rating */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-0.5">
                <span className="flex items-center gap-1 text-amber-600 font-medium">
                  <Star className="w-3 h-3 fill-amber-500" />
                  {book.rating}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 text-emerald-600" />
                  Hemat ~{book.timeSavedHours} jam
                </span>
              </div>

            </div>

          </div>

          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(book.id)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 border-slate-200'
            }`}
            title={isBookmarked ? 'Hapus dari Rak' : 'Simpan ke Rak'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
          </button>

        </div>

        {/* One-Sentence Summary */}
        <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
          "{book.oneSentenceSummary}"
        </p>

        {/* SCANNING UX: Instant 30s Key Takeaways Dropdown */}
        <div className="space-y-1.5">
          <button
            onClick={() => setIsQuickExpanded(!isQuickExpanded)}
            className="w-full flex items-center justify-between text-[11px] font-semibold text-blue-700 hover:text-blue-800 py-1 transition-colors"
          >
            <span>Poin Kunci (Baca Cepat 30 Detik)</span>
            {isQuickExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          {isQuickExpanded && (
            <div className="space-y-1.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
              {book.quickTakeaways.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                  <span className="text-cyan-700 font-bold font-mono">✓</span>
                  <span>{point}</span>
                </div>
              ))}

              {book.actionableStep && (
                <div className="pt-1.5 mt-1.5 border-t border-slate-200 text-[11px] text-emerald-800">
                  <strong>Aksi Konkret:</strong> {book.actionableStep}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mood & Duration Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          {primaryMood && (
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
              {primaryMood.emoji} {primaryMood.label}
            </span>
          )}

          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-cyan-800 font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-600" />
            <span>{book.estimatedMinutes} menit baca</span>
          </span>
        </div>

      </div>

      {/* Card Action Buttons */}
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        
        {/* Read Button */}
        <button
          onClick={() => {
            sound.playClick();
            onStartReading(book);
          }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
        >
          <Play className="w-3 h-3 fill-white" />
          <span>{isCompleted ? 'Baca Ulang Deck' : 'Buka Ringkasan (3 Menit)'}</span>
        </button>

        {/* Citation Button */}
        <button
          onClick={() => {
            sound.playClick();
            onViewCitation(book);
          }}
          className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-xs"
          title="Verifikasi ISBN & Sitasi Resmi"
        >
          <FileText className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
};
