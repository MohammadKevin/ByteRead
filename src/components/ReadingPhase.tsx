import React, { useState, useEffect } from 'react';
import { Quest } from '../types';
import { sound } from '../services/audio';
import { 
  ArrowLeft, 
  ArrowRight, 
  Swords, 
  Clock, 
  Code, 
  Lightbulb, 
  Check, 
  Terminal,
  ShieldAlert
} from 'lucide-react';

interface ReadingPhaseProps {
  quest: Quest;
  onExit: () => void;
  onStartQuiz: (readingSeconds: number) => void;
}

export const ReadingPhase: React.FC<ReadingPhaseProps> = ({
  quest,
  onExit,
  onStartQuiz
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(new Set([0]));

  const totalSlides = quest.slides.length;
  const currentSlide = quest.slides[currentSlideIndex];
  const isLastSlide = currentSlideIndex === totalSlides - 1;

  // Dwell timer safeguard
  const isDwellTimeSatisfied = elapsedSeconds >= Math.min(6, totalSlides * 2);
  const canUnlockBossFight = isLastSlide && isDwellTimeSatisfied && visitedSlides.size === totalSlides;

  // Live Timer Count
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      sound.playSlide();
      const nextIdx = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIdx);
      setVisitedSlides((prev) => new Set([...prev, nextIdx]));
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      sound.playSlide();
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 bg-[#f6f5f4] text-[#000000]">
      
      {/* STEPPER FLOW INDICATOR */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[rgba(0,0,0,0.08)] text-xs">
        <div className="flex items-center gap-2.5 text-[#0075de] font-semibold">
          <span className="w-6 h-6 rounded-full bg-[#0075de] text-white font-bold flex items-center justify-center text-xs">
            1
          </span>
          <span>FASE 1: BACA MATERIAL BACTES</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[#757575] font-medium">
          <span>➔ Step 2: Boss Fight Kuis</span>
          <span>➔ Step 3: Rewards & Rank</span>
        </div>
      </div>

      {/* TOP CONTROL BAR & PROGRESS */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[rgba(0,0,0,0.08)]">
        
        {/* Exit Button & Quest Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onExit();
            }}
            className="p-2 rounded-lg bg-[#f6f5f4] hover:bg-[#e4e2df] text-[#000000] transition-colors"
            title="Keluar ke Lobby"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[10px] font-mono-code text-[#757575] uppercase tracking-wider">
              {quest.category} • {quest.difficulty}
            </div>
            <h2 className="text-sm md:text-base font-bold text-[#000000]">
              {quest.title}
            </h2>
          </div>
        </div>

        {/* Live Timer & Slide Indicator */}
        <div className="flex items-center gap-4 text-xs self-end sm:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f6f5f4] border border-[rgba(0,0,0,0.08)] text-[#e89d01] font-mono-code font-medium">
            <Clock className="w-3.5 h-3.5 text-[#e89d01]" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-[#e6f3fe] text-[#0075de] font-semibold">
            Slide {currentSlideIndex + 1} dari {totalSlides}
          </div>
        </div>

      </div>

      {/* SEGMENTED PROGRESS BAR */}
      <div className="w-full bg-white p-2 rounded-xl border border-[rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-4 gap-2">
          {quest.slides.map((slide, idx) => (
            <div
              key={slide.id}
              onClick={() => {
                sound.playSlide();
                setCurrentSlideIndex(idx);
                setVisitedSlides((prev) => new Set([...prev, idx]));
              }}
              className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                idx === currentSlideIndex
                  ? 'bg-[#0075de]'
                  : idx < currentSlideIndex
                  ? 'bg-[#ffb110]'
                  : 'bg-[#e4e2df]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* MAIN READING FLASHCARD (NOTION DOCUMENT PAGE STYLE) */}
      <div className="relative rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] shadow-sm overflow-hidden">
        
        {/* Document Header Bar */}
        <div className="bg-[#f6f5f4] px-6 py-3 border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#615d59]">
            <Terminal className="w-4 h-4 text-[#0075de]" />
            <span>slide_0{currentSlideIndex + 1}_byte_note.md</span>
          </div>

          <span className="text-xs text-[#757575]">
            Est. Read: ~{currentSlide.estimatedSec}s
          </span>
        </div>

        {/* Card Content Body */}
        <div className="p-8 md:p-10 space-y-6">
          
          {/* Slide Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#000000] border-b border-[rgba(0,0,0,0.08)] pb-4 flex items-center gap-3">
            <span className="text-[#0075de]">⚡</span> {currentSlide.title}
          </h1>

          {/* Main Content */}
          <div className="text-base leading-relaxed text-[#111111] space-y-4 whitespace-pre-line">
            {currentSlide.contentMarkdown}
          </div>

          {/* Analogy Box (Notion Callout Block Style) */}
          <div className="rounded-xl bg-[#fff9e6] p-5 border-l-4 border-[#ffb110] space-y-2 border-t border-r border-b border-[rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#000000] uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-[#e89d01]" />
              Analogi & Contoh Praktis
            </div>
            <p className="text-sm text-[#615d59] leading-relaxed">
              {currentSlide.analogy}
            </p>
          </div>

          {/* Code Snippet */}
          {currentSlide.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono-code text-[#615d59]">
                <Code className="w-3.5 h-3.5 text-[#0075de]" /> Syntax Highlighted Snippet:
              </div>
              <pre className="bg-[#111111] p-5 rounded-xl text-xs md:text-sm font-mono-code text-[#62aef0] overflow-x-auto">
                <code>{currentSlide.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Key Takeaway Banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#e6f3fe] border border-[#0075de]/20 text-[#0075de] text-xs font-medium">
            <Check className="w-4 h-4 text-[#0075de] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0075de]">Key Takeaway:</strong> {currentSlide.keyTakeaway}
            </div>
          </div>

        </div>

        {/* CARD FOOTER NAVIGATION */}
        <div className="bg-[#f6f5f4] px-6 py-4 border-t border-[rgba(0,0,0,0.08)] flex items-center justify-between gap-4">
          
          <button
            onClick={handlePrevSlide}
            disabled={currentSlideIndex === 0}
            className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
              currentSlideIndex === 0
                ? 'opacity-40 border-[rgba(0,0,0,0.08)] text-[#757575] cursor-not-allowed'
                : 'bg-white hover:bg-[#e4e2df] text-[#000000] border-[rgba(0,0,0,0.08)]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Slide Sebelumnya
          </button>

          {!isLastSlide ? (
            <button
              onClick={handleNextSlide}
              className="px-6 py-2.5 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white font-semibold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              Slide Selanjutnya <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-xs font-semibold text-[#0075de]">
              ✔ Slide Terakhir Dicapai!
            </div>
          )}

        </div>

      </div>

      {/* BOSS FIGHT CTA BUTTON */}
      <div className="pt-2">
        {canUnlockBossFight ? (
          <button
            onClick={() => {
              sound.playVictory();
              onStartQuiz(elapsedSeconds);
            }}
            className="w-full py-4 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white font-bold text-sm md:text-base tracking-wide shadow-md transition-all flex items-center justify-center gap-3 hover:scale-[1.01]"
          >
            <Swords className="w-5 h-5 text-white" />
            2. LANJUT KE BOSS FIGHT (KUIS)! ⚔️
          </button>
        ) : (
          <div className="rounded-xl bg-white border border-[rgba(0,0,0,0.08)] p-4 flex items-center justify-between text-xs text-[#615d59]">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#e89d01]" />
              <span>
                {!isLastSlide 
                  ? `Baca hingga slide ${totalSlides}/${totalSlides} untuk membuka Boss Fight!`
                  : `Menyiapkan arena Boss Fight... (${Math.max(0, 6 - elapsedSeconds)}s lagi)`}
              </span>
            </div>
            
            <button
              disabled
              className="px-4 py-2 rounded-lg bg-[#f6f5f4] text-[#757575] font-semibold border border-[rgba(0,0,0,0.08)] cursor-not-allowed flex items-center gap-2 opacity-50"
            >
              <Swords className="w-4 h-4" /> Boss Fight Locked 🔒
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
