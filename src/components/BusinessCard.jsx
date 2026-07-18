import React from 'react';
import { Star, MapPin, Phone, Globe, ExternalLink, HelpCircle, FileText } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';
import FavoriteButton from './ui/FavoriteButton';
import { useFavorites } from '../context/FavoritesContext';

export default function BusinessCard({
  business,
  viewMode = 'list',
  isSelected = false,
  onSelect,
  onViewDetails,
  onExportSingle,
  distanceText
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(business.id);

  const getStatusBadge = (status, openNow) => {
    if (status === 'Closed') {
      return <Badge variant="danger">Closed</Badge>;
    }
    if (openNow) {
      return <Badge variant="success">Open Now</Badge>;
    }
    return <Badge variant="neutral">Offline</Badge>;
  };

  const getCategoryVariant = (cat) => {
    switch (cat) {
      case 'Cafes': return 'info';
      case 'Workspaces': return 'warning';
      case 'Health': return 'success';
      case 'Tourist': return 'neutral';
      default: return 'info';
    }
  };

  const handleCardClick = () => {
    onSelect && onSelect(business);
  };

  const formattedPrice = '$'.repeat(business.priceLevel || 1);

  if (viewMode === 'grid') {
    return (
      <div
        onClick={handleCardClick}
        className={`p-4 bg-white rounded-2.5xl border transition-all duration-300 cursor-pointer group flex flex-col gap-3 relative overflow-hidden animate-[fadeIn_0.2s_ease-out] ${
          isSelected
            ? 'border-brand-steel bg-brand-accent/20 ring-1 ring-brand-steel/30 shadow-md'
            : 'border-brand-border/30 hover:border-brand-steel/50 shadow-xs hover:shadow-md'
        }`}
      >
        {/* Top Image area */}
        <div className="h-36 w-full rounded-2xl overflow-hidden border border-slate-100 relative shrink-0">
          <img
            src={business.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80'}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-350"
          />
          {/* Favorite button absolute placement */}
          <div className="absolute right-3 top-3">
            <FavoriteButton
              isFav={isFav}
              onClick={() => toggleFavorite(business.id)}
            />
          </div>
          {/* Distance Text pill overlay */}
          {distanceText && (
            <div className="absolute left-3 bottom-3 px-2 py-0.5 rounded-lg bg-slate-900/75 text-white font-bold text-[8px] tracking-wide select-none">
              {distanceText}
            </div>
          )}
        </div>

        {/* Content detail area */}
        <div className="flex-grow flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant={getCategoryVariant(business.category)}>
                {business.category}
              </Badge>
              {getStatusBadge(business.businessStatus, business.openNow)}
              <span className="text-[9px] font-extrabold text-slate-400 pl-0.5">{formattedPrice}</span>
            </div>
            
            <h4 className="text-xs font-black text-slate-800 truncate pt-1 group-hover:text-brand-steel transition-colors">
              {business.name}
            </h4>
            
            <p className="text-[9px] text-slate-450 truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{business.address}</span>
            </p>
          </div>

          {/* Rating, contact and details button */}
          <div className="space-y-2.5 pt-1.5 border-t border-slate-100/80">
            <div className="flex items-center justify-between text-[9px] font-bold text-slate-400">
              <span className="flex items-center gap-0.5 text-slate-700 bg-brand-accent/50 px-2 py-0.5 rounded-lg">
                <Star className="w-3 h-3 fill-brand-steel stroke-brand-steel" />
                {business.rating}
              </span>
              <span>{business.reviews} reviews</span>
            </div>

            {business.phone && (
              <div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-450">
                <Phone className="w-3 h-3 shrink-0" />
                <span>{business.phone}</span>
              </div>
            )}

            <div className="flex gap-2 pt-1 select-none">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails && onViewDetails(business);
                }}
                className="flex-grow py-2 rounded-xl text-[10px]"
              >
                View Details
              </Button>
              
              {business.website ? (
                <Tooltip text="Visit business website">
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="h-8.5 w-8.5 rounded-xl border border-brand-border/40 hover:bg-slate-50 flex items-center justify-center text-slate-450 hover:text-brand-steel transition-all active:scale-95 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                  </a>
                </Tooltip>
              ) : (
                <div className="h-8.5 w-8.5 rounded-xl border border-brand-border/20 bg-slate-50 flex items-center justify-center text-slate-300 cursor-not-allowed">
                  <Globe className="w-3.5 h-3.5" />
                </div>
              )}

              {onExportSingle && (
                <Tooltip text="Export details">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportSingle(business);
                    }}
                    className="h-8.5 w-8.5 rounded-xl border border-brand-border/40 hover:bg-slate-50 flex items-center justify-center text-slate-450 hover:text-slate-800 transition-all active:scale-95 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT VIEWMODE IS LIST (ROW LAYOUT)
  return (
    <div
      onClick={handleCardClick}
      className={`p-4 rounded-2.5xl border transition-all duration-300 cursor-pointer group flex gap-3.5 relative overflow-hidden animate-[fadeIn_0.2s_ease-out] ${
        isSelected
          ? 'border-brand-steel bg-brand-accent/20 ring-1 ring-brand-steel/15 shadow-sm'
          : 'bg-white border-brand-border/30 hover:border-brand-steel/50 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Left thumbnail image */}
      <div className="w-18 h-18 rounded-xl overflow-hidden shrink-0 border border-slate-100 relative">
        <img
          src={business.image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80'}
          alt={business.name}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-350"
        />
        {distanceText && (
          <div className="absolute inset-x-0 bottom-0 py-0.5 bg-slate-900/60 text-white font-bold text-[7px] text-center select-none truncate">
            {distanceText}
          </div>
        )}
      </div>

      {/* Middle details column */}
      <div className="flex-grow min-w-0 pr-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Badge variant={getCategoryVariant(business.category)}>
              {business.category}
            </Badge>
            {getStatusBadge(business.businessStatus, business.openNow)}
            <span className="text-[8px] font-extrabold text-slate-400">{formattedPrice}</span>
          </div>

          <h4 className="text-xs font-black text-slate-700 mt-1 truncate group-hover:text-brand-steel transition-colors pt-0.5">
            {business.name}
          </h4>
          <p className="text-[9px] text-slate-400 mt-0.5 truncate flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{business.address}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-[9px] font-bold mt-1">
          <span className="flex items-center gap-0.5 text-slate-700 bg-brand-accent/50 px-2 py-0.5 rounded-lg">
            <Star className="w-3 h-3 fill-brand-steel stroke-brand-steel" />
            {business.rating}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400">{business.reviews} reviews</span>
        </div>
      </div>

      {/* Right panel with actions & favorite button */}
      <div className="absolute right-3.5 top-3.5 flex flex-col items-end gap-2.5">
        <FavoriteButton
          isFav={isFav}
          onClick={() => toggleFavorite(business.id)}
        />
        
        <div className="flex gap-1.5 select-none pt-0.5">
          {onExportSingle && (
            <Tooltip text="Export details">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExportSingle(business);
                }}
                className="h-7 w-7 rounded-lg border border-brand-border/40 hover:bg-slate-50 flex items-center justify-center text-slate-450 hover:text-slate-800 transition-all active:scale-95 cursor-pointer"
              >
                <FileText className="w-3 h-3" />
              </button>
            </Tooltip>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails && onViewDetails(business);
            }}
            className="px-2.5 py-1 rounded-lg text-[9px] border border-brand-border/40 bg-white"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
}
