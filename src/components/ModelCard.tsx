import React, { useState } from 'react';
import { MapPin, Calendar, FileText, MessageSquareText, Image as ImageIcon, Heart } from 'lucide-react';
import { ModelProfile } from '../types/model';
import { buildDirectTalentChatUrl } from '../utils/whatsapp';

interface ModelCardProps {
  model: ModelProfile;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onOpenBooking: (model: ModelProfile) => void;
  onOpenCompCard: (model: ModelProfile) => void;
  onOpenGallery: (model: ModelProfile, initialIndex?: number) => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isFavorite = false,
  onToggleFavorite,
  onOpenBooking,
  onOpenCompCard,
  onOpenGallery,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = model.gallery.map(g => g.url);

  return (
    <article className="group flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden shadow-xl transition-all duration-300 hover:border-[#C5A880]/60 hover:shadow-2xl hover:shadow-[#C5A880]/5">
      
      {/* Photo Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
        <img
          src={images[activeImageIndex] || model.coverImage}
          alt={`${model.name} fashion editorial portfolio`}
          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/30 pointer-events-none" />

        {/* Top Badges & Favorite Heart */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-200 backdrop-blur-md">
            <MapPin className="w-3 h-3 text-[#C5A880]" />
            <span>{model.market}</span>
          </div>

          <div className="flex items-center gap-2">
            {model.isAvailable ? (
              <div className="flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-medium text-emerald-300 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="hidden sm:inline">Available</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 rounded-full bg-zinc-900/80 border border-zinc-700/60 px-2.5 py-1 text-[10px] font-medium text-zinc-400 backdrop-blur-md">
                <span>On Set</span>
              </div>
            )}

            {/* Favorite Heart Button */}
            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(model.id);
                }}
                className={`flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-md transition-all active:scale-75 ${
                  isFavorite
                    ? 'border-rose-500 bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'border-white/25 bg-black/60 text-zinc-300 hover:text-rose-400 hover:border-rose-400/60'
                }`}
                aria-label={isFavorite ? `Remove ${model.name} from favorites` : `Save ${model.name} to favorites`}
                title={isFavorite ? 'Remove from saved shortlist' : 'Save to shortlist'}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Preview Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
            {images.slice(0, 4).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'w-5 bg-[#E6CA9E]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`View photo ${idx + 1}`}
              />
            ))}
            {images.length > 4 && (
              <span className="text-[10px] text-zinc-400 font-mono">+{images.length - 4}</span>
            )}
          </div>
        )}

        {/* Quick Gallery Lightbox Trigger */}
        <button
          onClick={() => onOpenGallery(model, activeImageIndex)}
          className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 border border-white/20 px-2.5 py-1 text-[11px] text-zinc-200 hover:text-white hover:bg-black/90 backdrop-blur-md transition-colors"
          title="Open photo gallery in high resolution"
        >
          <ImageIcon className="w-3 h-3 text-[#C5A880]" />
          <span>Gallery ({model.gallery.length})</span>
        </button>
      </div>

      {/* Model Information Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        
        {/* Category & Agency ID */}
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="text-[#C5A880] font-medium tracking-wide uppercase">{model.category}</span>
          <span className="font-mono text-zinc-500">{model.agencyCode}</span>
        </div>

        {/* Model Name */}
        <h3 
          onClick={() => onOpenCompCard(model)}
          className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide mt-1 cursor-pointer hover:text-[#E6CA9E] transition-colors"
        >
          {model.name}
        </h3>

        {/* Verified Measurement Metrics (Comp Card Quick Preview) */}
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-zinc-800/80 bg-zinc-950/60 p-2.5 text-center text-xs">
          <div>
            <span className="text-[10px] uppercase text-zinc-500 block">Height</span>
            <span className="font-mono font-medium text-zinc-200 text-[11px]">{model.measurements.height.split('/')[0]}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-zinc-500 block">Bust-Waist-Hips (in)</span>
            <span className="font-mono font-medium text-zinc-200 text-[11px]">
              {model.measurements.bust.split(' ')[0]}-{model.measurements.waist.split(' ')[0]}-{model.measurements.hips.split(' ')[0]}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-zinc-500 block">Shoe</span>
            <span className="font-mono font-medium text-zinc-200 text-[11px]">{model.measurements.shoe.split('/')[0]}</span>
          </div>
        </div>

        <p className="mt-3 text-xs text-zinc-400">
          Hourly rate: <span className="font-mono text-[#E6CA9E]">${model.hourlyRate.toLocaleString()} USD</span>
        </p>

        {/* Rates & Secondary Markets */}
        <div className="mt-4 flex items-baseline justify-between border-t border-zinc-800/70 pt-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Day Rate (8h)</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-semibold text-white font-mono">${model.dayRate.toLocaleString()}</span>
              <span className="text-[10px] text-zinc-400 font-mono">USD</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 block">Half Day</span>
            <span className="text-xs font-mono text-zinc-300">${model.halfDayRate.toLocaleString()} USD</span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="mt-4 grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onOpenCompCard(model)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-xs font-medium text-zinc-200 hover:border-[#C5A880] hover:text-white transition-all"
            title="Inspect official agency comp card"
          >
            <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Comp Card</span>
          </button>

          <button
            onClick={() => onOpenBooking(model)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A880] px-3 py-2 text-xs font-bold text-black shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Direct WhatsApp Quick Inquiry */}
        <a
          href={buildDirectTalentChatUrl(model.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 flex items-center justify-center gap-1 text-[11px] text-zinc-400 hover:text-[#25D366] transition-colors"
        >
          <MessageSquareText className="w-3 h-3 text-[#25D366]" />
          <span>Quick WhatsApp Inquiry for {model.name.split(' ')[0]}</span>
        </a>

      </div>
    </article>
  );
};
