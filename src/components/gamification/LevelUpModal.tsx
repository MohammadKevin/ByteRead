import React, { useEffect } from 'react';
import { LevelInfo } from '../../types';
import { sound } from '../../services/audioService';
import { ArrowRight, Check } from 'lucide-react';

interface LevelUpModalProps {
  levelInfo: LevelInfo;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({ levelInfo, onClose }) => {
  useEffect(() => {
    sound.playLevelUp();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl text-center space-y-4">
        
        <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto font-black shadow-xs">
          ⚡
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-blue-700 tracking-wider block">
            Pencapaian Level Baru
          </span>
          <h2 className="text-lg font-extrabold text-slate-900 font-heading">
            {levelInfo.title}
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aktivitas membaca harianmu berhasil menaikkan kapasitas level akun.
          </p>
        </div>

        {/* Perks */}
        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-left space-y-2 text-xs">
          <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 block">Fitur Terbuka:</span>
          {levelInfo.perks.map((perk, idx) => (
            <div key={idx} className="flex items-center gap-2 text-slate-800">
              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Lanjut Membaca</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
};
