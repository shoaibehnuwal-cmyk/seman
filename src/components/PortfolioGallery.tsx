import React from 'react';
import { ModelProfile } from '../types/model';

interface PortfolioGalleryProps {
  model: ModelProfile;
  onOpenPhoto: (index: number) => void;
}

export function PortfolioGallery({ model, onOpenPhoto }: PortfolioGalleryProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-serif text-3xl text-white">{model.name} Gallery</h2>
      <p className="mt-2 text-sm text-zinc-400">Explore my photos. Select a photo to view it in full.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {model.gallery.map((photo, index) => (
          <button
            key={photo.url}
            onClick={() => onOpenPhoto(index)}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-left transition-colors hover:border-[#C5A880] focus-visible:outline-2 focus-visible:outline-[#C5A880]"
            aria-label={`View ${photo.title}`}
          >
            <img src={photo.url} alt={photo.title} loading="lazy" className="aspect-[4/3] w-full object-contain" />
            <div className="border-t border-zinc-800 px-4 py-3 flex items-center justify-between">
              <span className="font-serif text-xl text-white">{model.name}</span>
              <span className="text-xs text-zinc-400">Photo {index + 1}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
