import React from 'react';
import { MessageSquareText, Shield, Sparkles, MapPin } from 'lucide-react';
import { DEFAULT_AGENCY_WHATSAPP } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C5A880]/50 bg-zinc-900 text-[#E6CA9E] font-serif font-bold text-base">
                F
              </div>
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-white">
                FULHAM
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Explore the Fulham portfolio. Charges from $110 to $1,150 USD. Contact me on WhatsApp for availability and booking enquiries.
            </p>
            <p className="flex items-center gap-2 text-xs text-zinc-400 pt-1"><MapPin className="h-4 w-4 shrink-0 text-[#C5A880]" />Lille Road, SW6 7SX — near West Brompton</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-zinc-200">Portfolio Details</h4>
            <ul className="space-y-1.5">
              <li><span className="hover:text-white transition-colors cursor-pointer">Personal Photo Gallery</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Profile & Measurements</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Availability & Booking Enquiries</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Lille Road, SW6 7SX</span></li>
            </ul>
          </div>

          {/* WhatsApp Concierge */}
          <div className="space-y-3 text-xs">
            <h4 className="font-semibold uppercase tracking-wider text-zinc-200">WhatsApp Enquiries</h4>
            <p className="text-zinc-400">
              Discuss availability and bookings directly on WhatsApp:
            </p>
            <a
              href={`https://wa.me/${DEFAULT_AGENCY_WHATSAPP}?text=${encodeURIComponent('Hello Fulham, I would like to enquire about your availability.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 px-3.5 py-2 font-semibold text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>+447757660727</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} Fulham. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>PWA Offline Enabled</span>
            </span>
            <span>·</span>
            <span>Fulham Personal Portfolio</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
