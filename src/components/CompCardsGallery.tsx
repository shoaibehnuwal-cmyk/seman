import React from 'react';
import { ShieldCheck, Calendar, Eye, Heart } from 'lucide-react';
import { ModelProfile } from '../types/model';

interface CompCardsGalleryProps {
  models: ModelProfile[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenCompCard: (model: ModelProfile) => void;
  onOpenBooking: (model: ModelProfile) => void;
}

export const CompCardsGallery: React.FC<CompCardsGalleryProps> = ({
  models,
  favorites,
  onToggleFavorite,
  onOpenCompCard,
  onOpenBooking,
}) => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Fulham Profile & Measurements
            </h2>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            My profile, measurements and booking details, all in one place.
          </p>
        </div>

        <div className="text-xs text-zinc-400 font-mono">
          Showing <strong className="text-white">{models.length}</strong> Profile
        </div>
      </div>

      {/* Comp Cards Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => {
          const isFav = favorites.includes(model.id);

          return (
            <div
              key={model.id}
              className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden shadow-xl hover:border-[#C5A880]/60 transition-all flex flex-col"
            >
              {/* Comp Card Header Strip */}
              <div className="bg-zinc-950 px-4 py-2.5 border-b border-zinc-800/80 flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-[#E6CA9E] tracking-wider">FULHAM PORTFOLIO</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-400">{model.agencyCode}</span>
                  <button
                    onClick={() => onToggleFavorite(model.id)}
                    className={`p-1 rounded-full hover:bg-zinc-800 transition-colors ${
                      isFav ? 'text-rose-400' : 'text-zinc-500 hover:text-rose-400'
                    }`}
                    title={isFav ? 'Remove from saved' : 'Save to shortlist'}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Split Photo Section (Comp Card Look) */}
              <div className="grid grid-cols-2 gap-1 p-2 bg-zinc-950/60 aspect-[4/3] overflow-hidden">
                <div className="h-full rounded overflow-hidden relative">
                  <img
                    src={model.coverImage}
                    alt={model.name}
                    className="w-full h-full object-contain object-center"
                    loading="lazy"
                  />
                  <div className="absolute bottom-1 left-1.5 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-zinc-200">
                    Headshot
                  </div>
                </div>
                <div className="grid grid-rows-2 gap-1 h-full">
                  {model.gallery.slice(0, 2).map((photo, i) => (
                    <div key={i} className="h-full rounded overflow-hidden relative">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-contain object-center"
                        loading="lazy"
                      />
                      <div className="absolute bottom-1 left-1.5 bg-black/70 px-1 py-0.5 rounded text-[8px] text-zinc-300 truncate max-w-[90%]">
                        {photo.client}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comp Card Measurement Matrix */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E6CA9E] transition-colors">
                      {model.name}
                    </h3>
                    <span className="text-[11px] font-mono text-[#C5A880] uppercase tracking-wider">{model.market}</span>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs border border-zinc-800 rounded-xl bg-zinc-950/80 p-2 font-mono">
                    <div>
                      <span className="text-[9px] uppercase text-zinc-500 block">Height</span>
                      <span className="text-zinc-200 font-medium text-[11px]">{model.measurements.height.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-zinc-500 block">Bust (in)</span>
                      <span className="text-zinc-200 font-medium text-[11px]">{model.measurements.bust.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-zinc-500 block">Waist (in)</span>
                      <span className="text-zinc-200 font-medium text-[11px]">{model.measurements.waist.split(' ')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase text-zinc-500 block">Hips (in)</span>
                      <span className="text-zinc-200 font-medium text-[11px]">{model.measurements.hips.split(' ')[0]}</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-zinc-400 px-1">
                    <span>Shoe: <strong className="text-zinc-200 font-mono">{model.measurements.shoe.split('/')[0]}</strong></span>
                    <span>Eyes: <strong className="text-zinc-200">{model.measurements.eyes}</strong></span>
                    <span>Hair: <strong className="text-zinc-200">{model.measurements.hair.split(' ')[0]}</strong></span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenCompCard(model)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800/60 py-2 text-xs font-medium text-zinc-200 hover:text-white hover:border-[#C5A880] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Inspect Card</span>
                  </button>

                  <button
                    onClick={() => onOpenBooking(model)}
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A880] py-2 text-xs font-bold text-black shadow hover:brightness-105 active:scale-95 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
