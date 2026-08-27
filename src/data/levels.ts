import { LevelInfo } from '../types';

export const LEVEL_TIERS: LevelInfo[] = [
  {
    level: 1,
    title: 'Level 1: Page Novice 📖',
    minXp: 0,
    maxXp: 150,
    perks: ['Akses semua kartu 2-menit', 'Simpan 5 kutipan favorit'],
    badgeColor: 'text-slate-400 border-slate-500/30 bg-slate-500/10'
  },
  {
    level: 2,
    title: 'Level 2: Curious Skimmer 🔍',
    minXp: 150,
    maxXp: 350,
    perks: ['Unlock Mood Filter Pro', 'Bonus +5% XP pada setiap kuis'],
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
  },
  {
    level: 3,
    title: 'Level 3: Byte Synthesizer ⚡',
    minXp: 350,
    maxXp: 650,
    perks: ['Kustomisasi tema kartu kutipan', 'Daily Streak Freeze (1x)'],
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
  },
  {
    level: 4,
    title: 'Level 4: Deep Thinker 🧠',
    minXp: 650,
    maxXp: 1050,
    perks: ['Ambient Focus Sound HD', 'Bonus +10% XP Multiplier'],
    badgeColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
  },
  {
    level: 5,
    title: 'Level 5: Literary Alchemist 🔮',
    minXp: 1050,
    maxXp: 1600,
    perks: ['Golden Avatar Glow Frame', 'Ekspor kutipan Ultra-HD 4K'],
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
  },
  {
    level: 6,
    title: 'Level 6: Polymath Sage 🌌',
    minXp: 1600,
    maxXp: 2300,
    perks: ['Akses preview buku edisi perdana', 'Streak Shield Unlimited'],
    badgeColor: 'text-pink-400 border-pink-500/30 bg-pink-500/10'
  },
  {
    level: 7,
    title: 'Level 7: Grand Scholar 👑',
    minXp: 2300,
    maxXp: 3200,
    perks: ['Crown Master Badge di profil', 'VIP Verified Reader status'],
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
  }
];

export function getLevelInfo(totalXp: number): { currentLevel: LevelInfo; nextLevel?: LevelInfo; progressPercentage: number } {
  let currentTier = LEVEL_TIERS[0];
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVEL_TIERS[i].minXp) {
      currentTier = LEVEL_TIERS[i];
      break;
    }
  }

  const nextTier = LEVEL_TIERS.find(t => t.level === currentTier.level + 1);

  if (!nextTier) {
    return { currentLevel: currentTier, progressPercentage: 100 };
  }

  const xpInCurrentTier = totalXp - currentTier.minXp;
  const tierSpan = currentTier.maxXp - currentTier.minXp;
  const progressPercentage = Math.min(100, Math.max(0, Math.round((xpInCurrentTier / tierSpan) * 100)));

  return {
    currentLevel: currentTier,
    nextLevel: nextTier,
    progressPercentage
  };
}
