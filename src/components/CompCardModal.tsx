import { X, Printer, Calendar, MessageSquareText, ShieldCheck, MapPin, Share2, Heart } from 'lucide-react';
import { ModelProfile } from '../types/model';
import { buildDirectTalentChatUrl } from '../utils/whatsapp';

interface CompCardModalProps {
  model: ModelProfile | null;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onClose: () => void;
  onOpenBooking: (model: ModelProfile) => void;
}

export const CompCardModal: React.FC<CompCardModalProps> = ({
  model,
  isFavorite = false,
  onToggleFavorite,
  onClose,
  onOpenBooking,
}) => {
  if (!model) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${model.name} — Fulham Comp Card`,
        text: `Official Comp Card for ${model.name} (${model.agencyCode}) - Profile & Measurements`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Container */}
      <div 
        className="relative w-full max-w-4xl rounded-2xl border border-zinc-800 bg-[#0e0e11] text-zinc-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4 bg-zinc-950/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#C5A880]/20 text-[#E6CA9E] font-serif font-bold text-sm">
              F
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Fulham Profile</span>
              <span className="text-xs font-mono text-[#C5A880] ml-2">[{model.agencyCode}]</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(model.id)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isFavorite
                    ? 'border-rose-500 bg-rose-500/20 text-rose-400'
                    : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-rose-400'
                }`}
                title={isFavorite ? 'Remove from saved' : 'Save to shortlist'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:text-white transition-colors"
              title="Share Comp Card"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:text-white transition-colors"
              title="Print Zed Card"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Card</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors ml-2"
              aria-label="Close Comp Card"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Comp Card Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Comp Card Front Hero Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Primary High-Fashion Headshot */}
            <div className="md:col-span-6 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[3/4] relative shadow-lg">
              <img
                src={model.coverImage}
                alt={`${model.name} primary headshot`}
                className="w-full h-full object-contain object-center"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                <span className="text-[10px] uppercase tracking-widest text-[#E6CA9E] font-semibold">Fulham Portfolio</span>
                <h2 className="font-serif text-3xl font-bold tracking-wide text-white">{model.name}</h2>
              </div>
            </div>

            {/* Secondary Editorial Shots & Official Specs Table */}
            <div className="md:col-span-6 flex flex-col space-y-5">
              
              {/* Secondary Lookbook Shots */}
              <div className="grid grid-cols-2 gap-3">
                {model.gallery.slice(0, 2).map((photo, i) => (
                  <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden border border-zinc-800/80 bg-zinc-950 relative group">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 text-[10px] text-zinc-300 truncate">
                      {photo.client}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Measurements Table (Zed Card Industry Standard) */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E6CA9E]">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Measurements</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">Bust / waist / hips in inches</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Height:</span>
                    <span className="font-mono text-zinc-200 font-medium">{model.measurements.height}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Bust / Chest:</span>
                    <span className="font-mono text-zinc-200 font-medium">{model.measurements.bust}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Waist:</span>
                    <span className="font-mono text-zinc-200 font-medium">{model.measurements.waist}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Hips:</span>
                    <span className="font-mono text-zinc-200 font-medium">{model.measurements.hips}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Shoe Size:</span>
                    <span className="font-mono text-zinc-200 font-medium">{model.measurements.shoe}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Dress Size:</span>
                    <span className="font-mono text-zinc-200 font-medium">{model.measurements.dressSize || '34-36 EU'}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Eyes:</span>
                    <span className="text-zinc-200">{model.measurements.eyes}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1">
                    <span className="text-zinc-500">Hair:</span>
                    <span className="text-zinc-200">{model.measurements.hair}</span>
                  </div>
                </div>

                {/* Markets & Category */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Location: <strong className="text-white">{model.market}</strong></span>
                  </div>
                  <div>
                    {model.secondaryMarkets && model.secondaryMarkets.length > 0 && (
                      <span className="text-zinc-500">Secondary: {model.secondaryMarkets.join(', ')}</span>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Model Biography & Past Editorial Campaigns */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4">
            <h4 className="text-xs uppercase tracking-widest text-[#E6CA9E] font-semibold mb-2">About Fulham</h4>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">{model.bio}</p>


          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="border-t border-zinc-800 p-4 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-400">
            <span>Rate: </span>
            <strong className="text-white font-mono">${model.dayRate.toLocaleString()} USD</strong>
            <span className="text-zinc-500"> (8h Full Day) · </span>
            <strong className="text-white font-mono">${model.halfDayRate.toLocaleString()} USD</strong>
            <span className="text-zinc-500"> (4h Half Day)</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={buildDirectTalentChatUrl(model.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-2.5 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all"
            >
              <MessageSquareText className="w-3.5 h-3.5" />
              <span>WhatsApp Inquiry</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenBooking(model);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A880] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Schedule Casting</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
