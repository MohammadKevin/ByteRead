import { UserProfile } from '../types';
import { INITIAL_BADGES } from '../data/badges';
import { getTodayIsoDate } from './streakEngine';

const USER_STORAGE_KEY = 'byteread_user_v3';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'user-genz-01',
  name: 'Alex Reader',
  username: '@alex_reads',
  avatarSeed: 42,
  level: 3,
  levelTitle: 'Level 3: Byte Synthesizer ⚡',
  xp: 380,
  xpToNextLevel: 650,
  streak: {
    currentStreak: 3,
    longestStreak: 5,
    lastReadDate: getTodayIsoDate(),
    streakHistory: [
      { date: getTodayIsoDate(), booksCompleted: 1, xpEarned: 120 }
    ],
    isFreezeActive: false,
    freezeCountAvailable: 1
  },
  completedBookIds: ['book-atomic-habits'],
  inProgressBookIds: ['book-psychology-of-money'],
  bookmarkedBookIds: ['book-deep-work', 'book-show-your-work'],
  savedQuotes: [
    {
      id: 'quote-sample-1',
      bookId: 'book-atomic-habits',
      bookTitle: 'Atomic Habits',
      author: 'James Clear',
      quote: 'You do not rise to the level of your goals. You fall to the level of your systems.',
      themeStyle: 'FRESH_BLUE',
      savedAt: 'Hari ini'
    }
  ],
  badges: INITIAL_BADGES,
  totalMinutesRead: 9,
  totalHoursSaved: 6.5, // 6.5 jam dihemat dari Atomic Habits!
  quizAccuracyAverage: 90
};

export const StorageService = {
  loadUserProfile(): UserProfile {
    try {
      const raw = localStorage.getItem(USER_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...INITIAL_USER_PROFILE,
          ...parsed,
          streak: {
            ...INITIAL_USER_PROFILE.streak,
            ...(parsed.streak || {})
          }
        };
      }
    } catch (e) {
      console.warn('Failed to load user profile from storage', e);
    }
    return INITIAL_USER_PROFILE;
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save user profile to storage', e);
    }
  },

  resetUserProfile(): UserProfile {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // ignore
    }
    return INITIAL_USER_PROFILE;
  }
};
