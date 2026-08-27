import React, { useEffect, useState } from 'react';
import { Quest, UserProfile, CanteenReward } from '../types';
import confetti from 'canvas-confetti';
import { sound } from '../services/audio';
import { 
  Trophy, 
  Zap, 
  Target, 
  Flame, 
  Clock, 
  Award, 
  Coffee, 
  Home, 
  RotateCcw,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface ResultsPhaseProps {
  quest: Quest;
  user: UserProfile;
  canteenReward: CanteenReward;
  quizResults: {
    score: number;
    accuracy: number;
    correctCount: number;
    totalQuestions: number;
    maxCombo: number;
    userAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[];
  };
  readingSeconds: number;
  onReturnLobby: () => void;
  onReviewAnswers: () => void;
}

export const ResultsPhase: React.FC<ResultsPhaseProps> = ({
  quest,
  user,
  canteenReward,
  quizResults,
  readingSeconds,
  onReturnLobby,
  onReviewAnswers
}) => {
  const [animatedXp, setAnimatedXp] = useState<number>(0);

  useEffect(() => {
    sound.playVictory();

    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0075de', '#ffb110', '#f64932']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0075de', '#ffb110', '#f64932']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    const totalAwardedXp = quizResults.score + quest.xpReward;
    let current = 0;
    const step = Math.max(1, Math.floor(totalAwardedXp / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= totalAwardedXp) {
        setAnimatedXp(totalAwardedXp);
        clearInterval(interval);
      } else {
        setAnimatedXp(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [quizResults.score, quest.xpReward]);

  const totalAwardedXp = quizResults.score + quest.xpReward;
  const nextCanteenThreshold = canteenReward.xpCost - user.xp;

  const formatReadingTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16 text-center text-[#000000]">
      
      {/* STEPPER FLOW INDICATOR */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[rgba(0,0,0,0.08)] text-xs text-left">
        <div className="flex items-center gap-2 text-[#757575] font-medium">
          <span>✔ Step 1: Baca Material</span>
          <span className="hidden sm:inline">✔ Step 2: Kuis</span>
        </div>

        <div className="flex items-center gap-2 text-[#0075de] font-semibold">
          <span className="w-6 h-6 rounded-full bg-[#0075de] text-white font-bold flex items-center justify-center text-xs">
            3
          </span>
          <span>FASE 3: REWARDS & LIGA MINGGUAN</span>
        </div>
      </div>

      {/* VICTORY BANNER */}
      <div className="space-y-3">
        <div className="inline-flex p-4 rounded-2xl bg-[#e6f3fe] text-[#0075de] border border-[#0075de]/20 shadow-sm">
          <Trophy className="w-10 h-10" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#000000]">
          QUEST CLEARED! 🎉
        </h1>

        <p className="text-sm md:text-base text-[#615d59]">
          Misi <span className="text-[#0075de] font-bold">"{quest.title}"</span> Berhasil Diselesaikan!
        </p>
      </div>

      {/* REWARD BOARD */}
      <div className="rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] p-6 md:p-8 space-y-6 shadow-sm text-center">
        
        {/* XP Gained Highlight Box */}
        <div className="rounded-xl bg-[#e6f3fe] p-6 border border-[#0075de]/20 space-y-2">
          <span className="text-xs font-mono-code text-[#615d59] uppercase tracking-wider">
            Total Hadiah XP Diperoleh
          </span>
          <div className="text-4xl md:text-5xl font-extrabold text-[#0075de] flex items-center justify-center gap-2">
            <Zap className="w-8 h-8 fill-[#0075de]" />
            +{animatedXp} XP
          </div>
          <p className="text-xs text-[#615d59]">
            ({quest.xpReward} Base Quest XP + {quizResults.score} Speed & Combo Quiz Bonus)
          </p>
        </div>

        {/* 4 Stats Grid Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl bg-[#f6f5f4] border border-[rgba(0,0,0,0.08)] space-y-1">
            <Target className="w-5 h-5 text-[#0075de] mx-auto" />
            <div className="text-xs text-[#615d59]">Akurasi</div>
            <div className="text-lg font-bold text-[#000000]">
              {quizResults.accuracy}%
            </div>
            <div className="text-[10px] text-[#757575] font-mono-code">
              ({quizResults.correctCount}/{quizResults.totalQuestions} Soal)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f6f5f4] border border-[rgba(0,0,0,0.08)] space-y-1">
            <Flame className="w-5 h-5 text-[#e89d01] mx-auto" />
            <div className="text-xs text-[#615d59]">Max Combo</div>
            <div className="text-lg font-bold text-[#e89d01]">
              {quizResults.maxCombo}x Streak 🔥
            </div>
            <div className="text-[10px] text-[#757575] font-mono-code">Multiplier Bonus</div>
          </div>

          <div className="p-4 rounded-xl bg-[#f6f5f4] border border-[rgba(0,0,0,0.08)] space-y-1">
            <Clock className="w-5 h-5 text-[#0075de] mx-auto" />
            <div className="text-xs text-[#615d59]">Waktu Baca</div>
            <div className="text-lg font-bold text-[#000000]">
              {formatReadingTime(readingSeconds)}
            </div>
            <div className="text-[10px] text-[#757575] font-mono-code">Speed Record</div>
          </div>

          <div className="p-4 rounded-xl bg-[#f6f5f4] border border-[rgba(0,0,0,0.08)] space-y-1">
            <CheckCircle2 className="w-5 h-5 text-[#0075de] mx-auto" />
            <div className="text-xs text-[#615d59]">Status Misi</div>
            <div className="text-lg font-bold text-[#0075de]">
              PASSED
            </div>
            <div className="text-[10px] text-[#757575] font-mono-code">Verified API</div>
          </div>

        </div>

        {/* BADGE UNLOCKED SECTION */}
        {quest.badgeReward && (
          <div className="rounded-xl bg-[#f6f5f4] p-4 border border-[rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 rounded-lg bg-white border border-[rgba(0,0,0,0.08)]">
                {quest.badgeReward.icon}
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0075de]">
                  <Sparkles className="w-3.5 h-3.5" /> BADGE BARU DIBUKA!
                </div>
                <div className="text-sm font-bold text-[#000000]">
                  {quest.badgeReward.title}
                </div>
                <div className="text-xs text-[#615d59]">
                  {quest.badgeReward.description}
                </div>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#0075de] text-white text-xs font-semibold">
              UNLOCKED 🔓
            </span>
          </div>
        )}

        {/* KANTIN VOUCHER REWARD MESSAGE */}
        <div className="rounded-xl bg-[#fff9e6] border border-[#ffb110]/40 p-4 text-left flex items-start gap-3">
          <Coffee className="w-5 h-5 text-[#e89d01] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="text-[#000000] font-bold text-sm">
              Status Reward Nasi Ayam Laos Pak Yoyok 🍗
            </div>
            <p className="text-[#615d59]">
              {nextCanteenThreshold <= 0 ? (
                <span>🎉 Selamat! Poin XP kamu sudah cukup untuk tukar <strong>{canteenReward.title}</strong>!</span>
              ) : (
                <span>Kamu mendapatkan <strong>+{totalAwardedXp} XP</strong>! Kumpulkan <strong>{nextCanteenThreshold} XP lagi</strong> untuk menukarkan Voucher Nasi Ayam Laos Pak Yoyok Gratis di Kantin Kampus!</span>
              )}
            </p>
          </div>
        </div>

      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={() => {
            sound.playClick();
            onReviewAnswers();
          }}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[#f6f5f4] text-[#000000] font-semibold text-xs flex items-center justify-center gap-2 border border-[rgba(0,0,0,0.12)] transition-colors"
        >
          <RotateCcw className="w-4 h-4 text-[#0075de]" />
          Review Jawaban Kuis
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onReturnLobby();
          }}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white font-semibold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
        >
          <Home className="w-4 h-4" />
          KEMBALI KE LOBBY
        </button>
      </div>

    </div>
  );
};
