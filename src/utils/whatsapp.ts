import { AppointmentBooking } from '../types/model';

// Fulham WhatsApp contact
export const DEFAULT_AGENCY_WHATSAPP = '447757660727'; 

export function buildWhatsAppBookingUrl(booking: AppointmentBooking, targetPhone: string = DEFAULT_AGENCY_WHATSAPP): string {
  const cleanPhone = targetPhone.replace(/[^0-9]/g, '');

  const text = `✨ *FULHAM — APPOINTMENT REQUEST* ✨

👤 *Talent:* ${booking.modelName}
📅 *Shoot Date:* ${booking.shootDate}
⏰ *Call Time:* ${booking.callTime} (${booking.duration})
🏛 *Project Category:* ${booking.campaignType}
📍 *Location / Studio:* ${booking.location || 'To be specified'}

🏢 *Client / Brand:* ${booking.clientName} · ${booking.companyName || 'Independent Production'}
📱 *Client Contact:* ${booking.clientPhone}
📧 *Client Email:* ${booking.clientEmail}

💵 *Estimated Rate:* $${booking.estimatedFee.toLocaleString()} USD
📝 *Brief & Moodboard Notes:*
${booking.creativeNotes ? booking.creativeNotes : 'Standard commercial/editorial usage. Lookbook details to follow.'}

_Sent via Fulham Progressive Web App_`;

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildDirectTalentChatUrl(talentName: string, phone: string = DEFAULT_AGENCY_WHATSAPP): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const text = encodeURIComponent(`Hello Fulham, I am inquiring about availability and comp cards for talent: ${talentName}.`);
  return `https://wa.me/${cleanPhone}?text=${text}`;
}
