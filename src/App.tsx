/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { HeroShowcase } from './components/HeroShowcase';
import { PortfolioGallery } from './components/PortfolioGallery';
import { CompCardsGallery } from './components/CompCardsGallery';
import { SavedTalentsView } from './components/SavedTalentsView';
import { BookingsDrawer } from './components/BookingsDrawer';
import { CompCardModal } from './components/CompCardModal';
import { BookingModal } from './components/BookingModal';
import { LightboxModal } from './components/LightboxModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Footer } from './components/Footer';
import { INITIAL_MODELS } from './data/models';
import { ModelProfile, AppointmentBooking } from './types/model';

const BOOKINGS_STORAGE_KEY = 'fulham_bookings_v1';
const FAVORITES_STORAGE_KEY = 'fulham_favorites_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('roster');
  const [models] = useState<ModelProfile[]>(INITIAL_MODELS);

  // Bookings state with localStorage persistence
  const [bookings, setBookings] = useState<AppointmentBooking[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      const stored = saved ? JSON.parse(saved) : [];
      return Array.isArray(stored) ? stored.map((booking) => ({
        ...booking, modelId: models[0].id, modelName: models[0].name, modelImage: models[0].coverImage,
      })) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // Ignore localStorage write error if private mode
    }
  }, [bookings]);

  // Favorites state with localStorage persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const stored = saved ? JSON.parse(saved) : [];
      return Array.isArray(stored) && stored.length > 0 ? [models[0].id] : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore localStorage write error if private mode
    }
  }, [favorites]);

  const handleToggleFavorite = (modelId: string) => {
    setFavorites((prev) =>
      prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId]
    );
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  // Favorited models list
  const favoriteModels = useMemo(() => {
    return models.filter((m) => favorites.includes(m.id));
  }, [models, favorites]);

  // Modal states
  const [compCardModel, setCompCardModel] = useState<ModelProfile | null>(null);
  const [bookingModel, setBookingModel] = useState<ModelProfile | null>(null);
  const [lightbox, setLightbox] = useState<{ model: ModelProfile; photoIndex: number } | null>(null);

  const handleAddBooking = (newBooking: AppointmentBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleRemoveBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleOpenGallery = (model: ModelProfile, initialIndex: number = 0) => {
    setLightbox({ model, photoIndex: initialIndex });
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 flex flex-col font-sans selection:bg-[#C5A880]/30 selection:text-[#E6CA9E]">
      
      {/* Top Navigation Bar with PWA install button and Saved Talents badge */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        bookingCount={bookings.length}
        savedCount={favorites.length}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'roster' && (
          <>
            {/* Split Hero Showcase */}
            <HeroShowcase
              featuredModel={models[0]}
              onOpenBooking={(m) => setBookingModel(m)}
              onOpenCompCard={(m) => setCompCardModel(m)}
            />

            <PortfolioGallery
              model={models[0]}
              onOpenPhoto={(index) => handleOpenGallery(models[0], index)}
            />
          </>
        )}

        {/* Comp Cards Tab */}
        {activeTab === 'compcards' && (
          <CompCardsGallery
            models={models}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenCompCard={(m) => setCompCardModel(m)}
            onOpenBooking={(m) => setBookingModel(m)}
          />
        )}

        {/* Saved Talents Tab */}
        {activeTab === 'saved' && (
          <SavedTalentsView
            favoriteModels={favoriteModels}
            onToggleFavorite={handleToggleFavorite}
            onClearFavorites={handleClearFavorites}
            onOpenBooking={(m) => setBookingModel(m)}
            onOpenCompCard={(m) => setCompCardModel(m)}
            onOpenGallery={handleOpenGallery}
            onExploreRoster={() => setActiveTab('roster')}
          />
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <BookingsDrawer
            bookings={bookings}
            onRemoveBooking={handleRemoveBooking}
            onExploreRoster={() => setActiveTab('roster')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Offline Status Toast */}
      <OfflineIndicator />

      {/* Interactive Modals */}
      <CompCardModal
        model={compCardModel}
        isFavorite={compCardModel ? favorites.includes(compCardModel.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setCompCardModel(null)}
        onOpenBooking={(m) => setBookingModel(m)}
      />

      {bookingModel && (
        <BookingModal
          key={bookingModel.id}
          model={bookingModel}
          onClose={() => setBookingModel(null)}
          onBookingSuccess={handleAddBooking}
        />
      )}

      {lightbox && (
        <LightboxModal
          model={lightbox.model}
          photoIndex={lightbox.photoIndex}
          onClose={() => setLightbox(null)}
          onNavigate={(newIndex) => setLightbox({ ...lightbox, photoIndex: newIndex })}
          onOpenBooking={(m) => {
            setLightbox(null);
            setBookingModel(m);
          }}
        />
      )}

    </div>
  );
}
