import React from 'react';
import { Calendar, MessageSquareText, UserCheck, Heart } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { DEFAULT_AGENCY_WHATSAPP } from '../utils/whatsapp';

export type NavTab = 'roster' | 'compcards' | 'saved' | 'bookings';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  bookingCount: number;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  bookingCount,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo */}
        <div 
          onClick={() => onTabChange('roster')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5A880]/40 bg-zinc-900 text-[#E6CA9E] font-serif text-xl font-bold shadow-inner group-hover:border-[#C5A880] transition-colors">
            F
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-[0.2em] text-white leading-none group-hover:text-[#E6CA9E] transition-colors">
              FULHAM
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-sans font-medium mt-0.5">
              Portfolio
            </span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900/70 p-1">
          <button
            onClick={() => onTabChange('roster')}
            className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
              activeTab === 'roster'
                ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Portfolio
          </button>

          <button
            onClick={() => onTabChange('compcards')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
              activeTab === 'compcards'
                ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => onTabChange('saved')}
            className={`relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
              activeTab === 'saved'
                ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${activeTab === 'saved' ? 'fill-zinc-900 text-zinc-900' : 'text-rose-400'}`} />
            <span>Saved Portfolio</span>
            {savedCount > 0 && (
              <span className={`ml-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${
                activeTab === 'saved' ? 'bg-rose-500 text-white' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('bookings')}
            className={`relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all ${
              activeTab === 'bookings'
                ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#D4AF37] text-[10px] font-bold text-black">
                {bookingCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions: PWA Install & WhatsApp Direct */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <PWAInstallButton />

          <a
            href={`https://wa.me/${DEFAULT_AGENCY_WHATSAPP}?text=${encodeURIComponent('Hello Fulham, I would like to enquire about your availability and booking details.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/20 transition-all"
            title="Chat with Fulham on WhatsApp"
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="flex md:hidden border-t border-zinc-800/60 bg-zinc-950 px-3 py-2 justify-around">
        <button
          onClick={() => onTabChange('roster')}
          className={`text-xs font-medium py-1 px-2.5 rounded-full transition-colors ${
            activeTab === 'roster' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          Portfolio
        </button>
        <button
          onClick={() => onTabChange('compcards')}
          className={`text-xs font-medium py-1 px-2.5 rounded-full transition-colors ${
            activeTab === 'compcards' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => onTabChange('saved')}
          className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-full transition-colors ${
            activeTab === 'saved' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          <span>Saved</span>
          {savedCount > 0 && (
            <span className="rounded-full bg-rose-500 px-1.5 py-0.2 text-[9px] font-bold text-white">
              {savedCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onTabChange('bookings')}
          className={`flex items-center gap-1 text-xs font-medium py-1 px-2.5 rounded-full transition-colors ${
            activeTab === 'bookings' ? 'bg-zinc-800 text-white' : 'text-zinc-400'
          }`}
        >
          <span>Bookings</span>
          {bookingCount > 0 && (
            <span className="rounded-full bg-[#D4AF37] px-1.5 py-0.2 text-[9px] font-bold text-black">
              {bookingCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
