import React from 'react';
import { Calendar, Clock, MapPin, MessageSquareText, Trash2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AppointmentBooking } from '../types/model';
import { buildWhatsAppBookingUrl } from '../utils/whatsapp';

interface BookingsDrawerProps {
  bookings: AppointmentBooking[];
  onRemoveBooking: (id: string) => void;
  onExploreRoster: () => void;
}

export const BookingsDrawer: React.FC<BookingsDrawerProps> = ({
  bookings,
  onRemoveBooking,
  onExploreRoster,
}) => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C5A880]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Fulham Booking Requests
            </h2>
          </div>
          <p className="mt-1 text-xs text-zinc-400">
            Track your submitted booking requests and WhatsApp enquiries with Fulham.
          </p>
        </div>

        <div className="text-xs text-zinc-400 font-mono">
          Total Bookings: <strong className="text-white">{bookings.length}</strong>
        </div>
      </div>

      {/* Bookings List or Empty State */}
      {bookings.length === 0 ? (
        <div className="my-16 rounded-2xl border border-dashed border-zinc-800 p-12 text-center max-w-lg mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-[#C5A880] mb-4">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white mb-2">No Scheduled Castings Yet</h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-6">
            Explore the Fulham portfolio and choose a date to send a booking request via WhatsApp.
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings.map((booking) => {
            const waUrl = buildWhatsAppBookingUrl(booking);

            return (
              <div
                key={booking.id}
                className="flex flex-col rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-xl hover:border-zinc-700 transition-all"
              >
                {/* Header: Reference ID and Status */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
                  <span className="font-mono text-xs font-semibold text-[#E6CA9E]">{booking.id}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/70 border border-amber-600/40 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    <span>{booking.status}</span>
                  </span>
                </div>

                {/* Talent Info */}
                <div className="flex items-center gap-3.5 my-3.5">
                  <img
                    src={booking.modelImage}
                    alt={booking.modelName}
                    className="h-14 w-11 rounded-lg object-cover object-top border border-zinc-800"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">{booking.modelName}</h4>
                    <span className="text-xs text-[#C5A880] font-medium">{booking.campaignType}</span>
                  </div>
                </div>

                {/* Date & Time Specs */}
                <div className="space-y-1.5 rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-3 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="font-semibold text-white">{booking.shootDate}</span>
                    <span className="text-zinc-500">·</span>
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{booking.callTime}</span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="truncate">{booking.location || 'Studio location'}</span>
                  </div>

                  <div className="pt-1.5 border-t border-zinc-900 flex justify-between items-center text-[11px]">
                    <span className="text-zinc-400">Estimated Rate ({booking.duration.split(' ')[0]}):</span>
                    <span className="font-mono font-bold text-emerald-400">${booking.estimatedFee.toLocaleString()} USD</span>
                  </div>
                </div>

                {/* Client Reference */}
                <div className="mt-3 text-[11px] text-zinc-400">
                  <span>Client: </span>
                  <span className="text-zinc-200">{booking.clientName}</span>
                  {booking.companyName && <span className="text-zinc-500"> ({booking.companyName})</span>}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-3 border-t border-zinc-800/70 flex items-center gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/40 px-3 py-2 text-xs font-semibold text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
                  >
                    <MessageSquareText className="w-3.5 h-3.5" />
                    <span>WhatsApp Brief</span>
                  </a>

                  <button
                    onClick={() => onRemoveBooking(booking.id)}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-2 text-zinc-400 hover:text-rose-400 hover:border-rose-900/50 transition-colors"
                    title="Remove booking"
                    aria-label="Remove booking"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
