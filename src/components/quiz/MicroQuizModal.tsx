import React, { useState, useEffect } from 'react';
import { Book, MicroQuizQuestion, QuizSessionResult } from '../../types';
import { sound } from '../../services/audioService';
import { 
  Flame, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Home,
  BookOpen
} from 'lucide-react';

interface MicroQuizModalProps {
  book: Book;
  readingSeconds: number;
  onFinishQuiz: (result: QuizSessionResult) => void;
  onExit: () => void;
}

const QUESTION_TIMER_SECONDS = 15;

export const MicroQuizModal: React.FC<MicroQuizModalProps> = ({
  book,
  readingSeconds,
  onFinishQuiz,
  onExit
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIMER_SECONDS);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [combo, setCombo] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  
  const [userAnswers, setUserAnswers] = useState<{
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[]>([]);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [sessionResults, setSessionResults] = useState<QuizSessionResult | null>(null);

  const currentQuestion: MicroQuizQuestion = book.microQuiz[currentQuestionIndex] || book.microQuiz[0];
  const totalQuestions = book.microQuiz.length;

  useEffect(() => {
    if (isAnswered || isCompleted) return;

    if (timeLeft <= 0) {
      handleSelectOption(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isCompleted]);

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOption(optionIndex);

    const isCorrect = optionIndex === currentQuestion.correctAnswerIndex;
    let newCombo = combo;

    if (isCorrect) {
      sound.playCorrect();
      newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);
    } else {
      sound.playWrong();
      setCombo(0);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption: optionIndex,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIMER_SECONDS);
    } else {
      finishSession();
    }
  };

  const finishSession = () => {
    const finalAnswers = userAnswers;
    const correctCount = finalAnswers.filter(a => a.isCorrect).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const quizScore = correctCount * 40;
    const totalXp = book.baseXp + quizScore;

    const result: QuizSessionResult = {
      bookId: book.id,
      bookTitle: book.title,
      score: quizScore,
      totalXpEarned: totalXp,
      correctCount,
      totalQuestions,
      accuracy,
      maxCombo,
      readingSeconds,
      userAnswers: finalAnswers
    };

    setSessionResults(result);
    setIsCompleted(true);
    sound.playVictory();
    onFinishQuiz(result);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
        
        {!isCompleted ? (
          /* ACTIVE QUESTION VIEW */
          <div className="space-y-4">
            
            {/* Question Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-semibold text-blue-700 block">
                  Soal {currentQuestionIndex + 1} dari {totalQuestions}
                </span>
                <span className="text-xs font-bold text-slate-900 font-heading">{book.title}</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                {combo > 1 && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-bold">
                    Combo x{combo} 🔥
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-cyan-800 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-cyan-600" />
                  <span>{timeLeft}s</span>
                </span>
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-1000"
                style={{ width: `${(timeLeft / QUESTION_TIMER_SECONDS) * 100}%` }}
              />
            </div>

            {/* Question Headline */}
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-heading">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-2">
              {currentQuestion.options.map((option, idx) => {
                let optionStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (isAnswered) {
                  if (idx === currentQuestion.correctAnswerIndex) {
                    optionStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                  } else if (idx === selectedOption) {
                    optionStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                  } else {
                    optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors text-xs flex items-start gap-3 shadow-2xs ${optionStyle}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0 mt-0.5 border border-slate-200 text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {isAnswered && idx === currentQuestion.correctAnswerIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && (
                      <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Chapter Citation Explanation */}
            {isAnswered && (
              <div className="space-y-3 pt-2">
                <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  selectedOption === currentQuestion.correctAnswerIndex
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/80 border-rose-200 text-rose-950'
                }`}>
                  <span className="font-bold block text-[11px]">
                    {selectedOption === currentQuestion.correctAnswerIndex ? '✓ Jawaban Tepat (+40 XP)' : '✗ Belum Tepat'}
                  </span>
                  <p className="text-slate-800 leading-relaxed">{currentQuestion.explanation}</p>
                  
                  {/* Verified Source Reference */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center gap-1.5 text-[11px] text-cyan-800 font-mono font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Rujukan: {currentQuestion.chapterSourceRef}</span>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>{currentQuestionIndex < totalQuestions - 1 ? 'Soal Berikutnya' : 'Selesai & Lihat Rekap'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        ) : (
          /* COMPLETION RECAP VIEW */
          <div className="space-y-5 text-center py-2">
            
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl mx-auto font-black shadow-xs">
              ✓
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 font-heading">
                Evaluasi Pemahaman Selesai
              </h3>
              <p className="text-xs text-slate-600">
                Poin kunci dari <em>{book.title}</em> berhasil diserap dengan baik.
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-3 gap-2.5 text-left">
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 block font-mono">Akurasi</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{sessionResults?.accuracy}%</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 block font-mono">Max Combo</span>
                <span className="text-sm font-bold text-amber-700 font-mono">{sessionResults?.maxCombo}x</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                <span className="text-[10px] text-slate-500 block font-mono">XP Diperoleh</span>
                <span className="text-sm font-bold text-emerald-700 font-mono">+{sessionResults?.totalXpEarned}</span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onExit();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Koleksi Buku</span>
            </button>

          </div>
        )}

      </div>

    </div>
  );
};
