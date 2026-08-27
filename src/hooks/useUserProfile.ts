import { useState, useEffect, useCallback } from 'react';
import { UserProfile, QuoteSnapshot, BadgeAchievement, LevelInfo } from '../types';
import { StorageService, INITIAL_USER_PROFILE } from '../services/storageService';
import { recordDailyReadingActivity } from '../services/streakEngine';
import { getLevelInfo } from '../data/levels';
import { sound } from '../services/audioService';
import { apiService } from '../services/apiService';

export function useUserProfile() {
  const [user, setUser] = useState<UserProfile>(() => StorageService.loadUserProfile());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [newLevelUnlocked, setNewLevelUnlocked] = useState<LevelInfo | null>(null);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<BadgeAchievement | null>(null);

  // Sync with Backend on Mount
  useEffect(() => {
    async function initUser() {
      try {
        const remoteUser = await apiService.getMe();
        if (remoteUser) {
          setUser(prev => ({
            ...prev,
            ...remoteUser
          }));
        }
      } catch (e) {
        console.warn('Backend sync on mount failed, using local store:', e);
      }
    }
    initUser();
  }, []);

  // Sync changes to storage & backend
  useEffect(() => {
    apiService.syncUserProfile(user);
  }, [user]);

  const isNightTime = () => {
    const hour = new Date().getHours();
    return hour >= 22 || hour < 4;
  };

  /**
   * Evaluates badge unlock triggers
   */
  const evaluateBadges = useCallback((
    currentUser: UserProfile, 
    extraContext?: { perfectQuiz?: boolean; speedRead?: boolean }
  ): { updatedBadges: BadgeAchievement[]; newlyUnlocked: BadgeAchievement | null } => {
    let newlyUnlocked: BadgeAchievement | null = null;

    const updatedBadges = currentUser.badges.map((badge) => {
      if (badge.unlocked) return badge;

      let shouldUnlock = false;
      let progress = badge.progressCurrent || 0;

      switch (badge.id) {
        case 'badge-first-bite':
          if (currentUser.completedBookIds.length >= 1) shouldUnlock = true;
          break;

        case 'badge-night-reader':
          if (isNightTime()) {
            shouldUnlock = true;
            progress = 1;
          }
          break;

        case 'badge-3day-streak':
          progress = currentUser.streak.currentStreak;
          if (currentUser.streak.currentStreak >= 3) shouldUnlock = true;
          break;

        case 'badge-7day-streak':
          progress = currentUser.streak.currentStreak;
          if (currentUser.streak.currentStreak >= 7) shouldUnlock = true;
          break;

        case 'badge-quiz-prodigy':
          if (extraContext?.perfectQuiz) {
            shouldUnlock = true;
            progress = 1;
          }
          break;

        case 'badge-speed-demon':
          if (extraContext?.speedRead) {
            shouldUnlock = true;
            progress = 1;
          }
          break;

        case 'badge-quote-curator':
          progress = currentUser.savedQuotes.length;
          if (currentUser.savedQuotes.length >= 3) shouldUnlock = true;
          break;

        case 'badge-polymath':
          progress = currentUser.completedBookIds.length;
          if (currentUser.completedBookIds.length >= 3) shouldUnlock = true;
          break;
      }

      if (shouldUnlock) {
        newlyUnlocked = {
          ...badge,
          unlocked: true,
          unlockedAt: 'Hari Ini',
          progressCurrent: badge.progressTarget || 1
        };
        return newlyUnlocked;
      }

      return { ...badge, progressCurrent: progress };
    });

    return { updatedBadges, newlyUnlocked };
  }, []);

  /**
   * Adds XP, calculates Level-Up, updates streak, time saved, and checks badges.
   */
  const handleSessionCompletion = useCallback((
    bookId: string,
    readingSeconds: number,
    earnedXp: number,
    quizAccuracy: number,
    hoursSaved: number = 5.0
  ) => {
    setUser((prevUser) => {
      const newTotalXp = prevUser.xp + earnedXp;
      const { currentLevel } = getLevelInfo(newTotalXp);

      if (currentLevel.level > prevUser.level) {
        setNewLevelUnlocked(currentLevel);
        sound.playLevelUp();
      }

      const { updatedStreak } = recordDailyReadingActivity(prevUser.streak, earnedXp);

      const isFirstTimeCompleted = !prevUser.completedBookIds.includes(bookId);
      const updatedCompleted = isFirstTimeCompleted
        ? [...prevUser.completedBookIds, bookId]
        : prevUser.completedBookIds;

      const updatedInProgress = prevUser.inProgressBookIds.filter(id => id !== bookId);

      const totalMinutes = prevUser.totalMinutesRead + Math.max(1, Math.round(readingSeconds / 60));
      const totalHoursSaved = isFirstTimeCompleted 
        ? Math.round((prevUser.totalHoursSaved + hoursSaved) * 10) / 10 
        : prevUser.totalHoursSaved;

      const newAccuracyAvg = prevUser.quizAccuracyAverage 
        ? Math.round((prevUser.quizAccuracyAverage + quizAccuracy) / 2) 
        : quizAccuracy;

      const updatedUser: UserProfile = {
        ...prevUser,
        xp: newTotalXp,
        level: currentLevel.level,
        levelTitle: currentLevel.title,
        streak: updatedStreak,
        completedBookIds: updatedCompleted,
        inProgressBookIds: updatedInProgress,
        totalMinutesRead: totalMinutes,
        totalHoursSaved,
        quizAccuracyAverage: newAccuracyAvg
      };

      const { updatedBadges, newlyUnlocked } = evaluateBadges(updatedUser, {
        perfectQuiz: quizAccuracy === 100,
        speedRead: readingSeconds > 0 && readingSeconds <= 180
      });

      if (newlyUnlocked) {
        setNewBadgeUnlocked(newlyUnlocked);
      }

      return {
        ...updatedUser,
        badges: updatedBadges
      };
    });
  }, [evaluateBadges]);

  const toggleBookmark = useCallback((bookId: string) => {
    sound.playBookmark();
    setUser((prev) => {
      const exists = prev.bookmarkedBookIds.includes(bookId);
      const updated = exists
        ? prev.bookmarkedBookIds.filter(id => id !== bookId)
        : [...prev.bookmarkedBookIds, bookId];
      return { ...prev, bookmarkedBookIds: updated };
    });
  }, []);

  const saveQuoteSnapshot = useCallback((quote: Omit<QuoteSnapshot, 'id' | 'savedAt'>) => {
    sound.playCorrect();
    const newQuote: QuoteSnapshot = {
      ...quote,
      id: `quote-${Date.now()}`,
      savedAt: 'Hari ini'
    };

    setUser((prev) => {
      const updatedQuotes = [newQuote, ...prev.savedQuotes];
      const updatedUser = { ...prev, savedQuotes: updatedQuotes };
      const { updatedBadges, newlyUnlocked } = evaluateBadges(updatedUser);

      if (newlyUnlocked) {
        setNewBadgeUnlocked(newlyUnlocked);
      }

      return { ...updatedUser, badges: updatedBadges };
    });
  }, [evaluateBadges]);

  const deleteQuoteSnapshot = useCallback((quoteId: string) => {
    sound.playClick();
    setUser((prev) => ({
      ...prev,
      savedQuotes: prev.savedQuotes.filter(q => q.id !== quoteId)
    }));
  }, []);

  const loginUser = (newUser: UserProfile) => {
    setUser(newUser);
  };

  const logoutUser = () => {
    sound.playClick();
    apiService.logout();
    StorageService.resetUserProfile();
    setUser(INITIAL_USER_PROFILE);
  };

  const clearLevelUpModal = () => setNewLevelUnlocked(null);
  const clearBadgeToast = () => setNewBadgeUnlocked(null);

  return {
    user,
    setUser,
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginUser,
    logoutUser,
    handleSessionCompletion,
    toggleBookmark,
    saveQuoteSnapshot,
    deleteQuoteSnapshot,
    newLevelUnlocked,
    clearLevelUpModal,
    newBadgeUnlocked,
    clearBadgeToast
  };
}
