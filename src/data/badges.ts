import { BadgeAchievement } from '../types';

export const INITIAL_BADGES: BadgeAchievement[] = [
  {
    id: 'badge-first-bite',
    title: 'First Byte ⚡',
    icon: '⚡',
    description: 'Menyelesaikan ringkasan buku pertamamu di ByteRead.',
    category: 'EXPLORER',
    unlocked: true,
    unlockedAt: 'Hari ini',
    progressCurrent: 1,
    progressTarget: 1
  },
  {
    id: 'badge-night-reader',
    title: 'Night Owl Reader 🌙',
    icon: '🦉',
    description: 'Menyelesaikan sesi membaca di atas pukul 22:00 malam.',
    category: 'STREAK',
    unlocked: false,
    progressCurrent: 0,
    progressTarget: 1
  },
  {
    id: 'badge-3day-streak',
    title: '3-Day Fire 🔥',
    icon: '🔥',
    description: 'Membaca konsisten 3 hari berturut-turut tanpa jeda.',
    category: 'STREAK',
    unlocked: true,
    unlockedAt: 'Kemarin',
    progressCurrent: 3,
    progressTarget: 3
  },
  {
    id: 'badge-7day-streak',
    title: 'Habit Champion 🏆',
    icon: '👑',
    description: 'Mencapai 7 hari streak harian. Terbukti pembangun kebiasaan sejati!',
    category: 'STREAK',
    unlocked: false,
    progressCurrent: 3,
    progressTarget: 7
  },
  {
    id: 'badge-quiz-prodigy',
    title: 'Quiz Prodigy 🎯',
    icon: '🎯',
    description: 'Mendapatkan nilai akurasi 100% pada Micro-Quiz buku.',
    category: 'MASTERY',
    unlocked: false,
    progressCurrent: 0,
    progressTarget: 1
  },
  {
    id: 'badge-speed-demon',
    title: 'Speed Demon ⚡',
    icon: '🚀',
    description: 'Menyelesaikan 1 deck buku 3-menit dengan fokus penuh tanpa distraksi.',
    category: 'SPEED',
    unlocked: true,
    unlockedAt: '2 hari lalu',
    progressCurrent: 1,
    progressTarget: 1
  },
  {
    id: 'badge-quote-curator',
    title: 'Quote Curator 🎨',
    icon: '🖼️',
    description: 'Menyimpan 3 kutipan visual aesthetic ke galeri personalmu.',
    category: 'COMMUNITY',
    unlocked: false,
    progressCurrent: 1,
    progressTarget: 3
  },
  {
    id: 'badge-polymath',
    title: 'Polymath Mind 🧠',
    icon: '🌐',
    description: 'Membaca buku dari 3 kategori mood yang berbeda.',
    category: 'EXPLORER',
    unlocked: false,
    progressCurrent: 1,
    progressTarget: 3
  }
];
