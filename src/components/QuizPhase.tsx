import React, { useState, useEffect } from 'react';
import { Quest, QuizQuestion } from '../types';
import { sound } from '../services/audio';
import { 
  Flame, 
  Clock, 
  Zap, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Sparkles
} from 'lucide-react';

interface QuizPhaseProps {
  quest: Quest;
  onFinishQuiz: (results: {
    score: number;
    accuracy: number;
    correctCount: number;
    totalQuestions: number;
    maxCombo: number;
    userAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[];
  }) => void;
}

const QUESTION_TIMEOUT_SEC = 15;

export const QuizPhase: React.FC<QuizPhaseProps> = ({
  quest,
  onFinishQuiz
}) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIMEOUT_SEC);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showMemeModal, setShowMemeModal] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const [userAnswersHistory, setUserAnswersHistory] = useState<{
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[]>([]);

  const currentQuestion: QuizQuestion = quest.questions[currentQIndex];
  const totalQuestions = quest.questions.length;

  useEffect(() => {
    if (isAnswered || showMemeModal) return;

    if (timeLeft <= 0) {
      handleAnswerSelect(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, showMemeModal]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    let newCombo = combo;
    let earnedXp = 0;

    if (isCorrect) {
      sound.playCorrect();
      newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const speedBonus = timeLeft * 4;
      const multiplier = newCombo >= 3 ? 2 : newCombo >= 2 ? 1.5 : 1;
      earnedXp = Math.round((40 + speedBonus) * multiplier);
      setTotalScore((prev) => prev + earnedXp);
    } else {
      sound.playWrong();
      setCombo(0);
    }

    setUserAnswersHistory((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: optionIndex,
        isCorrect
      }
    ]);

    setTimeout(() => {
      setShowMemeModal(true);
    }, 300);
  };

  const handleAdvanceNextQuestion = () => {
    sound.playClick();
    setShowMemeModal(false);
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setTimeLeft(QUESTION_TIMEOUT_SEC);
    } else {
      const correctCount = userAnswersHistory.filter((a) => a.isCorrect).length + (isAnswerCorrect ? 1 : 0);
      const accuracy = Math.round((correctCount / totalQuestions) * 100);

      onFinishQuiz({
        score: totalScore,
        accuracy,
        correctCount,
        totalQuestions,
        maxCombo: Math.max(maxCombo, combo),
        userAnswers: [
          ...userAnswersHistory,
          {
            questionId: currentQuestion.id,
            selectedOption: selectedOption ?? -1,
            isCorrect: isAnswerCorrect
          }
        ]
      });
    }
  };

  const timerPercentage = Math.round((timeLeft / QUESTION_TIMEOUT_SEC) * 100);
  const activeMeme = isAnswerCorrect ? currentQuestion.memeCorrect : currentQuestion.memeWrong;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 text-[#000000]">
      
      {/* STEPPER FLOW INDICATOR */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[rgba(0,0,0,0.08)] text-xs">
        <div className="flex items-center gap-2 text-[#757575] font-medium">
          <span>✔ Step 1: Baca Material</span>
        </div>

        <div className="flex items-center gap-2.5 text-[#0075de] font-semibold">
          <span className="w-6 h-6 rounded-full bg-[#0075de] text-white font-bold flex items-center justify-center text-xs">
            2
          </span>
          <span>FASE 2: BOSS FIGHT KUIS (FUN QUIZ)</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[#757575] font-medium">
          <span>➔ Step 3: Rewards & Rank</span>
        </div>
      </div>

      {/* GAME HEADS-UP DISPLAY (HUD BAR) */}
      <div className="bg-white p-6 rounded-2xl border border-[rgba(0,0,0,0.08)] space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          
          {/* Question Index */}
          <div className="text-xs font-semibold text-[#000000] flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#e6f3fe] text-[#0075de] font-mono-code font-bold">
              SOAL {currentQIndex + 1}/{totalQuestions}
            </span>
            <span className="hidden sm:inline text-[#615d59]">
              Quest: {quest.title}
            </span>
          </div>

          {/* Combo Multiplier Meter */}
          <div className="flex items-center gap-3">
            {combo > 1 && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffb110] text-[#000000] font-bold text-xs shadow-sm">
                <Flame className="w-4 h-4 fill-[#000000]" />
                COMBO {combo}x 🔥
              </div>
            )}

            {/* Live Score */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e6f3fe] text-[#0075de] font-mono-code text-xs font-bold border border-[#0075de]/20">
              <Zap className="w-3.5 h-3.5 fill-[#0075de]" />
              {totalScore} XP
            </div>
          </div>

        </div>

        {/* Live Timer Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-[#615d59] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#e89d01]" /> Sisa Waktu Soal Ini
            </span>
            <span className={`font-mono-code font-bold ${timeLeft <= 5 ? 'text-[#f64932] animate-pulse' : 'text-[#e89d01]'}`}>
              ⏱️ {timeLeft}s
            </span>
          </div>

          <div className="w-full bg-[#f6f5f4] h-2.5 rounded-full overflow-hidden border border-[rgba(0,0,0,0.08)]">
            <div 
              className={`h-full transition-all duration-1000 ${
                timeLeft > 8 
                  ? 'bg-[#0075de]'
                  : timeLeft > 4
                  ? 'bg-[#ffb110]'
                  : 'bg-[#f64932]'
              }`}
              style={{ width: `${timerPercentage}%` }}
            />
          </div>
        </div>

      </div>

      {/* QUESTION CARD */}
      <div className="rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#e6f3fe] text-[#0075de] shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg md:text-xl font-bold text-[#000000] leading-relaxed pt-1">
            {currentQuestion.question}
          </h2>
        </div>

        {/* OPTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {currentQuestion.options.map((optionText, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === idx;

            return (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                disabled={isAnswered}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-3.5 ${
                  isSelected
                    ? isAnswerCorrect
                      ? 'bg-[#e6f3fe] border-[#0075de] text-[#000000] font-semibold'
                      : 'bg-[#f64932]/10 border-[#f64932] text-[#000000] font-semibold'
                    : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[#0075de] hover:bg-[#e6f3fe]/30 text-[#000000]'
                } ${isAnswered ? 'cursor-not-allowed opacity-80' : 'hover:scale-[1.01]'}`}
              >
                <span className="w-7 h-7 rounded-lg bg-[#f6f5f4] border border-[rgba(0,0,0,0.08)] flex items-center justify-center text-xs font-mono-code font-bold shrink-0 text-[#0075de]">
                  {letter}
                </span>

                <span className="text-sm pt-0.5 flex-1 leading-snug">
                  {optionText}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* POP-UP OVERLAY (FEEDBACK MEME MODAL) */}
      {showMemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div 
            className={`relative w-full max-w-lg rounded-2xl border p-6 md:p-8 space-y-5 bg-white text-center shadow-xl ${
              isAnswerCorrect 
                ? 'border-[#0075de]' 
                : 'border-[#f64932]'
            }`}
          >
            {/* Header Status */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                {isAnswerCorrect ? (
                  <CheckCircle2 className="w-7 h-7 text-[#0075de]" />
                ) : (
                  <XCircle className="w-7 h-7 text-[#f64932]" />
                )}
                <h3 className={`text-lg font-bold ${isAnswerCorrect ? 'text-[#0075de]' : 'text-[#f64932]'}`}>
                  {activeMeme.title}
                </h3>
              </div>
              <p className="text-xs text-[#615d59]">
                {isAnswerCorrect ? '🎉 Jawaban Tepat! Poin XP ditambahkan!' : '💥 Jawaban Kurang Tepat! Simak penjelasannya di bawah!'}
              </p>
            </div>

            {/* Meme Image Container */}
            <div className="relative rounded-xl overflow-hidden border border-[rgba(0,0,0,0.08)] bg-black aspect-video max-h-56 mx-auto flex items-center justify-center">
              <img 
                src={activeMeme.imageUrl} 
                alt="Meme Feedback"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = isAnswerCorrect
                    ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3FvY3AwNmQ2bzEzNmFybTRmZ2xjcHN3b3J4am1vMmxydnAzNWJydSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1tvI9svkIWwpVYr/giphy.gif'
                    : 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnZzNTNnbHdsNmU1a2p1Z3NjcWNkOHZudXJjNHRrcXo1M28zazJ6dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d2W7eZX5z62ziqdi/giphy.gif';
                }}
              />
              
              <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm p-2 text-xs font-mono-code text-[#ffb110] border-t border-[rgba(0,0,0,0.08)]">
                {activeMeme.quote}
              </div>
            </div>

            {/* Explanation */}
            <div className="rounded-xl bg-[#f6f5f4] p-4 border border-[rgba(0,0,0,0.08)] text-xs text-[#615d59] text-left space-y-1 leading-relaxed">
              <span className="text-[#0075de] font-bold">Penjelasan:</span>
              <p className="text-[#000000]">
                {currentQuestion.explanation}
              </p>
            </div>

            {/* Advance Button */}
            <button
              onClick={handleAdvanceNextQuestion}
              className={`w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                isAnswerCorrect
                  ? 'bg-[#0075de] hover:bg-[#097fe8] text-white'
                  : 'bg-[#f64932] hover:bg-[#e32d14] text-white'
              }`}
            >
              {currentQIndex < totalQuestions - 1 ? (
                <> Lanjut ke Soal Berikutnya <ArrowRight className="w-4 h-4" /> </>
              ) : (
                <> <Sparkles className="w-4 h-4" /> Lihat Hasil Quest (Finish) 🎉 </>
              )}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
