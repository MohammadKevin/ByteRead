import React from 'react';
import { Quest } from '../types';
import { sound } from '../services/audio';
import { X, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface ReviewModalProps {
  quest: Quest;
  userAnswers: { questionId: number; selectedOption: number; isCorrect: boolean }[];
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  quest,
  userAnswers,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm text-[#000000]">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#f6f5f4] px-6 py-4 border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-[#0075de]" />
            <h3 className="text-base font-bold text-[#000000]">
              Review Jawaban - {quest.title}
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-[#e4e2df] text-[#615d59] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {quest.questions.map((q, qIdx) => {
            const answerMeta = userAnswers.find((a) => a.questionId === q.id);
            const isCorrect = answerMeta?.isCorrect ?? false;
            const selectedOpt = answerMeta?.selectedOption ?? -1;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border space-y-3 ${
                  isCorrect 
                    ? 'bg-[#e6f3fe]/40 border-[#0075de]/30' 
                    : 'bg-[#f64932]/5 border-[#f64932]/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-bold text-[#000000] flex items-center gap-2">
                    <span className="text-[#0075de]">Soal {qIdx + 1}:</span> {q.question}
                  </div>
                  {isCorrect ? (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e6f3fe] text-[#0075de] text-xs font-semibold shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f64932]/10 text-[#f64932] text-xs font-semibold shrink-0">
                      <XCircle className="w-3.5 h-3.5" /> Salah
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  {q.options.map((optText, optIdx) => {
                    const isOptionSelected = selectedOpt === optIdx;
                    const isOptionCorrect = q.correctAnswer === optIdx;

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg text-xs flex items-center justify-between border ${
                          isOptionCorrect
                            ? 'bg-[#e6f3fe] border-[#0075de] text-[#0075de] font-semibold'
                            : isOptionSelected
                            ? 'bg-[#f64932]/10 border-[#f64932] text-[#f64932] line-through'
                            : 'bg-white border-[rgba(0,0,0,0.08)] text-[#615d59]'
                        }`}
                      >
                        <span>
                          {String.fromCharCode(65 + optIdx)}. {optText}
                        </span>
                        {isOptionCorrect && (
                          <span className="text-[10px] bg-[#0075de] text-white px-2 py-0.5 rounded-full font-bold">
                            Jawaban Tepat
                          </span>
                        )}
                        {isOptionSelected && !isOptionCorrect && (
                          <span className="text-[10px] bg-[#f64932] text-white px-2 py-0.5 rounded-full font-bold">
                            Pilihanmu
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                <div className="text-xs text-[#615d59] bg-white p-3.5 rounded-lg border border-[rgba(0,0,0,0.08)] leading-relaxed">
                  <strong className="text-[#0075de]">Penjelasan:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-[#f6f5f4] px-6 py-4 border-t border-[rgba(0,0,0,0.08)] flex justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white font-semibold text-xs transition-colors"
          >
            Tutup Review
          </button>
        </div>

      </div>
    </div>
  );
};
