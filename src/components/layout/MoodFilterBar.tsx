import React from 'react';
import { MoodCategory, ReadDuration } from '../../types';
import { MOODS_METADATA, DURATION_OPTIONS } from '../../data/moods';
import { sound } from '../../services/audioService';
import { Clock, X, Compass } from 'lucide-react';

interface MoodFilterBarProps {
  selectedMood: MoodCategory | 'ALL';
  selectedDuration: ReadDuration | 'ALL';
  onSelectMood: (mood: MoodCategory | 'ALL') => void;
  onSelectDuration: (duration: ReadDuration | 'ALL') => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const MoodFilterBar: React.FC<MoodFilterBarProps> = ({
  selectedMood,
  selectedDuration,
  onSelectMood,
  onSelectDuration,
  onResetFilters,
  hasActiveFilters
}) => {
  const moods = Object.values(MOODS_METADATA);

  const handleMoodClick = (moodId: MoodCategory | 'ALL') => {
    sound.playClick();
    onSelectMood(selectedMood === moodId ? 'ALL' : moodId);
  };

  const handleDurationClick = (durId: ReadDuration | 'ALL') => {
    sound.playClick();
    onSelectDuration(selectedDuration === durId ? 'ALL' : durId);
  };

  return (
    <div className="space-y-2.5 my-4">
      
      {/* Mood Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
          <Compass className="w-3.5 h-3.5 text-cyan-600" />
          <span>Rekomendasi Berdasarkan Kebutuhan Saat Ini:</span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => {
              sound.playClick();
              onResetFilters();
            }}
            className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800 font-medium transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      {/* Mood Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        
        {/* All Moods */}
        <button
          onClick={() => handleMoodClick('ALL')}
          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            selectedMood === 'ALL'
              ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-xs'
              : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
          }`}
        >
          Semua Kebutuhan
        </button>

        {/* Mood items */}
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodClick(mood.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
            >
              <span>{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          );
        })}
      </div>

      {/* Duration Chips */}
      <div className="flex items-center gap-2 pt-0.5">
        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-500 mr-1">
          <Clock className="w-3 h-3 text-cyan-600" />
          <span>Waktu Luang:</span>
        </div>

        {DURATION_OPTIONS.map((opt) => {
          const isSelected = selectedDuration === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => handleDurationClick(opt.id)}
              className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${
                isSelected
                  ? 'bg-cyan-50 text-cyan-800 border-cyan-300 font-semibold shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

    </div>
  );
};
