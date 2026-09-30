import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';
import { ModelProfile } from '../types/model';

interface HeroShowcaseProps {
  featuredModel: ModelProfile;
  onOpenBooking: (model: ModelProfile) => void;
  onOpenCompCard: (model: ModelProfile) => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  featuredModel,
  onOpenBooking,
  onOpenCompCard,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-950 via-[#0e0e11] to-zinc-950 pt-8 pb-12 sm:pt-12 sm:pb-16">
      {/* Subtle ambient luxury backlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-gradient-to-b from-[#C5A880]/10 via-[#D4AF37]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Agency Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Season Tag */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#E6CA9E] mb-5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Fulham · London · SW6 7SX</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.1] text-balance">
              Welcome to <span className="italic font-light text-[#E6CA9E]">Fulham</span> Portfolio
            </h1>

            <p className="mt-5 text-sm sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
              Explore my gallery and get in touch to discuss availability. Find me at Lille Road, SW6 7SX, near West Brompton. Charges range from $110 to $1,150 USD. Confirm your package and final price on WhatsApp.
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-zinc-800/80 py-4 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>$110–$1,150 USD</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp Enquiries</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Near West Brompton</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenBooking(featuredModel)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E6CA9E] via-[#D4AF37] to-[#C5A880] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-[#D4AF37]/15 hover:brightness-105 active:scale-95 transition-all"
              >
                <span>Book Fulham</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenCompCard(featuredModel)}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:border-[#C5A880] hover:text-white transition-all"
              >
                <span>View Profile</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Runway Model Spotlight */}
          <div className="lg:col-span-5">
            <div className="relative group mx-auto max-w-sm lg:max-w-none rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-zinc-950">
                <img
                  src={featuredModel.coverImage}
                  alt={featuredModel.name}
                  className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Floating Agency Badge */}
                <div className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-mono tracking-wider text-zinc-300 backdrop-blur-md">
                  {featuredModel.agencyCode} · {featuredModel.market.toUpperCase()}
                </div>

                {/* Active Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 text-[10px] font-semibold text-emerald-300 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Booking Enquiries
                </div>

                {/* Bottom Details Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[11px] uppercase tracking-widest text-[#E6CA9E] font-medium">
                    Personal Portfolio
                  </div>
                  <h3 className="font-serif text-2xl font-bold tracking-wide">
                    {featuredModel.name}
                  </h3>
                  
                  {/* Measurements Preview */}
                  <div className="mt-1 flex items-center gap-2 text-xs text-zinc-300 font-mono">
                    <span>{featuredModel.measurements.height}</span>
                    <span>·</span>
                    <span>{featuredModel.measurements.bust}-{featuredModel.measurements.waist}-{featuredModel.measurements.hips}</span>
                  </div>

                  {/* Day Rate & Button */}
                  <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2.5">
                    <div>
                      <span className="text-[10px] uppercase text-zinc-400 block">Day Rate (8h)</span>
                      <span className="text-sm font-semibold text-[#E6CA9E] font-mono">
                        ${featuredModel.dayRate.toLocaleString()} USD
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenBooking(featuredModel)}
                      className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-black hover:bg-[#E6CA9E] transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
