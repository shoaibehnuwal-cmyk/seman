import { ModelProfile } from '../types/model';

// Unsplash image URLs (high-resolution fashion/portrait placeholders)
const img1 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000';
const img2 = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000';
const img3 = 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1000';
const img4 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000';
const img5 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000';

export const INITIAL_MODELS: ModelProfile[] = [
  {
    id: 'fulham',
    name: 'Fulham',
    agencyCode: 'FULHAM-SW6',
    market: 'London',
    secondaryMarkets: [],
    category: 'Personal Portfolio',
    measurements: {
      height: "179 cm / 5'10.5\"",
      bust: '45 in',
      waist: '42 in',
      hips: '48 in',
      shoe: '39 EU / 8.5 US',
      eyes: 'Emerald Green',
      hair: 'Chestnut Brown',
      dressSize: '34 EU / 2 US',
    },
    dayRate: 1150,
    halfDayRate: 650,
    hourlyRate: 110,
    currency: 'USD',
    isAvailable: true,
    coverImage: img1,
    gallery: [
      { url: img1, title: 'Fulham Portfolio — Photo 1', client: 'Fulham' },
      { url: img2, title: 'Fulham Portfolio — Photo 2', client: 'Fulham' },
      { url: img3, title: 'Fulham Portfolio — Photo 3', client: 'Fulham' },
      { url: img4, title: 'Fulham Portfolio — Photo 4', client: 'Fulham' },
      { url: img5, title: 'Fulham Portfolio — Photo 5', client: 'Fulham' },
    ],
    featuredCampaigns: [],
    bio: 'Welcome to my personal portfolio. Based at Lille Road, SW6 7SX, near West Brompton. Contact me on WhatsApp for availability and bookings.',
    instagram: '',
    experienceYears: 0,
  },
];
