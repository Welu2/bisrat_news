import React, { useState } from 'react';
import { NEWS_DATA, BRAND } from '../lib/constants';
import type { Category, NewsCard } from '../lib/types';

export function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Politics: 'bg-blue-50 text-blue-700',
    Economy: 'bg-emerald-50 text-emerald-700',
    Culture: 'bg-purple-50 text-purple-700',
    Sport: 'bg-orange-50 text-orange-700',
    Tech: 'bg-sky-50 text-sky-700',
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded ${colors[category] ?? 'bg-gray-100 text-gray-600'}`}>
      {category}
    </span>
  );
}

export function ClusterBadge({ sources, count }: { sources: string; count: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#6C757D] bg-[#F8F9FA] border border-[#E9ECEF] rounded-full px-2 py-0.5">
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: BRAND }} />
      {sources}{count > 1 ? ` + ${count - 1} source${count - 1 > 1 ? 's' : ''}` : ''}
    </span>
  );
}

export function Home({ onCardClick }: { onCardClick: (card: NewsCard) => void }) {
  const [activeCategory, setActiveCategory] = useState<Category>('Top');
  const categories: Category[] = ['Top', 'Politics', 'Economy', 'Culture', 'Sport', 'Tech'];
  const cards = NEWS_DATA[activeCategory] || [];
  const featured = activeCategory === 'Top' ? cards[0] : null;
  const rest = activeCategory === 'Top' ? cards.slice(1) : cards;

  return (
    <div className="flex flex-col h-full">
      {/* Category Pills Bar */}
      <div className="border-b border-[#E9ECEF] bg-white sticky top-0 z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-2.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === cat ? 'text-white' : 'text-[#6C757D] hover:text-[#1A1A1A] hover:bg-[#F8F9FA]'
              }`}
              style={activeCategory === cat ? { background: BRAND } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Feed Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Desktop View: Multi-column responsive grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <article
              key={card.id}
              onClick={() => onCardClick(card)}
              className="group cursor-pointer rounded-xl overflow-hidden border border-[#E9ECEF] hover:shadow-md transition-shadow duration-200 bg-white flex flex-col"
            >
              <div className="overflow-hidden h-44 bg-[#F8F9FA]">
                <img src={card.image} alt={card.headline} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CategoryBadge category={card.category} />
                    <span className="text-[10px] text-[#6C757D]">{card.time}</span>
                  </div>
                  <h3 className="font-serif font-bold text-[#1A1A1A] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#1A73E8] transition-colors">
                    {card.headline}
                  </h3>
                  <p className="text-[#6C757D] text-xs leading-relaxed mb-3 line-clamp-2">{card.summary}</p>
                </div>
                {card.sources && card.sourcesCount && <ClusterBadge sources={card.sources} count={card.sourcesCount} />}
              </div>
            </article>
          ))}
        </div>

        {/* Mobile & Tablet View: Stacked hero + list */}
        <div className="lg:hidden space-y-4">
          {featured && (
            <article
              onClick={() => onCardClick(featured)}
              className="relative rounded-xl overflow-hidden group cursor-pointer bg-[#1A1A1A]"
            >
              <img src={featured.image} alt={featured.headline} className="w-full h-60 sm:h-72 object-cover opacity-70 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryBadge category={featured.category} />
                  <span className="text-[10px] text-white/70">{featured.time}</span>
                </div>
                <h2 className="font-serif font-bold text-white text-lg sm:text-xl leading-tight mb-2">
                  {featured.headline}
                </h2>
                <p className="text-white/80 text-xs line-clamp-2 mb-3">{featured.summary}</p>
                {featured.sources && featured.sourcesCount && <ClusterBadge sources={featured.sources} count={featured.sourcesCount} />}
              </div>
            </article>
          )}

          <div className="divide-y divide-[#E9ECEF]">
            {rest.map(card => (
              <article
                key={card.id}
                onClick={() => onCardClick(card)}
                className="flex gap-3.5 py-3.5 cursor-pointer group"
              >
                <img src={card.image} alt={card.headline} className="w-24 h-20 sm:w-28 sm:h-24 object-cover rounded-lg flex-shrink-0 bg-[#F8F9FA]" />
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryBadge category={card.category} />
                    <span className="text-[10px] text-[#6C757D]">{card.time}</span>
                  </div>
                  <h3 className="font-serif font-semibold text-[#1A1A1A] text-sm leading-snug mb-1 line-clamp-2 group-hover:text-[#1A73E8] transition-colors">
                    {card.headline}
                  </h3>
                  {card.sources && card.sourcesCount && <ClusterBadge sources={card.sources} count={card.sourcesCount} />}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}