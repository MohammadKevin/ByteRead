import React, { useState } from 'react';
import { Book, QuizSessionResult, QuoteSnapshot } from './types';
import { useUserProfile } from './hooks/useUserProfile';
import { useBooks } from './hooks/useBooks';
import { useAudio } from './hooks/useAudio';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { BottomNav, MainNavTab } from './components/layout/BottomNav';
import { MoodFilterBar } from './components/layout/MoodFilterBar';
import { Footer } from './components/layout/Footer';

// Feature Components
import { HeroSection } from './components/hero/HeroSection';
import { StoryDeckFeed } from './components/feed/StoryDeckFeed';
import { BookGrid } from './components/books/BookGrid';
import { CitationModal } from './components/books/CitationModal';
import { ByteDeckReader } from './components/reader/ByteDeckReader';
import { MicroQuizModal } from './components/quiz/MicroQuizModal';
import { QuoteSnapshotModal } from './components/quote/QuoteSnapshotModal';
import { MyLibraryDrawer, LibraryTab } from './components/shelf/MyLibraryDrawer';
import { LevelUpModal } from './components/gamification/LevelUpModal';
import { BadgeUnlockedToast } from './components/gamification/BadgeUnlockedToast';
import { AuthModal } from './components/auth/AuthModal';

export function App() {
  // 1. User state & gamification
  const {
    user,
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
  } = useUserProfile();

  // 2. Books & Discovery state
  const {
    allBooks,
    filteredBooks,
    dailyPick,
    filters,
    setSearchQuery,
    setSelectedMood,
    setSelectedDuration,
    setSelectedCategory,
    setSelectedStatus,
    setDisplayMode,
    resetFilters
  } = useBooks(user.bookmarkedBookIds, user.completedBookIds);

  // 3. Audio state
  const {
    soundFxEnabled,
    ambientEnabled,
    toggleSoundFx,
    toggleAmbient
  } = useAudio();

  // 4. View states
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false);
  const [isQuizMode, setIsQuizMode] = useState<boolean>(false);
  const [readingElapsedSeconds, setReadingElapsedSeconds] = useState<number>(0);
  
  // 5. Modals
  const [showStoryFeed, setShowStoryFeed] = useState<boolean>(false);
  const [citationBook, setCitationBook] = useState<Book | null>(null);
  const [activeQuoteForGenerator, setActiveQuoteForGenerator] = useState<{
    bookTitle: string;
    author: string;
    quote: string;
    bookId?: string;
  } | null>(null);
  const [isLibraryOpen, setIsLibraryOpen] = useState<boolean>(false);
  const [libraryInitialTab, setLibraryInitialTab] = useState<LibraryTab>('STREAK');
  const [bottomNavTab, setBottomNavTab] = useState<MainNavTab>('FEED');

  // --- Handlers ---
  const handleStartReading = (book: Book) => {
    setActiveBook(book);
    setIsReadingMode(true);
    setIsQuizMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuizFromReader = (elapsedSecs: number) => {
    setReadingElapsedSeconds(elapsedSecs);
    setIsReadingMode(false);
    setIsQuizMode(true);
  };

  const handleFinishQuiz = (result: QuizSessionResult) => {
    const book = allBooks.find(b => b.id === result.bookId);
    handleSessionCompletion(
      result.bookId,
      result.readingSeconds,
      result.totalXpEarned,
      result.accuracy,
      book?.timeSavedHours || 5.0
    );
  };

  const handleExitReaderOrQuiz = () => {
    setIsReadingMode(false);
    setIsQuizMode(false);
    setActiveBook(null);
  };

  const handleOpenLibraryWithTab = (tab: LibraryTab = 'SAVED') => {
    setLibraryInitialTab(tab);
    setIsLibraryOpen(true);
  };

  const handleBottomNavSelect = (tab: MainNavTab) => {
    setBottomNavTab(tab);
    if (tab === 'STORY_DECK') {
      setShowStoryFeed(true);
    } else if (tab === 'SHELF') {
      handleOpenLibraryWithTab('SAVED');
    } else if (tab === 'DISCOVER') {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } else {
      handleExitReaderOrQuiz();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasActiveFilters = 
    filters.selectedMood !== 'ALL' || 
    filters.selectedDuration !== 'ALL' || 
    filters.selectedCategory !== 'ALL' || 
    filters.selectedStatus !== 'ALL' ||
    filters.searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      
      {/* GLOBAL HUD NAVBAR */}
      <Navbar
        user={user}
        soundFxEnabled={soundFxEnabled}
        ambientEnabled={ambientEnabled}
        onToggleSoundFx={toggleSoundFx}
        onToggleAmbient={toggleAmbient}
        onOpenLibrary={(tab) => handleOpenLibraryWithTab(tab || 'SAVED')}
        onOpenStreakModal={() => handleOpenLibraryWithTab('STREAK')}
        onNavigateHome={handleExitReaderOrQuiz}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={logoutUser}
      />

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* VIEW 1: BITE-SIZED READER VIEW */}
        {isReadingMode && activeBook ? (
          <ByteDeckReader
            book={activeBook}
            onExit={handleExitReaderOrQuiz}
            onStartQuiz={handleStartQuizFromReader}
            onOpenQuoteGenerator={(q) => setActiveQuoteForGenerator({ ...q, bookId: activeBook.id })}
          />
        ) : (
          /* VIEW 2: HOME FEED & DISCOVERY */
          <div className="space-y-8 pb-16 md:pb-8">
            
            {/* HERO SECTION */}
            <HeroSection
              dailyPick={dailyPick}
              user={user}
              searchQuery={filters.searchQuery}
              displayMode={filters.displayMode}
              onSearchChange={setSearchQuery}
              onToggleDisplayMode={setDisplayMode}
              onStartReading={handleStartReading}
              onOpenStoryDeck={() => setShowStoryFeed(true)}
              onViewCitation={(b) => setCitationBook(b)}
            />

            {/* MOOD & DURATION FILTER BAR */}
            <MoodFilterBar
              selectedMood={filters.selectedMood}
              selectedDuration={filters.selectedDuration}
              onSelectMood={setSelectedMood}
              onSelectDuration={setSelectedDuration}
              onResetFilters={resetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* VERIFIED BOOKS GRID */}
            <BookGrid
              books={filteredBooks}
              selectedCategory={filters.selectedCategory}
              selectedStatus={filters.selectedStatus}
              displayMode={filters.displayMode}
              onSelectCategory={setSelectedCategory}
              onSelectStatus={setSelectedStatus}
              bookmarkedIds={user.bookmarkedBookIds}
              completedIds={user.completedBookIds}
              onStartReading={handleStartReading}
              onToggleBookmark={toggleBookmark}
              onViewCitation={(b) => setCitationBook(b)}
              onResetFilters={resetFilters}
            />

          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer />

      {/* MOBILE BOTTOM NAVIGATION */}
      <BottomNav
        activeTab={bottomNavTab}
        onSelectTab={handleBottomNavSelect}
        bookmarkCount={user.bookmarkedBookIds.length}
        streakDays={user.streak.currentStreak}
      />

      {/* --- MODALS & OVERLAYS --- */}

      {/* 1. Login / Register Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onSuccess={(loggedInUser) => loginUser(loggedInUser)}
          onClose={() => setIsAuthModalOpen(false)}
        />
      )}

      {/* 2. Micro-Quiz Modal */}
      {isQuizMode && activeBook && (
        <MicroQuizModal
          book={activeBook}
          readingSeconds={readingElapsedSeconds}
          onFinishQuiz={handleFinishQuiz}
          onExit={handleExitReaderOrQuiz}
        />
      )}

      {/* 3. TikTok/Story-Style 60s Feed Modal */}
      {showStoryFeed && (
        <StoryDeckFeed
          books={allBooks}
          onClose={() => setShowStoryFeed(false)}
          onReadFullBook={(b) => {
            setShowStoryFeed(false);
            handleStartReading(b);
          }}
          onBookmark={toggleBookmark}
          bookmarkedIds={user.bookmarkedBookIds}
          onOpenQuoteGenerator={(q) => setActiveQuoteForGenerator(q)}
        />
      )}

      {/* 4. Official Verified Citation & ISBN Modal */}
      {citationBook && (
        <CitationModal
          book={citationBook}
          onClose={() => setCitationBook(null)}
        />
      )}

      {/* 5. Social Quote Snapshot Generator Modal */}
      {activeQuoteForGenerator && (
        <QuoteSnapshotModal
          initialQuote={activeQuoteForGenerator}
          onSaveQuote={saveQuoteSnapshot}
          onClose={() => setActiveQuoteForGenerator(null)}
        />
      )}

      {/* 6. My Library & Gamification Shelf Drawer */}
      {isLibraryOpen && (
        <MyLibraryDrawer
          user={user}
          allBooks={allBooks}
          initialTab={libraryInitialTab}
          onClose={() => setIsLibraryOpen(false)}
          onStartReading={(b) => {
            setIsLibraryOpen(false);
            handleStartReading(b);
          }}
          onRemoveBookmark={toggleBookmark}
          onDeleteQuote={deleteQuoteSnapshot}
          onOpenQuoteGenerator={(q) => setActiveQuoteForGenerator(q)}
        />
      )}

      {/* 7. Level-Up Celebration Modal */}
      {newLevelUnlocked && (
        <LevelUpModal
          levelInfo={newLevelUnlocked}
          onClose={clearLevelUpModal}
        />
      )}

      {/* 8. Dynamic Badge Unlocked Toast */}
      {newBadgeUnlocked && (
        <BadgeUnlockedToast
          badge={newBadgeUnlocked}
          onClose={clearBadgeToast}
        />
      )}

    </div>
  );
}

export default App;
