import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Building2, User, Phone, Mail, FileText, CheckCircle2, MessageSquareText, Sparkles, DollarSign } from 'lucide-react';
import { ModelProfile, AppointmentBooking, CampaignType } from '../types/model';
import { buildWhatsAppBookingUrl, DEFAULT_AGENCY_WHATSAPP } from '../utils/whatsapp';

interface BookingModalProps {
  model: ModelProfile;
  onClose: () => void;
  onBookingSuccess: (booking: AppointmentBooking) => void;
}

const CAMPAIGN_TYPES: CampaignType[] = [
  'Runway Show',
  'Editorial Magazine Shoot',
  'Global Campaign / Ad',
  'Lookbook & Catalog',
  'Fitting & Casting Call',
];

const TIME_SLOTS = [
  '07:30 AM (Early Call)',
  '08:30 AM',
  '09:30 AM',
  '11:00 AM',
  '01:00 PM (Afternoon)',
  '02:30 PM',
  '04:00 PM',
  '06:00 PM (Evening Runway)',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  model,
  onClose,
  onBookingSuccess,
}) => {
  // Today's date in YYYY-MM-DD format for min date
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const defaultDateStr = tomorrowDate.toISOString().split('T')[0];

  const [shootDate, setShootDate] = useState(defaultDateStr);
  const [callTime, setCallTime] = useState('09:30 AM');
  const [duration, setDuration] = useState<'Full Day (8 hrs)' | 'Half Day (4 hrs)' | 'Fitting (2 hrs)'>('Full Day (8 hrs)');
  const [campaignType, setCampaignType] = useState<CampaignType>('Editorial Magazine Shoot');
  const [location, setLocation] = useState('Lille Road, SW6 7SX — near West Brompton');
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [creativeNotes, setCreativeNotes] = useState('');
  const [agencyWhatsApp, setAgencyWhatsApp] = useState(DEFAULT_AGENCY_WHATSAPP); // Fulham contact

  // Form error & success states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedBooking, setSubmittedBooking] = useState<AppointmentBooking | null>(null);

  // Calculate estimated fee
  let estimatedFee = model.dayRate;
  if (duration === 'Half Day (4 hrs)') {
    estimatedFee = model.halfDayRate;
  } else if (duration === 'Fitting (2 hrs)') {
    estimatedFee = model.hourlyRate * 2;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!clientName.trim()) newErrors.clientName = 'Client / Booker name is required.';
    if (!clientPhone.trim()) newErrors.clientPhone = 'WhatsApp phone number is required.';
    if (!shootDate) newErrors.shootDate = 'Please select a shoot date.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newBooking: AppointmentBooking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      modelId: model.id,
      modelName: model.name,
      modelImage: model.coverImage,
      clientName: clientName.trim(),
      companyName: companyName.trim() || 'Independent Studio',
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim(),
      shootDate,
      callTime,
      duration,
      campaignType,
      location: location.trim(),
      creativeNotes: creativeNotes.trim(),
      estimatedFee,
      currency: 'USD',
      createdAt: new Date().toISOString(),
      status: 'Pending Agency Confirmation',
    };

    // Open WhatsApp with structured brief
    const waUrl = buildWhatsAppBookingUrl(newBooking, agencyWhatsApp);
    window.open(waUrl, '_blank');

    // Notify parent state & save
    onBookingSuccess(newBooking);
    setSubmittedBooking(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-800 bg-[#0e0e11] text-zinc-100 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4 bg-zinc-950/80">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-[#E6CA9E] font-serif font-bold text-base">
              F
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-white tracking-wide">
                Schedule Casting Appointment
              </h2>
              <p className="text-xs text-zinc-400">
                Official talent dispatch for <span className="text-[#E6CA9E] font-semibold">{model.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {submittedBooking ? (
          /* Confirmation State */
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#E6CA9E] font-semibold">Appointment Request Dispatched</span>
              <h3 className="font-serif text-2xl font-bold text-white">Booking Brief Generated</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Your casting request for <strong>{submittedBooking.modelName}</strong> on <strong>{submittedBooking.shootDate}</strong> ({submittedBooking.callTime}) has been prepared and formatted for direct WhatsApp confirmation.
              </p>
            </div>

            {/* Booking Brief Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-500">Booking Reference:</span>
                <span className="font-mono text-[#E6CA9E] font-bold">{submittedBooking.id}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-500">Project Type:</span>
                <span className="text-zinc-200">{submittedBooking.campaignType}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-500">Duration:</span>
                <span className="text-zinc-200">{submittedBooking.duration}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                <span className="text-zinc-500">Location:</span>
                <span className="text-zinc-200">{submittedBooking.location}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-zinc-500">Estimated Talent Fee:</span>
                <span className="font-mono text-emerald-400 font-bold">${submittedBooking.estimatedFee.toLocaleString()} USD</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={buildWhatsAppBookingUrl(submittedBooking, agencyWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-xs font-bold text-black shadow-lg hover:bg-[#20ba59] transition-all"
              >
                <MessageSquareText className="w-4 h-4" />
                <span>Re-open WhatsApp Chat</span>
              </a>

              <button
                onClick={onClose}
                className="w-full sm:w-auto rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
              >
                Close & Return to Roster
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
            
            {/* Talent Summary Banner */}
            <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-3.5">
              <img
                src={model.coverImage}
                alt={model.name}
                className="h-16 w-12 rounded-lg object-cover object-top border border-zinc-800 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-bold text-white truncate">{model.name}</span>
                  <span className="font-mono text-[10px] text-[#C5A880] border border-[#C5A880]/30 rounded px-1.5 py-0.2">
                    {model.agencyCode}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 truncate">
                  {model.category} · {model.market} ({model.measurements.height.split('/')[0]})
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-zinc-500">Day Rate:</span>
                  <span className="font-mono font-semibold text-emerald-400">${model.dayRate.toLocaleString()} USD</span>
                </div>
              </div>
            </div>

            {/* Date Picker & Time Slots */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#E6CA9E]">
                1. Select Shoot / Casting Date & Time
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Date Input */}
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Appointment Date</span>
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={shootDate}
                    onChange={(e) => setShootDate(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                    required
                  />
                  {errors.shootDate && <p className="text-xs text-rose-400 mt-1">{errors.shootDate}</p>}
                </div>

                {/* Call Time */}
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Call Time</span>
                  </label>
                  <select
                    value={callTime}
                    onChange={(e) => setCallTime(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Duration Segmented Control */}
              <div className="pt-2">
                <span className="text-[11px] text-zinc-400 block mb-1.5">Booking Duration Tier:</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Full Day (8 hrs)', 'Half Day (4 hrs)', 'Fitting (2 hrs)'] as const).map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`rounded-xl border p-2 text-center text-xs transition-all ${
                        duration === d
                          ? 'border-[#C5A880] bg-[#C5A880]/15 text-[#E6CA9E] font-medium'
                          : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="block font-medium">{d}</span>
                      <span className="text-[10px] text-zinc-500 font-mono mt-0.5 block">
                        {d === 'Full Day (8 hrs)' && `$${model.dayRate.toLocaleString()}`}
                        {d === 'Half Day (4 hrs)' && `$${model.halfDayRate.toLocaleString()}`}
                        {d === 'Fitting (2 hrs)' && `$${(model.hourlyRate * 2).toLocaleString()}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Category & Studio Location */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#E6CA9E]">
                2. Project & Location Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1">Campaign Type</label>
                  <select
                    value={campaignType}
                    onChange={(e) => setCampaignType(e.target.value as CampaignType)}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                  >
                    {CAMPAIGN_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Studio / Shoot Location</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Studio Daylight Paris, Le Marais"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Client / Booker Contact Information */}
            <div className="space-y-3 pt-2 border-t border-zinc-800/80">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#E6CA9E]">
                3. Booker & Client Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Your Full Name / Booker *</span>
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Marc Jacobs / Claire Fontaine"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                    required
                  />
                  {errors.clientName && <p className="text-xs text-rose-400 mt-1">{errors.clientName}</p>}
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Brand / Production Agency</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Condé Nast, L'Oréal Studio, Vogue"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Client WhatsApp / Mobile *</span>
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="Your WhatsApp number, including country code"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                    required
                  />
                  {errors.clientPhone && <p className="text-xs text-rose-400 mt-1">{errors.clientPhone}</p>}
                </div>

                <div>
                  <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Email Address (for Call Sheet PDF)</span>
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="casting@brand.com"
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              {/* Creative Brief / Moodboard Link */}
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Creative Brief / Wardrobe / Moodboard Link</span>
                </label>
                <textarea
                  rows={2}
                  value={creativeNotes}
                  onChange={(e) => setCreativeNotes(e.target.value)}
                  placeholder="Include stylist notes, theme, hair/makeup directions, or Google Drive moodboard link..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 text-xs text-white focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              {/* Agency Dispatcher Phone config (Optional) */}
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/50 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <MessageSquareText className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Target Agency Dispatch WhatsApp:</span>
                  </span>
                  <input
                    type="text"
                    value={agencyWhatsApp}
                    onChange={(e) => setAgencyWhatsApp(e.target.value)}
                    placeholder="447757660727"
                    className="w-36 rounded-lg border border-zinc-800 bg-zinc-900 px-2 py-1 text-[11px] text-zinc-200 font-mono text-right focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Live Pricing Breakdown */}
            <div className="rounded-xl border border-[#C5A880]/30 bg-[#C5A880]/5 p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white">Estimated Agency Fee ({duration})</span>
                <p className="text-[11px] text-zinc-400">Includes model booking fee & casting coordination</p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xl font-bold text-[#E6CA9E]">
                  ${estimatedFee.toLocaleString()}
                </span>
                <span className="text-[11px] text-zinc-400 ml-1">USD</span>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg hover:brightness-110 active:scale-98 transition-all"
            >
              <MessageSquareText className="w-4 h-4 stroke-[2.5]" />
              <span>Dispatch Booking Request Directly to WhatsApp</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
