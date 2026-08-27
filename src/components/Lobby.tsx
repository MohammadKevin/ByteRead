import React, { useState } from 'react';
import { UserProfile, Quest, LeaderboardEntry, Badge, CanteenReward } from '../types';
import { WEEKLY_SEASON_DATA } from '../data/quests';
import { Avatar8Bit } from './Avatar8Bit';
import { sound } from '../services/audio';
import { 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Trophy, 
  BookOpen, 
  Clock, 
  Zap, 
  Coffee, 
  Award,
  ChevronRight,
  Gift,
  Crown,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface LobbyProps {
  user: UserProfile;
  quests: Quest[];
  leaderboard: LeaderboardEntry[];
  badges: Badge[];
  canteenRewards: CanteenReward[];
  onStartQuest: (quest: Quest) => void;
  onOpenLeaderboard: () => void;
  onClaimReward: (rewardId: string) => void;
}

export const Lobby: React.FC<LobbyProps> = ({
  user,
  quests,
  leaderboard,
  badges,
  canteenRewards,
  onStartQuest,
  onOpenLeaderboard,
  onClaimReward
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const primaryQuest = quests.find(q => !user.completedQuestIds.includes(q.id)) || quests[0];

  const filteredQuests = selectedCategory === 'ALL' 
    ? quests 
    : quests.filter(q => q.category === selectedCategory);

  const top3 = leaderboard.slice(0, 3);
  const top1Player = leaderboard[0];

  const xpGapToRank1 = Math.max(0, top1Player.xp - user.xp);

  const activeCanteenReward = canteenRewards[0];
  const canteenXpProgress = Math.min(100, Math.round((user.xp / activeCanteenReward.xpCost) * 100));

  const streakMultiplier = user.streakDays >= 7 ? 30 : user.streakDays >= 5 ? 20 : user.streakDays >= 3 ? 10 : 0;

  return (
    <div className="space-y-10 pb-16 bg-[#f6f5f4] text-[#000000]">
      
      {/* 🚀 NOTION HERO SECTION */}
      <section className="bg-[#ffffff] rounded-2xl border border-[rgba(0,0,0,0.08)] p-8 md:p-12 text-center space-y-6 shadow-sm">
        
        {/* Row of Character Marks / Avatars */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Avatar8Bit size={48} showCrown={user.level >= 5} />
          <div className="px-3 py-1 rounded-full bg-[#f6f5f4] border border-[rgba(0,0,0,0.08)] text-xs font-medium text-[#615d59] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#0075de]" />
            <span>{user.name} ({user.title})</span>
          </div>
        </div>

        {/* Hero Headline with Highlight Pill (Notion Style) */}
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#000000] max-w-3xl mx-auto leading-tight">
          Level Up Literasimu. Baca
          <span className="inline-block px-4 py-1 my-1 mx-2 bg-[#ffb110] text-[#000000] rounded-full text-2xl md:text-4xl font-extrabold align-middle shadow-sm">
            Byte-nya,
          </span>
          Menangkan Gamenya.
        </h1>

        {/* Subhead */}
        <p className="text-base md:text-lg text-[#615d59] max-w-xl mx-auto leading-relaxed">
          Platform literasi IT: <span className="text-[#000000] font-semibold">1. Read Bytes</span> ➔ <span className="text-[#0075de] font-semibold">2. Play Boss Quiz</span> ➔ <span className="text-[#e89d01] font-semibold font-bold">3. Menangkan Nasi Ayam Laos Pak Yoyok 🍗!</span>
        </p>

        {/* User Badges & Streak Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="px-3 py-1 rounded-full bg-[#e6f3fe] text-[#0075de] text-xs font-medium flex items-center gap-1.5 border border-[#0075de]/20">
            <Trophy className="w-3.5 h-3.5 text-[#0075de]" />
            Rank #{user.currentRank || 3} Kampus
          </span>

          <span className="px-3 py-1 rounded-full bg-[#ffb110]/20 text-[#000000] text-xs font-medium flex items-center gap-1.5 border border-[#ffb110]/40">
            <Flame className="w-3.5 h-3.5 fill-[#e89d01] text-[#e89d01]" />
            {user.streakDays} Hari Streak {streakMultiplier > 0 && `(+${streakMultiplier}% XP)`}
          </span>
        </div>

        {/* Primary Action Button (Notion Blue Filled CTA Pill) */}
        <div className="pt-4">
          <button
            onClick={() => {
              sound.playClick();
              onStartQuest(primaryQuest);
            }}
            className="px-8 py-4 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white font-semibold text-sm tracking-wide shadow-md transition-all inline-flex items-center gap-3 hover:scale-105"
          >
            <Play className="w-4 h-4 fill-white" />
            1. BACA MATERIAL & KUIS HARI INI
          </button>
        </div>

      </section>

      {/* 🧭 NOTION 3-STEP GUIDED FLOW GRID */}
      <section className="space-y-3">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#757575] flex items-center gap-2 px-1">
          <Layers className="w-4 h-4 text-[#0075de]" /> Alur Pengalaman Pengguna (3-Step Guided Flow)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-6 rounded-xl bg-white border border-[rgba(0,0,0,0.08)] flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[#e6f3fe] text-[#0075de] font-bold flex items-center justify-center shrink-0 text-sm">
              1
            </span>
            <div>
              <div className="font-bold text-[#000000] text-base mb-1">Fase "The Reading"</div>
              <p className="text-sm text-[#615d59] leading-relaxed">
                Baca modul *byte-sized* pendek bergaya API doc dengan analogi seru & contoh kode bersih.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[rgba(0,0,0,0.08)] flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[#f6d5b8] text-[#000000] font-bold flex items-center justify-center shrink-0 text-sm">
              2
            </span>
            <div>
              <div className="font-bold text-[#000000] text-base mb-1">Fase Kuis Interaktif</div>
              <p className="text-sm text-[#615d59] leading-relaxed">
                Uji pemahaman dengan kuis Quizizz style 15-detik per soal, combo multiplier, & meme feedback!
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-white border border-[rgba(0,0,0,0.08)] flex items-start gap-4">
            <span className="w-8 h-8 rounded-full bg-[#ffb110]/30 text-[#000000] font-bold flex items-center justify-center shrink-0 text-sm">
              3
            </span>
            <div>
              <div className="font-bold text-[#000000] text-base mb-1">Rewards & Peringkat #1</div>
              <p className="text-sm text-[#615d59] leading-relaxed">
                Dapatkan XP, jaga daily streak, & tahan posisi #1 di Liga Mingguan untuk Voucher Kantin Sultan!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 👑 WEEKLY COMPETITION CHAMPIONSHIP CARD (ACCENT MARIGOLD BLOCK) */}
      <section className="rounded-2xl bg-[#ffb110] border border-[rgba(0,0,0,0.08)] p-8 text-[#000000] shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-[#000000] text-white font-bold text-xs flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 fill-[#ffb110] text-[#ffb110]" /> LIGA MINGGUAN KAMPUS (SEASON {WEEKLY_SEASON_DATA.seasonNumber})
              </span>
              <span className="text-xs text-[#000000] font-medium bg-white/70 px-3 py-1 rounded-full border border-[rgba(0,0,0,0.1)] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#000000]" /> Sisa Waktu Reset: {WEEKLY_SEASON_DATA.resetDaysLeft}d {WEEKLY_SEASON_DATA.resetHoursLeft}h
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold tracking-tight pt-1">
              Bertahan di Peringkat #1 Selama 1 Minggu & Menangkan Hadiah Sultan! 🎁
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {WEEKLY_SEASON_DATA.topRankRewardPerks.map((perk, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/80 border border-[rgba(0,0,0,0.08)] text-xs text-[#000000] font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0075de] shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gap Status & Action */}
          <div className="w-full lg:w-auto bg-white p-6 rounded-xl border border-[rgba(0,0,0,0.08)] text-center lg:text-right space-y-3 shrink-0">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#757575]">Status Liga Mingguan</div>
            <div className="text-sm font-bold text-[#000000]">
              {xpGapToRank1 > 0 ? (
                <span>Butuh {xpGapToRank1} XP lagi untuk geser @DevGuru di #1</span>
              ) : (
                <span className="text-[#0075de]">🎉 Kamu Memegang Tahta Juara #1 Minggu Ini!</span>
              )}
            </div>
            
            <button
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="w-full py-2.5 px-4 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Trophy className="w-3.5 h-3.5" /> Klasemen Liga Mingguan <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 📊 MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLUMNS: DAILY QUESTS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header & Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#000000] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0075de]" />
                Daily Quests (Pilih Modul)
              </h2>
              <p className="text-xs text-[#615d59]">
                Alur Terstruktur: Baca Modul Materi ➔ Selesaikan Kuis Interaktif
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-[rgba(0,0,0,0.08)]">
              {['ALL', 'Web Architecture', 'API & Protocol', 'Git & DevOps'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#0075de] text-white font-semibold'
                      : 'text-[#615d59] hover:text-[#000000]'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua' : cat.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Quest Card List */}
          <div className="space-y-4">
            {filteredQuests.map((quest) => {
              const isCompleted = user.completedQuestIds.includes(quest.id);

              return (
                <div
                  key={quest.id}
                  className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-[#f6f5f4] border-[rgba(0,0,0,0.08)] opacity-85'
                      : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[#0075de] hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-code bg-[#e6f3fe] text-[#0075de] font-semibold">
                          GET /{quest.id}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code ${
                          quest.difficulty === 'Easy' 
                            ? 'bg-[#e6f3fe] text-[#0075de]'
                            : quest.difficulty === 'Medium'
                            ? 'bg-[#ffb110]/20 text-[#000000]'
                            : 'bg-[#f64932]/10 text-[#f64932]'
                        }`}>
                          {quest.difficulty}
                        </span>

                        <span className="text-xs text-[#615d59] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {quest.estimatedMinutes} Menit Baca
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#000000] group-hover:text-[#0075de] transition-colors">
                        {quest.title}
                      </h3>

                      <p className="text-xs text-[#615d59] line-clamp-1">
                        {quest.tagline}
                      </p>

                      {/* Reward pills */}
                      <div className="flex items-center gap-3 pt-1 text-xs">
                        <span className="text-[#0075de] font-semibold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-[#0075de]" /> +{quest.xpReward} XP
                        </span>
                        <span className="text-[#e89d01] font-semibold flex items-center gap-1">
                          <Coffee className="w-3.5 h-3.5" /> +{quest.canteenBonusXp} XP Kantin
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="sm:self-center">
                      {isCompleted ? (
                        <button
                          onClick={() => {
                            sound.playClick();
                            onStartQuest(quest);
                          }}
                          className="px-4 py-2 rounded-lg bg-[#f6f5f4] hover:bg-[#e4e2df] text-[#000000] text-xs font-semibold flex items-center gap-1.5 border border-[rgba(0,0,0,0.08)] transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0075de]" />
                          Selesai (Baca Ulang)
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            sound.playClick();
                            onStartQuest(quest);
                          }}
                          className="px-5 py-2.5 rounded-full bg-[#0075de] hover:bg-[#097fe8] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all hover:scale-105"
                        >
                          1. Baca Modul Ini <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Kantin Perks Progress Widget */}
          <div className="rounded-xl bg-white border border-[rgba(0,0,0,0.08)] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#ffb110]/20 text-[#000000]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#000000]">
                    Target Reward Kantin IT Kampus ☕
                  </h4>
                  <p className="text-xs text-[#615d59]">
                    {activeCanteenReward.title}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#e89d01] font-mono-code">
                {user.xp} / {activeCanteenReward.xpCost} XP
              </span>
            </div>

            <div className="w-full bg-[#f6f5f4] h-2.5 rounded-full overflow-hidden border border-[rgba(0,0,0,0.08)]">
              <div 
                className="h-full bg-[#ffb110] rounded-full transition-all duration-500"
                style={{ width: `${canteenXpProgress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#615d59] pt-1">
              <span>Sponsor: {activeCanteenReward.sponsor}</span>
              {user.xp >= activeCanteenReward.xpCost ? (
                <button
                  onClick={() => onClaimReward(activeCanteenReward.id)}
                  className="px-3.5 py-1.5 rounded-full bg-[#ffb110] text-[#000000] font-bold text-xs hover:bg-[#e89d01] transition-colors"
                >
                  Tukar Voucher Now 🎉
                </button>
              ) : (
                <span>Kurang {activeCanteenReward.xpCost - user.xp} XP lagi</span>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT 1 COLUMN: LEADERBOARD MINI & BADGES RACK */}
        <div className="space-y-6">
          
          {/* LEADERBOARD MINI (TOP 3 WEEKLY) */}
          <div className="rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#000000] flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#e89d01]" />
                Top Players Minggu Ini
              </h3>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenLeaderboard();
                }}
                className="text-xs text-[#0075de] hover:underline font-medium"
              >
                Lihat Semua
              </button>
            </div>

            <div className="space-y-3">
              {top3.map((player) => (
                <div 
                  key={player.handle}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    player.isCurrentUser 
                      ? 'bg-[#e6f3fe] border-[#0075de]/40'
                      : 'bg-[#f6f5f4] border-[rgba(0,0,0,0.06)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs">
                      {player.rank === 1 && <span className="text-lg">🥇</span>}
                      {player.rank === 2 && <span className="text-lg">🥈</span>}
                      {player.rank === 3 && <span className="text-lg">🥉</span>}
                    </div>

                    <Avatar8Bit size={36} showCrown={player.rank === 1} />

                    <div>
                      <div className="text-xs font-bold text-[#000000] flex items-center gap-1">
                        {player.name}
                        {player.isCurrentUser && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-[#0075de] text-white rounded font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#615d59]">
                        {player.levelTitle.split(':')[1] || player.levelTitle}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold text-[#0075de] font-mono-code">
                      {player.xp} XP
                    </div>
                    <div className="text-[10px] text-[#e89d01] font-mono-code flex items-center gap-0.5 justify-end font-medium">
                      🔥 {player.streak}d
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onOpenLeaderboard();
              }}
              className="w-full py-2.5 rounded-lg bg-[#f6f5f4] hover:bg-[#e4e2df] text-[#000000] text-xs font-semibold transition-colors border border-[rgba(0,0,0,0.08)] text-center"
            >
              🏆 Klasemen Liga Mingguan
            </button>
          </div>

          {/* UNLOCKED BADGES RACK */}
          <div className="rounded-2xl bg-white border border-[rgba(0,0,0,0.08)] p-6 space-y-4">
            <h3 className="text-base font-bold text-[#000000] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0075de]" />
              Rak Badge Koleksi ({badges.filter(b => b.unlocked).length}/{badges.length})
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                    b.unlocked 
                      ? 'bg-[#f6f5f4] border-[rgba(0,0,0,0.1)]' 
                      : 'bg-[#f6f5f4]/50 border-[rgba(0,0,0,0.04)] opacity-40 grayscale'
                  }`}
                >
                  <span className="text-2xl">{b.icon}</span>
                  <div className="text-xs font-bold text-[#000000] leading-tight">
                    {b.title}
                  </div>
                  <div className="text-[10px] text-[#615d59] line-clamp-2">
                    {b.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
