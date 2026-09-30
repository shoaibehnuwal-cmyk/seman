import React from 'react';
import { Heart, ArrowRight, Trash2, MessageSquareText, Sparkles } from 'lucide-react';
import { ModelProfile } from '../types/model';
import { ModelCard } from './ModelCard';
import { DEFAULT_AGENCY_WHATSAPP } from '../utils/whatsapp';

interface SavedTalentsViewProps {
  favoriteModels: ModelProfile[];
  onToggleFavorite: (id: string) => void;
  onClearFavorites: () => void;
  onOpenBooking: (model: ModelProfile) => void;
  onOpenCompCard: (model: ModelProfile) => void;
  onOpenGallery: (model: ModelProfile, initialIndex?: number) => void;
  onExploreRoster: () => void;
}

export const SavedTalentsView: React.FC<SavedTalentsViewProps> = ({
  favoriteModels,
  onToggleFavorite,
  onClearFavorites,
  onOpenBooking,
  onOpenCompCard,
  onOpenGallery,
  onExploreRoster,
}) => {
  // Generate a WhatsApp shortlist dispatch link
  const handleExportShortlistWhatsApp = () => {
    if (favoriteModels.length === 0) return;

    const listText = favoriteModels
      .map((m, idx) => `${idx + 1}. *${m.name}* (${m.agencyCode}) — ${m.market} · ${m.category} (Day: $${m.dayRate})`)
      .join('\n');

    const message = `✨ *FULHAM — PORTFOLIO ENQUIRY* ✨

Hello Fulham, I saved your portfolio and would like to confirm your availability:

${listText}

Please let me know your availability and booking details. Thank you!`;

    const url = `https://wa.me/${DEFAULT_AGENCY_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800/80 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Saved Portfolio
            </h2>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Keep the Fulham portfolio handy for your next enquiry.
          </p>
        </div>

        {favoriteModels.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportShortlistWhatsApp}
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 px-3.5 py-2 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/25 transition-colors shadow-sm"
              title="Enquire about Fulham on WhatsApp"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </button>

            <button
              onClick={onClearFavorites}
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-400 hover:text-rose-400 hover:border-rose-900/50 transition-colors"
              title="Remove saved portfolio"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear List</span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {favoriteModels.length === 0 ? (
        <div className="my-16 rounded-2xl border border-dashed border-zinc-800 p-12 text-center max-w-lg mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-rose-400/80 mb-4">
            <Heart className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white mb-2">No Saved Portfolio Yet</h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Use the heart icon on the Fulham profile to save it for your next enquiry.
          </p>
          <button
            onClick={onExploreRoster}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A880] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-md hover:brightness-105 transition-all"
          >
            <span>Explore Portfolio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>{favoriteModels.length} {favoriteModels.length === 1 ? 'portfolio' : 'portfolios'} saved</span>
            <span className="text-[#C5A880]">Fulham Portfolio</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                isFavorite={true}
                onToggleFavorite={onToggleFavorite}
                onOpenBooking={onOpenBooking}
                onOpenCompCard={onOpenCompCard}
                onOpenGallery={onOpenGallery}
              />
            ))}
          </div>
        </div>
      )}

    </section>
  );
};
