import { useState, useMemo } from 'react';
import { Book, FilterState, MoodCategory, ReadDuration, BookCategory, ReadStatusFilter } from '../types';
import { VERIFIED_BOOKS } from '../data/verifiedBooks';

export function useBooks(bookmarkedIds: string[] = [], completedIds: string[] = []) {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    selectedMood: 'ALL',
    selectedDuration: 'ALL',
    selectedCategory: 'ALL',
    selectedStatus: 'ALL',
    displayMode: 'SCAN_QUICK' // Default to quick scanning mode for Gen-Z
  });

  const allBooks = VERIFIED_BOOKS;

  // Filter logic
  const filteredBooks = useMemo(() => {
    return allBooks.filter((book) => {
      // 1. Search Query filter
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = book.title.toLowerCase().includes(query);
        const matchesAuthor = book.author.toLowerCase().includes(query);
        const matchesSummary = book.oneSentenceSummary.toLowerCase().includes(query);
        const matchesActionable = book.actionableStep?.toLowerCase().includes(query);
        const matchesCategory = book.category.toLowerCase().includes(query);
        const matchesQuick = book.quickTakeaways?.some(t => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesAuthor && !matchesSummary && !matchesActionable && !matchesCategory && !matchesQuick) {
          return false;
        }
      }

      // 2. Status filter
      if (filters.selectedStatus === 'BOOKMARKED' && !bookmarkedIds.includes(book.id)) {
        return false;
      }
      if (filters.selectedStatus === 'COMPLETED' && !completedIds.includes(book.id)) {
        return false;
      }
      if (filters.selectedStatus === 'UNREAD' && completedIds.includes(book.id)) {
        return false;
      }

      // 3. Mood filter
      if (filters.selectedMood !== 'ALL' && !book.moodTags.includes(filters.selectedMood as MoodCategory)) {
        return false;
      }

      // 4. Duration filter
      if (filters.selectedDuration !== 'ALL' && book.readDuration !== filters.selectedDuration) {
        return false;
      }

      // 5. Category filter
      if (filters.selectedCategory !== 'ALL' && book.category !== filters.selectedCategory) {
        return false;
      }

      return true;
    });
  }, [allBooks, filters, bookmarkedIds, completedIds]);

  const bookmarkedBooks = useMemo(() => {
    return allBooks.filter(b => bookmarkedIds.includes(b.id));
  }, [allBooks, bookmarkedIds]);

  const completedBooks = useMemo(() => {
    return allBooks.filter(b => completedIds.includes(b.id));
  }, [allBooks, completedIds]);

  const dailyPick: Book = useMemo(() => {
    const unread = allBooks.filter(b => !completedIds.includes(b.id) && b.verificationStatus === 'VERIFIED');
    return unread.length > 0 ? unread[0] : allBooks[0];
  }, [allBooks, completedIds]);

  const setSearchQuery = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const setSelectedMood = (mood: MoodCategory | 'ALL') => {
    setFilters(prev => ({ ...prev, selectedMood: mood }));
  };

  const setSelectedDuration = (duration: ReadDuration | 'ALL') => {
    setFilters(prev => ({ ...prev, selectedDuration: duration }));
  };

  const setSelectedCategory = (category: BookCategory | 'ALL') => {
    setFilters(prev => ({ ...prev, selectedCategory: category }));
  };

  const setSelectedStatus = (status: ReadStatusFilter) => {
    setFilters(prev => ({ ...prev, selectedStatus: status }));
  };

  const setDisplayMode = (mode: 'SCAN_QUICK' | 'GRID_CARDS') => {
    setFilters(prev => ({ ...prev, displayMode: mode }));
  };

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedMood: 'ALL',
      selectedDuration: 'ALL',
      selectedCategory: 'ALL',
      selectedStatus: 'ALL',
      displayMode: filters.displayMode
    });
  };

  return {
    allBooks,
    filteredBooks,
    bookmarkedBooks,
    completedBooks,
    dailyPick,
    filters,
    setSearchQuery,
    setSelectedMood,
    setSelectedDuration,
    setSelectedCategory,
    setSelectedStatus,
    setDisplayMode,
    resetFilters
  };
}
