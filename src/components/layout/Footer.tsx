import React from 'react';
import { ShieldCheck, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white mt-16 py-10 px-4 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 font-heading">
              <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-black shadow-2xs">
                ⚡
              </span>
              <span>ByteRead — Solusi Literasi Cepat</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Jembatan literasi untuk menyerap intisari buku non-fiksi berbobot dalam 3 menit tanpa perlu membaca ratusan halaman.
            </p>
          </div>

          {/* Citation Standard */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Standar Integritas & Anti-Halusinasi</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Materi disarikan langsung dari buku fisik terbitan resmi dengan ISBN-10/13 valid dan format sitasi APA 7th Edition.
            </p>
          </div>

          {/* Habit Metric */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-cyan-800 font-semibold text-xs">
              <Clock className="w-4 h-4 text-cyan-600" />
              <span>Micro-Learning & Efisiensi Waktu</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">
              Didukung mode baca cepat 30 detik, slide deck 3 menit, habit tracker streak kalender, dan evaluasi pemahaman.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ByteRead. Dibuat untuk Efisiensi Literasi Digital.
          </div>
          <div className="font-mono text-slate-600">
            Pure White & Cyan/Blue Human-Crafted Architecture
          </div>
        </div>

      </div>
    </footer>
  );
};
