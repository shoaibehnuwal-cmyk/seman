import { ModelProfile } from '../types/model';

// Draft package rates within the supplied USD 110–1,150 range.
// One profile supplies identity, measurements and rates to every view.
// Height and bust/waist/hips are user-confirmed.
// Shoe, eye/hair colour and dress size retain the original placeholder values.
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
    coverImage: '/gallery/fulham-portrait.png',
    gallery: [
      { url: '/gallery/fulham-portrait.png', title: 'Fulham Portfolio — Photo 1', client: 'Fulham' },
      { url: '/gallery/gettyimages-2190851700-170667a.jpg', title: 'Fulham Portfolio — Photo 2', client: 'Fulham' },
      { url: '/gallery/gettyimages-2190851700-170667a.jpg', title: 'Fulham Portfolio — Photo 3', client: 'Fulham' },
      { url: '/gallery/fulham-outdoor-01.jpg', title: 'Fulham Portfolio — Photo 4', client: 'Fulham' },
      { url: '/gallery/fulham-outdoor-02.jpg', title: 'Fulham Portfolio — Photo 5', client: 'Fulham' },
    ],
    featuredCampaigns: [],
    bio: 'Welcome to my personal portfolio. Based at Lille Road, SW6 7SX, near West Brompton. Contact me on WhatsApp for availability and bookings.',
    instagram: '',
    experienceYears: 0,
  },
];
