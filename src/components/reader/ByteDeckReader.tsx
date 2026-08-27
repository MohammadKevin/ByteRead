import React, { useState, useEffect } from 'react';
import { Book } from '../../types';
import { sound } from '../../services/audioService';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Volume2, 
  Camera, 
  Pause,
  ShieldCheck,
  AlertTriangle,
  Zap
} from 'lucide-react';

interface ByteDeckReaderProps {
  book: Book;
  onExit: () => void;
  onStartQuiz: (readingSeconds: number) => void;
  onOpenQuoteGenerator: (quote: { bookTitle: string; author: string; quote: string }) => void;
}

export const ByteDeckReader: React.FC<ByteDeckReaderProps> = ({
  book,
  onExit,
  onStartQuiz,
  onOpenQuoteGenerator
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isPlayingTts, setIsPlayingTts] = useState<boolean>(false);

  const totalSlides = book.slides.length;
  const currentSlide = book.slides[currentSlideIndex] || book.slides[0];
  const isLastSlide = currentSlideIndex === totalSlides - 1;
  const isVerified = book.verificationStatus === 'VERIFIED';

  // Reading Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Text to Speech
  const handleToggleTts = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingTts) {
      window.speechSynthesis.cancel();
      setIsPlayingTts(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${currentSlide.hookHeadline}. ${currentSlide.biteContent}. Poin inti: ${currentSlide.bulletTakeaways.join('. ')}. Analogi: ${currentSlide.realWorldAnalogy}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'id-ID';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingTts(false);
      utterance.onerror = () => setIsPlayingTts(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingTts(true);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingTts(false);
    }
  }, [currentSlideIndex]);

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      sound.playSlide();
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      sound.playSlide();
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSlideIndex < totalSlides - 1) handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 pb-16">
      
      {/* TOP HEADER CONTROLS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
        
        {/* Exit Button */}
        <button
          onClick={() => {
            sound.playClick();
            onExit();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs font-medium border border-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </button>

        {/* Book Title & Verification */}
        <div className="text-center min-w-0">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 line-clamp-1 font-heading">{book.title}</span>
            {isVerified ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            )}
          </div>
          <span className="text-[10px] text-slate-500 font-mono">{book.author}</span>
        </div>

        {/* Audio TTS & Timer */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleTts}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isPlayingTts
                ? 'bg-cyan-50 text-cyan-800 border-cyan-300 font-semibold'
                : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'
            }`}
            title="Dengarkan pembacaan teks otomatis"
          >
            {isPlayingTts ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
            <span className="hidden sm:inline">{isPlayingTts ? 'Jeda' : 'Audio'}</span>
          </button>

          <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-cyan-800 text-xs font-mono font-medium">
            <Clock className="w-3.5 h-3.5 text-cyan-600" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>
        </div>

      </div>

      {/* SEGMENTED PROGRESS BARS */}
      <div className="flex items-center gap-1 px-0.5">
        {book.slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playSlide();
              setCurrentSlideIndex(idx);
            }}
            className="h-2 flex-1 rounded-full bg-slate-200 overflow-hidden cursor-pointer"
            title={`Slide ${idx + 1}`}
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
          </button>
        ))}
      </div>

      {/* MAIN SLIDE CARD */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Slide Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
          <span className="text-blue-700 font-mono font-semibold">
            Slide {currentSlide.slideNumber} dari {totalSlides}
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            Estimasi baca: ~{currentSlide.estimatedReadSec} detik
          </span>
        </div>

        {/* Chapter Title & Headline */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
            {currentSlide.chapterTitle}
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight font-heading">
            {currentSlide.hookHeadline}
          </h2>
        </div>

        {/* Core Bite Content */}
        <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-xl">
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-sans">
            {currentSlide.biteContent}
          </p>
        </div>

        {/* Actionable Takeaways */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono block">
            Poin Aplikatif:
          </span>
          <div className="space-y-2">
            {currentSlide.bulletTakeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-xs sm:text-sm text-slate-800"
              >
                <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="leading-snug">{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Analogy */}
        <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-xl space-y-1 text-xs sm:text-sm">
          <span className="font-bold text-emerald-800 font-mono">💡 Analogi Nyata: </span>
          <span className="text-slate-800 leading-relaxed">{currentSlide.realWorldAnalogy}</span>
        </div>

        {/* Quotation Box */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs text-slate-800 italic font-serif leading-relaxed">
              "{currentSlide.quotableSentence}"
            </p>
            <span className="text-[10px] text-slate-500 block font-sans">
              — {book.author}, <em>{book.title}</em>
            </span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenQuoteGenerator({
                bookTitle: book.title,
                author: book.author,
                quote: currentSlide.quotableSentence
              });
            }}
            className="flex-shrink-0 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium transition-colors shadow-2xs"
          >
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>Kutipan Visual</span>
          </button>
        </div>

      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="flex items-center justify-between gap-3">
        
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
            currentSlideIndex === 0
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400 bg-white'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-2xs'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Slide Sebelumnya</span>
        </button>

        <span className="text-xs text-slate-500 font-mono">
          {currentSlideIndex + 1} / {totalSlides}
        </span>

        {isLastSlide ? (
          <button
            onClick={() => {
              sound.playVictory();
              onStartQuiz(elapsedSeconds);
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Uji Pemahaman (+{book.baseXp} XP)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <span>Lanjut Slide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}

      </div>

    </div>
  );
};
