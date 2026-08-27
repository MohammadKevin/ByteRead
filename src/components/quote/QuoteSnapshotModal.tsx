import React, { useState } from 'react';
import { QuoteThemeStyle, QuoteSnapshot } from '../../types';
import { sound } from '../../services/audioService';
import { 
  X, 
  Download, 
  Copy, 
  Share2, 
  Bookmark, 
  Check, 
  ShieldCheck
} from 'lucide-react';

interface QuoteSnapshotModalProps {
  initialQuote: {
    bookTitle: string;
    author: string;
    quote: string;
    bookId?: string;
  };
  onSaveQuote: (quote: Omit<QuoteSnapshot, 'id' | 'savedAt'>) => void;
  onClose: () => void;
}

const THEMES: { id: QuoteThemeStyle; name: string; bgClass: string; textClass: string; authorClass: string; canvasBg: string; canvasText: string; canvasAccent: string }[] = [
  {
    id: 'FRESH_BLUE',
    name: 'Fresh Blue',
    bgClass: 'bg-white text-slate-900 border-2 border-blue-500',
    textClass: 'text-slate-900',
    authorClass: 'text-blue-700',
    canvasBg: '#ffffff',
    canvasText: '#0f172a',
    canvasAccent: '#2563eb'
  },
  {
    id: 'MINT_CLEAN',
    name: 'Mint Clean',
    bgClass: 'bg-white text-slate-900 border-2 border-emerald-500',
    textClass: 'text-slate-900',
    authorClass: 'text-emerald-700',
    canvasBg: '#ffffff',
    canvasText: '#0f172a',
    canvasAccent: '#059669'
  },
  {
    id: 'CYBER_CYAN',
    name: 'Electric Cyan',
    bgClass: 'bg-white text-slate-900 border-2 border-cyan-500',
    textClass: 'text-slate-900',
    authorClass: 'text-cyan-700',
    canvasBg: '#ffffff',
    canvasText: '#0f172a',
    canvasAccent: '#0891b2'
  },
  {
    id: 'OBSIDIAN_MINIMAL',
    name: 'Slate Minimal',
    bgClass: 'bg-slate-50 text-slate-900 border-2 border-slate-300',
    textClass: 'text-slate-900',
    authorClass: 'text-slate-600',
    canvasBg: '#f8fafc',
    canvasText: '#0f172a',
    canvasAccent: '#64748b'
  },
  {
    id: 'WARM_SLATE',
    name: 'Warm Paper',
    bgClass: 'bg-[#fefce8] text-slate-900 border-2 border-amber-400',
    textClass: 'text-slate-900',
    authorClass: 'text-amber-800',
    canvasBg: '#fefce8',
    canvasText: '#0f172a',
    canvasAccent: '#d97706'
  }
];

export const QuoteSnapshotModal: React.FC<QuoteSnapshotModalProps> = ({
  initialQuote,
  onSaveQuote,
  onClose
}) => {
  const [selectedTheme, setSelectedTheme] = useState<QuoteThemeStyle>('FRESH_BLUE');
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const activeThemeMeta = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  const handleCopyText = () => {
    sound.playClick();
    const textToCopy = `"${initialQuote.quote}"\n\n— ${initialQuote.author} (${initialQuote.bookTitle})\n⚡ ByteRead • Intisari 3 Menit`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveToProfile = () => {
    onSaveQuote({
      bookId: initialQuote.bookId || 'custom-book',
      bookTitle: initialQuote.bookTitle,
      author: initialQuote.author,
      quote: initialQuote.quote,
      themeStyle: selectedTheme
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleDownloadImage = () => {
    sound.playClick();
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = activeThemeMeta.canvasBg;
    ctx.fillRect(0, 0, 1080, 1080);

    // Border
    ctx.strokeStyle = activeThemeMeta.canvasAccent;
    ctx.lineWidth = 6;
    ctx.strokeRect(60, 60, 960, 960);

    // Top Brand Tag
    ctx.fillStyle = activeThemeMeta.canvasAccent;
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('⚡ BYTEREAD • INTISARI BUKU NON-FIKSI', 100, 140);

    // Quotation Mark
    ctx.fillStyle = activeThemeMeta.canvasAccent;
    ctx.font = 'bold 160px serif';
    ctx.fillText('“', 100, 310);

    // Quote Body
    ctx.fillStyle = activeThemeMeta.canvasText;
    ctx.font = 'bold 46px sans-serif';
    
    const words = initialQuote.quote.split(' ');
    let line = '';
    let y = 370;
    const maxWidth = 880;
    const lineHeight = 66;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 100, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 100, y);

    // Author & Book
    ctx.fillStyle = activeThemeMeta.canvasText;
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`— ${initialQuote.author}`, 100, y + 100);

    ctx.fillStyle = activeThemeMeta.canvasAccent;
    ctx.font = '28px sans-serif';
    ctx.fillText(`Buku: ${initialQuote.bookTitle}`, 100, y + 150);

    // Watermark
    ctx.fillStyle = activeThemeMeta.canvasAccent;
    ctx.font = '22px monospace';
    ctx.fillText('byteread.app', 100, 960);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `kutipan-${initialQuote.bookTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleShare = async () => {
    sound.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Kutipan dari ${initialQuote.bookTitle}`,
          text: `"${initialQuote.quote}" — ${initialQuote.author}`,
          url: window.location.href
        });
      } catch {
        handleCopyText();
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-heading">Kutipan Visual</h3>
            <span className="text-xs text-slate-500">Ekspor kartu kutipan untuk dibagikan ke media sosial</span>
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

        {/* Theme Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {THEMES.map((theme) => {
            const isSelected = selectedTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedTheme(theme.id);
                }}
                className={`flex-shrink-0 px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {theme.name}
              </button>
            );
          })}
        </div>

        {/* Visual Preview Card */}
        <div className={`p-6 rounded-2xl space-y-4 shadow-sm ${activeThemeMeta.bgClass}`}>
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-xs font-mono">
            <span className="font-bold text-blue-700">⚡ BYTEREAD</span>
            <span className="text-emerald-700 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Terverifikasi
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-3xl font-serif text-slate-400 block leading-none">“</span>
            <p className={`text-sm sm:text-base font-semibold leading-relaxed ${activeThemeMeta.textClass}`}>
              "{initialQuote.quote}"
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold block text-slate-900">— {initialQuote.author}</span>
              <span className={`text-[11px] block font-medium ${activeThemeMeta.authorClass}`}>
                {initialQuote.bookTitle}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">#IntisariBuku</span>
          </div>

        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          
          <button
            onClick={handleSaveToProfile}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
          >
            {saved ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{saved ? 'Tersimpan' : 'Simpan'}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tercopy' : 'Salin Teks'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>Bagikan</span>
          </button>

          <button
            onClick={handleDownloadImage}
            className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh PNG</span>
          </button>

        </div>

      </div>

    </div>
  );
};
