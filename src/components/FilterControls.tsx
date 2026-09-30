import React from 'react';
import { Search, SlidersHorizontal, MapPin, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { MarketCity, ModelCategory } from '../types/model';

interface FilterControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedMarket: string;
  onMarketChange: (market: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  availableOnly: boolean;
  onAvailableOnlyChange: (val: boolean) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  totalResults: number;
  onReset: () => void;
}

const MARKETS: (MarketCity | 'All')[] = ['All', 'Paris', 'Milan', 'New York', 'London'];

const CATEGORIES: (ModelCategory | 'All')[] = [
  'All',
  'Runway & Haute Couture',
  'Editorial & Vogue',
  'Commercial & Beauty',
  'High Fashion Lookbook',
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedMarket,
  onMarketChange,
  selectedCategory,
  onCategoryChange,
  availableOnly,
  onAvailableOnlyChange,
  sortBy,
  onSortByChange,
  totalResults,
  onReset,
}) => {
  return (
    <div className="w-full border-b border-zinc-800/80 bg-zinc-950/60 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Top Filter Row: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by model name, agency code, or brand credits (e.g. Vogue, Chanel)..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 pl-10 pr-4 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:border-[#C5A880] focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Immediate Availability */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            
            {/* Availability Toggle */}
            <button
              onClick={() => onAvailableOnlyChange(!availableOnly)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                availableOnly
                  ? 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300'
                  : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${availableOnly ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <span>Available for Immediate Booking</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-200 focus:border-[#C5A880] focus:outline-none"
              >
                <option value="featured">Sort: Featured Roster</option>
                <option value="rate-asc">Day Rate: Low to High</option>
                <option value="rate-desc">Day Rate: High to Low</option>
                <option value="height-desc">Height: Tallest First</option>
                <option value="name-asc">Model Name: A-Z</option>
              </select>
            </div>

            {/* Reset Filters button if active */}
            {(searchQuery || selectedMarket !== 'All' || selectedCategory !== 'All' || availableOnly || sortBy !== 'featured') && (
              <button
                onClick={onReset}
                className="flex items-center gap-1 text-xs text-zinc-500 hover:text-[#E6CA9E] transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Markets Segmented Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-900">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mr-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#C5A880]" />
            <span>Market:</span>
          </span>

          {MARKETS.map((market) => (
            <button
              key={market}
              onClick={() => onMarketChange(market)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide transition-all ${
                selectedMarket === market
                  ? 'bg-[#C5A880]/20 border border-[#C5A880] text-[#E6CA9E]'
                  : 'border border-zinc-800/80 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {market}
            </button>
          ))}
        </div>

        {/* Category Segmented Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mr-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>Discipline:</span>
          </span>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`rounded-lg px-2.5 py-1 text-xs transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-100 font-semibold text-zinc-950'
                  : 'border border-zinc-800/60 bg-zinc-900/30 text-zinc-400 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}

          <span className="ml-auto text-xs text-zinc-500 font-mono">
            {totalResults} {totalResults === 1 ? 'talent' : 'talents'} matching
          </span>
        </div>

      </div>
    </div>
  );
};
