export interface ModelMeasurements {
  height: string;       // e.g. "179 cm / 5'10.5\""
  bust: string;         // e.g. "82 cm / 32.5\""
  waist: string;        // e.g. "60 cm / 23.5\""
  hips: string;         // e.g. "89 cm / 35\""
  shoe: string;         // e.g. "39 EU / 8.5 US"
  eyes: string;         // e.g. "Green"
  hair: string;         // e.g. "Dark Blonde"
  dressSize?: string;   // e.g. "34 EU / 2-4 US"
}

export interface EditorialPhoto {
  url: string;
  title: string;
  client: string;       // e.g. "Vogue Italia", "Chanel Haute Couture", "Prada FW26"
  photographer?: string;
  season?: string;
}

export type MarketCity = 'Paris' | 'Milan' | 'New York' | 'London';

export type ModelCategory = 'Personal Portfolio' | 'Runway & Haute Couture' | 'Editorial & Vogue' | 'Commercial & Beauty' | 'High Fashion Lookbook';

export interface ModelProfile {
  id: string;
  name: string;
  agencyCode: string;
  market: MarketCity;
  secondaryMarkets?: MarketCity[];
  category: ModelCategory;
  measurements: ModelMeasurements;
  dayRate: number;      // USD
  halfDayRate: number;  // USD
  hourlyRate: number;   // USD
  currency: string;
  isAvailable: boolean;
  coverImage: string;
  gallery: EditorialPhoto[];
  featuredCampaigns: string[];
  bio: string;
  instagram: string;
  experienceYears: number;
}

export type CampaignType =
  | 'Runway Show'
  | 'Editorial Magazine Shoot'
  | 'Global Campaign / Ad'
  | 'Lookbook & Catalog'
  | 'Fitting & Casting Call';

export interface AppointmentBooking {
  id: string;
  modelId: string;
  modelName: string;
  modelImage: string;
  clientName: string;
  companyName: string;
  clientPhone: string;
  clientEmail: string;
  shootDate: string;
  callTime: string;
  duration: 'Full Day (8 hrs)' | 'Half Day (4 hrs)' | 'Fitting (2 hrs)';
  campaignType: CampaignType;
  location: string;
  creativeNotes: string;
  estimatedFee: number;
  currency: string;
  createdAt: string;
  status: 'Pending Agency Confirmation' | 'Confirmed' | 'Completed';
}
