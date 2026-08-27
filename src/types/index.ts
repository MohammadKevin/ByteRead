export type MoodCategory = 
  | 'BURNOUT'       // "Lagi Burnout / Butuh Recharge"
  | 'FINANCE'       // "Butuh Fokus Finansial"
  | 'HABIT'         // "Mau Bangun Kebiasaan"
  | 'OVERTHINKING'  // "Lagi Overthinking / Stress"
  | 'CREATIVE'      // "Cari Ide Kreatif"
  | 'TECH_CAREER'   // "Strategi Karir & Koding"
  | 'MINDFUL';      // "Mencari Ketenangan & Makna Hidup"

export type ReadDuration = '2_MIN' | '3_MIN' | '5_MIN';

export type BookCategory = 
  | 'Self-Improvement' 
  | 'Psychology' 
  | 'Finance' 
  | 'Productivity' 
  | 'Creativity' 
  | 'Tech & Craftsmanship';

export type VerificationStatus = 'VERIFIED' | 'NEEDS_VERIFICATION';

export type ReadStatusFilter = 'ALL' | 'UNREAD' | 'COMPLETED' | 'BOOKMARKED';

export interface CitationSource {
  publisher: string;           // e.g. "Avery (Penguin Random House)"
  publisherUrl: string;        // Official link penerbit / Google Books / Goodreads
  goodreadsUrl?: string;
  verifiedIsbn10?: string;     // e.g. "0735211299"
  verifiedIsbn13: string;      // e.g. "978-0735211292"
  originalPublishYear: number; // e.g. 2018
  chapterReference: string;    // e.g. "Bab 1: The Surprising Power of Atomic Habits"
  citationApa: string;         // Format APA resmi 7th edition
  sourceVerificationNote?: string; // Catatan jika sumber perlu verifikasi
}

export interface BookSlide {
  id: number;
  slideNumber: number;
  chapterTitle: string;
  hookHeadline: string;        // Hook lugas 1 baris
  biteContent: string;         // Ringkasan padat (< 60 kata)
  bulletTakeaways: string[];   // 2-3 poin aplikatif
  realWorldAnalogy: string;    // Analogi konkret relatable
  quotableSentence: string;    // Kutipan asli buku
  estimatedReadSec: number;
}

export interface MicroQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  chapterSourceRef: string;    // Rujukan bab untuk memvalidasi jawaban
  xpReward: number;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  originalTitle: string;
  author: string;
  authorBio: string;
  coverImage: string;
  rating: number;              // e.g. 4.8
  ratingsCount: string;        // e.g. "2.1M+ pembaca"
  category: BookCategory;
  moodTags: MoodCategory[];
  readDuration: ReadDuration;
  estimatedMinutes: number;
  totalSlides: number;
  baseXp: number;
  oneSentenceSummary: string;  // Intisari 1 kalimat
  quickTakeaways: string[];    // 3 poin kilat untuk mode "Baca Cepat 30 Detik"
  actionableStep: string;      // 1 langkah konkret yang bisa langsung dipraktikkan hari ini
  timeSavedHours: number;      // Estimasi jam membaca yang dihemat (e.g. 6 jam)
  verificationStatus: VerificationStatus;
  citation: CitationSource;
  slides: BookSlide[];
  microQuiz: MicroQuizQuestion[];
}

export interface StreakDayRecord {
  date: string;                // YYYY-MM-DD
  booksCompleted: number;
  xpEarned: number;
}

export interface HabitStreak {
  currentStreak: number;
  longestStreak: number;
  lastReadDate: string;        // YYYY-MM-DD
  streakHistory: StreakDayRecord[];
  isFreezeActive: boolean;
  freezeCountAvailable: number;
}

export type BadgeCategory = 'STREAK' | 'MASTERY' | 'SPEED' | 'COMMUNITY' | 'EXPLORER';

export interface BadgeAchievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: BadgeCategory;
  unlocked: boolean;
  unlockedAt?: string;
  progressCurrent?: number;
  progressTarget?: number;
}

export type QuoteThemeStyle = 
  | 'FRESH_BLUE' 
  | 'MINT_CLEAN' 
  | 'CYBER_CYAN' 
  | 'OBSIDIAN_MINIMAL' 
  | 'WARM_SLATE';

export interface QuoteSnapshot {
  id: string;
  bookId: string;
  bookTitle: string;
  author: string;
  quote: string;
  themeStyle: QuoteThemeStyle;
  savedAt: string;
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  perks: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatarSeed: number;
  level: number;
  levelTitle: string;
  xp: number;
  xpToNextLevel: number;
  streak: HabitStreak;
  completedBookIds: string[];
  inProgressBookIds: string[];
  bookmarkedBookIds: string[];
  savedQuotes: QuoteSnapshot[];
  badges: BadgeAchievement[];
  totalMinutesRead: number;
  totalHoursSaved: number;
  quizAccuracyAverage: number;
}

export interface FilterState {
  searchQuery: string;
  selectedMood: MoodCategory | 'ALL';
  selectedDuration: ReadDuration | 'ALL';
  selectedCategory: BookCategory | 'ALL';
  selectedStatus: ReadStatusFilter;
  displayMode: 'SCAN_QUICK' | 'GRID_CARDS';
}

export interface QuizSessionResult {
  bookId: string;
  bookTitle: string;
  score: number;
  totalXpEarned: number;
  correctCount: number;
  totalQuestions: number;
  accuracy: number;
  maxCombo: number;
  readingSeconds: number;
  userAnswers: {
    questionId: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
}
