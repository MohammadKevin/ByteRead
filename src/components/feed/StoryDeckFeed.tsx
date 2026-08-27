import React, { useState, useEffect } from 'react';
import { Book } from '../../types';
import { sound } from '../../services/audioService';
import { 
  X, 
  ChevronUp, 
  ChevronDown, 
  ShieldCheck, 
  AlertTriangle,
  Camera, 
  Bookmark,
  Play
} from 'lucide-react';

interface StoryDeckFeedProps {
  books: Book[];
  onClose: () => void;
  onReadFullBook: (book) => void;
  onBookmark: (bookId: string) => void;
  bookmarkedIds: string[];
  onOpenQuoteGenerator: (quote: { bookTitle: string; author: string; quote: string }) => void;
}

export const StoryDeckFeed: React.FC<StoryDeckFeedProps> = ({
  books,
  onClose,
  onReadFullBook,
  onBookmark,
  bookmarkedIds,
  onOpenQuoteGenerator
}) => {
  const [currentBookIndex, setCurrentBookIndex] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  const currentBook = books[currentBookIndex] || books[0];
  const currentSlide = currentBook.slides[currentSlideIndex] || currentBook.slides[0];
  const isBookmarked = bookmarkedIds.includes(currentBook.id);
  const isVerified = currentBook.verificationStatus === 'VERIFIED';

  const handleNextStory = () => {
    sound.playSlide();
    if (currentSlideIndex < currentBook.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else if (currentBookIndex < books.length - 1) {
      setCurrentBookIndex(prev => prev + 1);
      setCurrentSlideIndex(0);
    } else {
      setCurrentBookIndex(0);
      setCurrentSlideIndex(0);
    }
  };

  const handlePrevStory = () => {
    sound.playSlide();
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    } else if (currentBookIndex > 0) {
      setCurrentBookIndex(prev => prev - 1);
      setCurrentSlideIndex(0);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextStory();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStory();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentBookIndex, currentSlideIndex, books.length]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-0 sm:p-4">
      
      <div className="w-full max-w-md h-full sm:h-[88vh] max-h-[820px] bg-white border border-slate-200 sm:rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Progress Bar & Header */}
        <div className="p-4 pb-2 space-y-3 bg-white border-b border-slate-100">
          <div className="flex items-center gap-1">
            {currentBook.slides.map((_, idx) => (
              <div 
                key={idx}
                className="h-1.5 flex-1 rounded-full bg-slate-200 overflow-hidden"
              >
                <div 
                  className={`h-full transition-all duration-200 ${
                    idx < currentSlideIndex 
                      ? 'bg-blue-600 w-full' 
                      : idx === currentSlideIndex 
                      ? 'bg-cyan-500 w-full' 
                      : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img src={currentBook.coverImage} alt={currentBook.title} className="w-8 h-10 object-cover rounded-md border border-slate-200 shadow-2xs" />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1 font-heading">{currentBook.title}</h4>
                  {isVerified ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {currentBook.author} • Konsep {currentSlideIndex + 1}/{currentBook.slides.length}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 px-5 py-4 overflow-y-auto space-y-4">
          
          <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 block">
            {currentSlide.chapterTitle}
          </span>

          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug font-heading">
            {currentSlide.hookHeadline}
          </h2>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
              {currentSlide.biteContent}
            </p>
          </div>

          {/* Takeaways */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-500 block">Poin Aplikatif:</span>
            {currentSlide.bulletTakeaways.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200/70">
                <span className="text-cyan-700 font-bold font-mono">✓</span>
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>

          {/* Analogy */}
          <div className="bg-emerald-50/60 border border-emerald-200 p-3 rounded-xl text-xs space-y-0.5">
            <span className="font-bold text-emerald-800 font-mono">💡 Analogi Nyata: </span>
            <span className="text-slate-800 leading-relaxed">{currentSlide.realWorldAnalogy}</span>
          </div>

          {/* Quotation */}
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between gap-2">
            <p className="text-xs text-slate-800 italic">
              "{currentSlide.quotableSentence}"
            </p>
            <button
              onClick={() => onOpenQuoteGenerator({
                bookTitle: currentBook.title,
                author: currentBook.author,
                quote: currentSlide.quotableSentence
              })}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs flex-shrink-0 shadow-2xs"
              title="Buat Kartu Kutipan"
            >
              <Camera className="w-3.5 h-3.5 text-blue-600" />
            </button>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-white border-t border-slate-100 space-y-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onReadFullBook(currentBook);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Buka Ringkasan Lengkap (3 Menit)</span>
            </button>

            <button
              onClick={() => onBookmark(currentBook.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isBookmarked 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
              title="Simpan ke Rak"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <button onClick={handlePrevStory} className="hover:text-slate-800 flex items-center gap-1">
              <ChevronUp className="w-3 h-3" /> Sebelum
            </button>
            <span>Navigasi: Spasi / Panah</span>
            <button onClick={handleNextStory} className="hover:text-slate-800 flex items-center gap-1 text-cyan-700 font-semibold">
              Lanjut <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
