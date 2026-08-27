/**
 * Production-ready Backend Domain Services & Logic for ByteRead.
 * Can be deployed directly to Node.js / Next.js API routes / Express / NestJS.
 */
import { Book, MicroQuizQuestion, MoodCategory, ReadDuration, UserProfile } from '../types';
import { VERIFIED_BOOKS } from '../data/verifiedBooks';
import { LEVEL_TIERS, getLevelInfo } from '../data/levels';

// ==========================================
// 1. STREAK ENGINE (TIMEZONE-AWARE)
// ==========================================
export interface StreakEvaluationResult {
  newStreak: number;
  streakStatus: 'INCREMENTED' | 'MAINTAINED' | 'PROTECTED_BY_FREEZE' | 'RESET';
  freezesRemaining: number;
  streakMultiplierPercent: number;
  message: string;
}

export class StreakService {
  /**
   * Calculates calendar day difference based on user's timezone offset
   */
  public static getCalendarDateString(date: Date = new Date(), timezoneOffsetMinutes: number = 0): string {
    const localTime = new Date(date.getTime() - timezoneOffsetMinutes * 60 * 1000);
    return localTime.toISOString().split('T')[0];
  }

  public static getDayDifference(dateStrA: string, dateStrB: string): number {
    const dateA = new Date(dateStrA);
    const dateB = new Date(dateStrB);
    const diffTime = Math.abs(dateB.getTime() - dateA.getTime());
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Core Streak Logic: Evaluates user activity for today
   */
  public static evaluateDailyStreak(
    currentStreak: number,
    lastReadDateStr: string | null,
    freezesAvailable: number,
    timezoneOffsetMinutes: number = 0
  ): StreakEvaluationResult {
    const todayStr = this.getCalendarDateString(new Date(), timezoneOffsetMinutes);

    // If no previous read date, start streak with 1
    if (!lastReadDateStr) {
      return {
        newStreak: 1,
        streakStatus: 'INCREMENTED',
        freezesRemaining: freezesAvailable,
        streakMultiplierPercent: 0,
        message: 'Streak perdanamu dimulai! Pertahankan besok ya! 🔥'
      };
    }

    // If already read today
    if (lastReadDateStr === todayStr) {
      return {
        newStreak: currentStreak,
        streakStatus: 'MAINTAINED',
        freezesRemaining: freezesAvailable,
        streakMultiplierPercent: this.getStreakMultiplier(currentStreak),
        message: 'Kamu sudah aktif membaca hari ini! Streak tetap aman. ⚡'
      };
    }

    const dayDiff = this.getDayDifference(lastReadDateStr, todayStr);

    // Read on consecutive day (yesterday)
    if (dayDiff === 1) {
      const nextStreak = currentStreak + 1;
      return {
        newStreak: nextStreak,
        streakStatus: 'INCREMENTED',
        freezesRemaining: freezesAvailable,
        streakMultiplierPercent: this.getStreakMultiplier(nextStreak),
        message: `Streak bertambah! ${nextStreak} hari konsisten membaca! 🔥`
      };
    }

    // Missed 1 or more days: Check Streak Freeze
    if (freezesAvailable > 0) {
      const protectedStreak = currentStreak + 1;
      return {
        newStreak: protectedStreak,
        streakStatus: 'PROTECTED_BY_FREEZE',
        freezesRemaining: freezesAvailable - 1,
        streakMultiplierPercent: this.getStreakMultiplier(protectedStreak),
        message: 'Streak Freeze terpakai otomatis! Streak-mu selamat dari reset. ❄️🛡️'
      };
    }

    // Streak Reset
    return {
      newStreak: 1,
      streakStatus: 'RESET',
      freezesRemaining: freezesAvailable,
      streakMultiplierPercent: 0,
      message: 'Streak ter-reset karena terlewat > 1 hari. Mulai lembaran baru hari ini! 🚀'
    };
  }

  public static getStreakMultiplier(streakDays: number): number {
    if (streakDays >= 7) return 30; // +30% bonus XP
    if (streakDays >= 5) return 20; // +20% bonus XP
    if (streakDays >= 3) return 10; // +10% bonus XP
    return 0;
  }
}

// ==========================================
// 2. XP & LEVELING SERVICE
// ==========================================
export interface XpCalculationResult {
  baseBookXp: number;
  quizScoreXp: number;
  speedBonusXp: number;
  streakBonusXp: number;
  totalXpAwarded: number;
  oldLevel: number;
  newLevel: number;
  isLevelUp: boolean;
  newLevelTitle: string;
}

export class XpLevelService {
  public static calculateSessionXp(
    bookBaseXp: number,
    correctAnswersCount: number,
    totalQuestions: number,
    readingSeconds: number,
    estimatedMinutes: number,
    currentStreakDays: number,
    currentUserXp: number
  ): XpCalculationResult {
    // 1. Base slide completion XP
    const baseBookXp = bookBaseXp;

    // 2. Quiz Score (40 XP per correct answer)
    const quizScoreXp = correctAnswersCount * 40;

    // 3. Speed & Focus bonus (if finished reasonably under target time without rush penalty)
    let speedBonusXp = 0;
    const targetSeconds = estimatedMinutes * 60;
    if (readingSeconds >= 45 && readingSeconds <= targetSeconds) {
      speedBonusXp = 25; // Good focused read bonus
    }

    // 4. Streak Multiplier
    const multiplierPercent = StreakService.getStreakMultiplier(currentStreakDays);
    const subtotal = baseBookXp + quizScoreXp + speedBonusXp;
    const streakBonusXp = Math.round((subtotal * multiplierPercent) / 100);

    const totalXpAwarded = subtotal + streakBonusXp;
    const newTotalXp = currentUserXp + totalXpAwarded;

    const oldLevelInfo = getLevelInfo(currentUserXp);
    const newLevelInfo = getLevelInfo(newTotalXp);

    const isLevelUp = newLevelInfo.currentLevel.level > oldLevelInfo.currentLevel.level;

    return {
      baseBookXp,
      quizScoreXp,
      speedBonusXp,
      streakBonusXp,
      totalXpAwarded,
      oldLevel: oldLevelInfo.currentLevel.level,
      newLevel: newLevelInfo.currentLevel.level,
      isLevelUp,
      newLevelTitle: newLevelInfo.currentLevel.title
    };
  }
}

// ==========================================
// 3. INTERACTIVE MICRO-QUIZ VALIDATOR
// ==========================================
export interface QuizSubmissionValidation {
  totalQuestions: number;
  correctCount: number;
  accuracyPercentage: number;
  earnedXp: number;
  maxCombo: number;
  feedbackDetails: {
    questionId: number;
    isCorrect: boolean;
    explanation: string;
    chapterSourceRef: string;
  }[];
}

export class QuizValidatorService {
  public static validateSubmission(
    book: Book,
    answers: { questionId: number; selectedOptionIndex: number }[]
  ): QuizSubmissionValidation {
    let correctCount = 0;
    let currentCombo = 0;
    let maxCombo = 0;
    let earnedXp = 0;

    const feedbackDetails = answers.map((answer) => {
      const question = book.microQuiz.find((q) => q.id === answer.questionId);
      if (!question) {
        return {
          questionId: answer.questionId,
          isCorrect: false,
          explanation: 'Pertanyaan tidak ditemukan.',
          chapterSourceRef: '-'
        };
      }

      const isCorrect = answer.selectedOptionIndex === question.correctAnswerIndex;
      if (isCorrect) {
        correctCount += 1;
        currentCombo += 1;
        if (currentCombo > maxCombo) maxCombo = currentCombo;

        const comboMultiplier = currentCombo >= 3 ? 2.0 : currentCombo >= 2 ? 1.5 : 1.0;
        earnedXp += Math.round(question.xpReward * comboMultiplier);
      } else {
        currentCombo = 0;
      }

      return {
        questionId: question.id,
        isCorrect,
        explanation: question.explanation,
        chapterSourceRef: question.chapterSourceRef
      };
    });

    const totalQuestions = book.microQuiz.length;
    const accuracyPercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    return {
      totalQuestions,
      correctCount,
      accuracyPercentage,
      earnedXp,
      maxCombo,
      feedbackDetails
    };
  }
}

// ==========================================
// 4. RECOMMENDATION & DISCOVERY SERVICE
// ==========================================
export class RecommendationService {
  public static getBooksByMoodAndDuration(
    mood?: MoodCategory | 'ALL',
    duration?: ReadDuration | 'ALL',
    userCompletedIds: string[] = []
  ): Book[] {
    return VERIFIED_BOOKS.filter((book) => {
      if (mood && mood !== 'ALL') {
        if (!book.moodTags.includes(mood)) return false;
      }
      if (duration && duration !== 'ALL') {
        if (book.readDuration !== duration) return false;
      }
      return true;
    }).sort((a, b) => {
      // Prioritize unread books first
      const aRead = userCompletedIds.includes(a.id) ? 1 : 0;
      const bRead = userCompletedIds.includes(b.id) ? 1 : 0;
      return aRead - bRead;
    });
  }

  public static getDailyFeaturedBook(completedIds: string[] = []): Book {
    const unread = VERIFIED_BOOKS.filter((b) => !completedIds.includes(b.id));
    return unread.length > 0 ? unread[0] : VERIFIED_BOOKS[0];
  }
}
