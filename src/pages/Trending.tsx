import React from 'react';
import { TRENDING } from '../lib/constants';
import type { NewsCard } from '../lib/types';
import { CategoryBadge, ClusterBadge } from './Home';

export function Trending({ onCardClick }: { onCardClick: (card: NewsCard) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 sm:px-6 border-b border-[#E9ECEF]">
        <h2 className="font-serif font-bold text-[#1A1A1A] text-xl sm:text-2xl">Trending Now</h2>
        <p className="text-[#6C757D] text-xs sm:text-sm mt-0.5">Most-read stories across the network in the last 24 hours</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Desktop 2-column grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {TRENDING.map((card, i) => (
            <article
              key={card.id}
              onClick={() => onCardClick(card)}
              className="flex gap-4 p-4 rounded-xl border border-[#E9ECEF] hover:shadow-md transition-shadow cursor-pointer bg-white"
            >
              <span className="font-serif font-bold text-3xl text-gray-300 w-8 select-none">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <CategoryBadge category={card.category} />
                  <span className="text-[10px] text-[#6C757D]">{card.time}</span>
                </div>
                <h3 className="font-serif font-semibold text-[#1A1A1A] text-base leading-snug mb-2 hover:text-[#1A73E8]">
                  {card.headline}
                </h3>
                <p className="text-xs text-[#6C757D] line-clamp-2 mb-2">{card.summary}</p>
                {card.sources && card.sourcesCount && <ClusterBadge sources={card.sources} count={card.sourcesCount} />}
              </div>
              <img src={card.image} alt={card.headline} className="w-24 h-24 object-cover rounded-lg flex-shrink-0 bg-[#F8F9FA]" />
            </article>
          ))}
        </div>

        {/* Mobile/Tablet list view */}
        <div className="lg:hidden divide-y divide-[#E9ECEF]">
          {TRENDING.map((card, i) => (
            <div
              key={card.id}
              onClick={() => onCardClick(card)}
              className="flex gap-3 py-4 cursor-pointer group"
            >
              <span className="font-serif font-bold text-2xl sm:text-3xl text-gray-300 leading-none w-7 flex-shrink-0 select-none">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <CategoryBadge category={card.category} />
                  <span className="text-[10px] text-[#6C757D]">{card.time}</span>
                </div>
                <h3 className="font-serif font-semibold text-[#1A1A1A] text-sm leading-snug mb-2 group-hover:text-[#1A73E8] transition-colors">
                  {card.headline}
                </h3>
                {card.sources && card.sourcesCount && <ClusterBadge sources={card.sources} count={card.sourcesCount} />}
              </div>
              <img src={card.image} alt={card.headline} className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-lg flex-shrink-0 bg-[#F8F9FA]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}