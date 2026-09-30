import { ModelProfile } from '../types/model';

// Import images directly
import img1 from '../../gallery/Gemini_Generated_Image_zd2gh1zd2gh1zd2g (1).png';
import img2 from '../../gallery/Gemini_Generated_Image_zd2gh1zd2gh1zd2g (1).jfif';
import img3 from '../../gallery/Gemini_Generated_Image_zd2gh1zd2gh1zd2g (2).jfif';
import img4 from '../../gallery/gettyimages-2190851700-170667a.jpg';
import img5 from '../../gallery/gettyimages-2190851702-170667a.jpg';

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
