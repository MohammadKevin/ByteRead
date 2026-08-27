import { HabitStreak, StreakDayRecord } from '../types';

export function getTodayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getYesterdayIsoDate(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0');
  const day = String(yesterday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates updated streak when a user finishes reading a book or completing a session today.
 */
export function recordDailyReadingActivity(
  currentStreakState: HabitStreak,
  xpEarned: number
): { updatedStreak: HabitStreak; streakIncreased: boolean; isNewDay: boolean } {
  const today = getTodayIsoDate();
  const yesterday = getYesterdayIsoDate();

  let streak = currentStreakState.currentStreak || 0;
  let longest = currentStreakState.longestStreak || 0;
  let isNewDay = false;
  let streakIncreased = false;
  let freezeCount = currentStreakState.freezeCountAvailable ?? 1;
  let isFreezeActive = false;

  const history: StreakDayRecord[] = [...(currentStreakState.streakHistory || [])];
  const todayEntryIndex = history.findIndex(h => h.date === today);

  if (currentStreakState.lastReadDate === today) {
    // Already read today, just add to today's history stats
    if (todayEntryIndex >= 0) {
      history[todayEntryIndex] = {
        ...history[todayEntryIndex],
        booksCompleted: history[todayEntryIndex].booksCompleted + 1,
        xpEarned: history[todayEntryIndex].xpEarned + xpEarned
      };
    } else {
      history.push({ date: today, booksCompleted: 1, xpEarned });
    }
  } else {
    // New day read!
    isNewDay = true;
    if (currentStreakState.lastReadDate === yesterday) {
      // Consecutive streak!
      streak += 1;
      streakIncreased = true;
    } else if (!currentStreakState.lastReadDate) {
      // First time reading
      streak = 1;
      streakIncreased = true;
    } else {
      // Gap detected (missed more than 1 day)
      if (freezeCount > 0 && currentStreakState.isFreezeActive) {
        // Protected by streak freeze!
        freezeCount -= 1;
        isFreezeActive = false;
        streak += 1;
        streakIncreased = true;
      } else {
        // Reset streak to 1
        streak = 1;
        streakIncreased = true;
      }
    }

    if (streak > longest) {
      longest = streak;
    }

    if (todayEntryIndex >= 0) {
      history[todayEntryIndex] = {
        ...history[todayEntryIndex],
        booksCompleted: history[todayEntryIndex].booksCompleted + 1,
        xpEarned: history[todayEntryIndex].xpEarned + xpEarned
      };
    } else {
      history.push({ date: today, booksCompleted: 1, xpEarned });
    }
  }

  // Keep last 30 days history
  const trimmedHistory = history.slice(-30);

  const updatedStreak: HabitStreak = {
    currentStreak: streak,
    longestStreak: longest,
    lastReadDate: today,
    streakHistory: trimmedHistory,
    isFreezeActive,
    freezeCountAvailable: freezeCount
  };

  return { updatedStreak, streakIncreased, isNewDay };
}

/**
 * Returns streak bonus multiplier percentage
 */
export function getStreakMultiplier(streakDays: number): number {
  if (streakDays >= 7) return 30; // +30% XP
  if (streakDays >= 5) return 20; // +20% XP
  if (streakDays >= 3) return 10; // +10% XP
  return 0;
}

/**
 * Generates last 14 days calendar status for the habit tracker visualization
 */
export function getLast14DaysHistory(history: StreakDayRecord[] = []): { dateStr: string; dayLabel: string; active: boolean; xp: number }[] {
  const result = [];
  const now = new Date();

  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const dayLabel = d.toLocaleDateString('id-ID', { weekday: 'short' });

    const matched = history.find(h => h.date === dateStr);
    result.push({
      dateStr,
      dayLabel,
      active: !!matched && matched.booksCompleted > 0,
      xp: matched?.xpEarned || 0
    });
  }

  return result;
}
