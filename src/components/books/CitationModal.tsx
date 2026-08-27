import React, { useState } from 'react';
import { Book } from '../../types';
import { sound } from '../../services/audioService';
import { 
  ShieldCheck, 
  AlertTriangle,
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Hash, 
  Building2
} from 'lucide-react';

interface CitationModalProps {
  book: Book;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({ book, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const isVerified = book.verificationStatus === 'VERIFIED';

  const handleCopyCitation = () => {
    sound.playClick();
    navigator.clipboard.writeText(book.citation.citationApa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            {isVerified ? (
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            )}
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                {isVerified ? 'Sitasi & Referensi Terverifikasi' : 'Status Sumber: Perlu Verifikasi'}
              </h3>
              <span className="text-xs text-slate-500">
                {isVerified ? 'Data buku non-fiksi resmi terbitan terdaftar' : 'Data sedang dalam proses validasi kurator'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning Notice if Needs Verification */}
        {!isVerified && (
          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl space-y-1 text-xs text-amber-800">
            <div className="font-semibold flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Peringatan Integritas Data</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              {book.citation.sourceVerificationNote || 'Buku ini belum memiliki nomor ISBN atau tautan penerbit resmi yang tervalidasi. Jangan gunakan sebagai sumber kutipan akademis final.'}
            </p>
          </div>
        )}

        {/* Book Metadata Grid */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
          
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Judul Asli Publikasi</span>
            <h4 className="text-xs font-semibold text-slate-900 leading-snug">{book.originalTitle}</h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 block">Penulis</span>
              <span className="text-slate-800 font-medium">{book.author}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block">Tahun Terbit</span>
                <span className="text-slate-800 font-medium">{book.citation.originalPublishYear}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block">ISBN-13</span>
                <span className="text-slate-800 font-mono font-medium">{book.citation.verifiedIsbn13}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block">Penerbit</span>
                <span className="text-slate-800 font-medium">{book.citation.publisher}</span>
              </div>
            </div>
          </div>

          {/* Chapter Reference */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[10px] uppercase font-mono text-slate-500 block mb-1">
              Bab Sumber Materi Ringkasan
            </span>
            <p className="text-xs text-slate-800 font-mono bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
              {book.citation.chapterReference}
            </p>
          </div>

        </div>

        {/* APA Citation Box */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-semibold text-slate-500 uppercase font-mono">
              Format Sitasi APA (7th Edition):
            </span>
            <button
              onClick={handleCopyCitation}
              className="flex items-center gap-1 text-[11px] text-blue-700 hover:text-blue-800 font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Sitasi'}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono leading-relaxed select-all">
            {book.citation.citationApa}
          </div>
        </div>

        {/* Links & Close Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            {book.citation.publisherUrl && (
              <a
                href={book.citation.publisherUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800 font-medium transition-colors"
              >
                <span>Tautan Penerbit Resmi</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {book.citation.goodreadsUrl && (
              <a
                href={book.citation.goodreadsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-cyan-700 hover:text-cyan-800 font-medium transition-colors"
              >
                <span>Goodreads</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>

      </div>

    </div>
  );
};
