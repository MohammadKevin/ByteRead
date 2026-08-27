import React from 'react';
import { LeaderboardEntry } from '../types';
import { WEEKLY_SEASON_DATA } from '../data/quests';
import { Avatar8Bit } from './Avatar8Bit';
import { sound } from '../services/audio';
import { X, Trophy, Flame, Zap, Crown, Clock, Gift } from 'lucide-react';

interface LeaderboardModalProps {
  leaderboard: LeaderboardEntry[];
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  leaderboard,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm text-[#000000]">
      <div className="relative w-full max-w-xl max-h-[88vh] rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] shadow-xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#f6f5f4] px-6 py-4 border-b border-[rgba(0,0,0,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-[#e89d01]" />
            <h3 className="text-base font-bold text-[#000000]">
              Liga Mingguan Kampus (Season {WEEKLY_SEASON_DATA.seasonNumber}) 🏆
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

        {/* Weekly Champion Callout Banner */}
        <div className="bg-[#ffb110]/20 p-4 border-b border-[rgba(0,0,0,0.08)] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#000000] font-bold flex items-center gap-1">
              <Crown className="w-4 h-4 text-[#000000]" /> Hadiah Juara #1 Selama 1 Minggu:
            </span>
            <span className="text-[#615d59] font-mono-code flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#e89d01]" /> Reset: {WEEKLY_SEASON_DATA.resetDaysLeft}d {WEEKLY_SEASON_DATA.resetHoursLeft}h
            </span>
          </div>

          <div className="text-xs text-[#000000] bg-white p-3 rounded-xl border border-[rgba(0,0,0,0.08)] flex items-center gap-2.5">
            <Gift className="w-4 h-4 text-[#0075de] shrink-0" />
            <span>{WEEKLY_SEASON_DATA.topRankRewardTitle}</span>
          </div>
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {leaderboard.map((player) => (
            <div
              key={player.handle}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                player.isCurrentUser
                  ? 'bg-[#e6f3fe] border-[#0075de]/40'
                  : 'bg-[#f6f5f4] border-[rgba(0,0,0,0.06)]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs">
                  {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}
                </div>

                <Avatar8Bit size={42} showCrown={player.rank === 1} />

                <div>
                  <div className="text-sm font-bold text-[#000000] flex items-center gap-2">
                    {player.name}
                    {player.rank === 1 && (
                      <span className="text-[9px] px-2 py-0.5 bg-[#ffb110] text-[#000000] font-bold rounded-full flex items-center gap-1">
                        👑 JUARA #1
                      </span>
                    )}
                    {player.isCurrentUser && (
                      <span className="text-[10px] px-2 py-0.5 bg-[#0075de] text-white font-bold rounded-full">
                        YOU
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#615d59]">
                    {player.levelTitle}
                  </div>
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <div className="text-sm font-bold text-[#0075de] font-mono-code flex items-center gap-1 justify-end">
                  <Zap className="w-3.5 h-3.5 fill-[#0075de]" /> {player.xp} XP
                </div>
                <div className="text-xs text-[#e89d01] font-mono-code flex items-center gap-1 justify-end font-medium">
                  🔥 {player.streak}d Streak
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-[#f6f5f4] px-6 py-4 border-t border-[rgba(0,0,0,0.08)] flex justify-between items-center text-xs text-[#615d59]">
          <span>Klasemen Liga Mingguan • Perpustakaan Kampus IT</span>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-white hover:bg-[#e4e2df] text-[#000000] font-semibold border border-[rgba(0,0,0,0.12)] transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
