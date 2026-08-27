import React from 'react';
import { Book, BookCategory, ReadStatusFilter } from '../../types';
import { BookCard } from './BookCard';
import { sound } from '../../services/audioService';
import { BookOpen, SearchX } from 'lucide-react';

const CATEGORIES: (BookCategory | 'ALL')[] = [
  'ALL',
  'Self-Improvement',
  'Finance',
  'Productivity',
  'Creativity',
  'Psychology',
  'Tech & Craftsmanship'
];

interface BookGridProps {
  books: Book[];
  selectedCategory: BookCategory | 'ALL';
  selectedStatus: ReadStatusFilter;
  displayMode: 'SCAN_QUICK' | 'GRID_CARDS';
  onSelectCategory: (category: BookCategory | 'ALL') => void;
  onSelectStatus: (status: ReadStatusFilter) => void;
  bookmarkedIds: string[];
  completedIds: string[];
  onStartReading: (book: Book) => void;
  onToggleBookmark: (bookId: string) => void;
  onViewCitation: (book: Book) => void;
  onResetFilters: () => void;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  selectedCategory,
  selectedStatus,
  displayMode,
  onSelectCategory,
  onSelectStatus,
  bookmarkedIds,
  completedIds,
  onStartReading,
  onToggleBookmark,
  onViewCitation,
  onResetFilters
}) => {
  return (
    <section className="space-y-4">
      
      {/* FILTER TABS HEADER */}
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-3">
        
        {/* Status Filters: Semua / Belum Dibaca / Selesai / Tersimpan */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900 font-heading">
              Koleksi Intisari Buku
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-mono">
              {books.length} buku
            </span>
          </div>

          {/* Status Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                onSelectStatus('ALL');
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedStatus === 'ALL'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onSelectStatus('UNREAD');
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedStatus === 'UNREAD'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Belum Dibaca
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onSelectStatus('COMPLETED');
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedStatus === 'COMPLETED'
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Selesai ({completedIds.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onSelectStatus('BOOKMARKED');
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                selectedStatus === 'BOOKMARKED'
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Di Rak ({bookmarkedIds.length})
            </button>
          </div>

        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  onSelectCategory(cat);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Semua Topik' : cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Grid of Books */}
      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isBookmarked={bookmarkedIds.includes(book.id)}
              isCompleted={completedIds.includes(book.id)}
              displayMode={displayMode}
              onStartReading={onStartReading}
              onToggleBookmark={onToggleBookmark}
              onViewCitation={onViewCitation}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-14 px-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto border border-slate-200">
            <SearchX className="w-6 h-6 text-slate-600" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Tidak ada buku yang cocok dengan pencarian
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Coba kata kunci lain seperti <em>"Kebiasaan"</em>, <em>"Finansial"</em>, <em>"Fokus"</em>, atau reset filter status membaca.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onResetFilters();
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

    </section>
  );
};
