import { MoodCategory, ReadDuration } from '../types';

export interface MoodMeta {
  id: MoodCategory;
  label: string;
  emoji: string;
  tagline: string;
  gradient: string;
  accent: string;
}

export const MOODS_METADATA: Record<MoodCategory, MoodMeta> = {
  BURNOUT: {
    id: 'BURNOUT',
    label: 'Lagi Burnout',
    emoji: '🔥',
    tagline: 'Butuh recharge energi & lepas dari kelelahan kognitif',
    gradient: 'from-orange-500/20 to-red-500/20',
    accent: '#F97316'
  },
  FINANCE: {
    id: 'FINANCE',
    label: 'Fokus Finansial',
    emoji: '💰',
    tagline: 'Pola pikir uang, aset, dan kebebasan finansial',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10B981'
  },
  HABIT: {
    id: 'HABIT',
    label: 'Bangun Kebiasaan',
    emoji: '⚡',
    tagline: 'Membangun rutinitas otomatis 1% lebih baik setiap hari',
    gradient: 'from-amber-500/20 to-yellow-500/20',
    accent: '#F59E0B'
  },
  OVERTHINKING: {
    id: 'OVERTHINKING',
    label: 'Lagi Overthinking',
    emoji: '🧠',
    tagline: 'Lepas dari kecemasan & pilih hal yang pantas dipedulikan',
    gradient: 'from-rose-500/20 to-purple-500/20',
    accent: '#FB7185'
  },
  CREATIVE: {
    id: 'CREATIVE',
    label: 'Cari Ide Kreatif',
    emoji: '🎨',
    tagline: 'Inspirasi karya, remiks ide, dan portofolio digital',
    gradient: 'from-purple-500/20 to-pink-500/20',
    accent: '#C084FC'
  },
  TECH_CAREER: {
    id: 'TECH_CAREER',
    label: 'Karir & Koding',
    emoji: '💻',
    tagline: 'Software craftsmanship, fokus mendalam, & strategi karir tech',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    accent: '#38BDF8'
  },
  MINDFUL: {
    id: 'MINDFUL',
    label: 'Ketenangan Hidup',
    emoji: '🌿',
    tagline: 'Menemukan ikigai, slow living, dan penerimaan diri',
    gradient: 'from-teal-500/20 to-emerald-500/20',
    accent: '#2DD4BF'
  }
};

export const DURATION_OPTIONS: { id: ReadDuration; label: string; sub: string }[] = [
  { id: '2_MIN', label: '⚡ 2 Menit', sub: 'Bite Super Cepat' },
  { id: '3_MIN', label: '⏱️ 3 Menit', sub: 'Standar Golden' },
  { id: '5_MIN', label: '⏳ 5 Menit', sub: 'Deep Dive' }
];
