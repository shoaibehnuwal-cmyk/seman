import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { ModelProfile, EditorialPhoto } from '../types/model';

interface LightboxModalProps {
  model: ModelProfile;
  photoIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onOpenBooking: (model: ModelProfile) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  model,
  photoIndex,
  onClose,
  onNavigate,
  onOpenBooking,
}) => {
  const allPhotos: EditorialPhoto[] = model.gallery;

  const currentPhoto = allPhotos[photoIndex] || allPhotos[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && photoIndex > 0) onNavigate(photoIndex - 1);
      if (e.key === 'ArrowRight' && photoIndex < allPhotos.length - 1) onNavigate(photoIndex + 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photoIndex, allPhotos.length, onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-2 sm:p-4 select-none">
      
      {/* Top Bar Controls */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-[#E6CA9E] font-serif font-bold text-sm">
            F
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-zinc-100">{model.name}</h3>
            <p className="text-xs text-[#C5A880]">{currentPhoto.client} · {currentPhoto.season || 'Editorial'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenBooking(model)}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C5A880] px-4 py-1.5 text-xs font-bold text-black hover:brightness-105 transition-all"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Book Casting</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-full bg-zinc-900/80 p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex items-center justify-center max-w-5xl max-h-[80vh] w-full mx-auto my-auto">
        <img
          src={currentPhoto.url}
          alt={currentPhoto.title}
          className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200"
        />

        {/* Previous Button */}
        {photoIndex > 0 && (
          <button
            onClick={() => onNavigate(photoIndex - 1)}
            className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 rounded-full bg-black/60 border border-zinc-700/80 p-2.5 text-white hover:bg-zinc-900 transition-colors"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {photoIndex < allPhotos.length - 1 && (
          <button
            onClick={() => onNavigate(photoIndex + 1)}
            className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 rounded-full bg-black/60 border border-zinc-700/80 p-2.5 text-white hover:bg-zinc-900 transition-colors"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Photo Caption & Filmstrip */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 z-20">
        <div>
          <span className="font-medium text-white">{currentPhoto.title}</span>
          {currentPhoto.photographer && (
            <span className="ml-2 text-zinc-500">· Photo: {currentPhoto.photographer}</span>
          )}
        </div>

        {/* Filmstrip dots */}
        <div className="flex items-center gap-1.5">
          {allPhotos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(idx)}
              className={`h-1.5 rounded-full transition-all ${
                photoIndex === idx ? 'w-6 bg-[#E6CA9E]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
          <span className="ml-2 font-mono text-[11px] text-zinc-500">
            {photoIndex + 1} / {allPhotos.length}
          </span>
        </div>
      </div>

    </div>
  );
};
