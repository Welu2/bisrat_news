import React, { useEffect } from 'react';
import { BRAND } from '../lib/constants';
import type { NewsCard } from '../lib/types';
import { CategoryBadge } from '../pages/Home';

export function StoryDetail({ card, onClose }: { card: NewsCard; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-y-auto animate-fadeSlideUp">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-[#E9ECEF] z-10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F8F9FA] transition-colors" aria-label="Close story">
            <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <CategoryBadge category={card.category} />
        </div>
        <span className="text-xs text-[#6C757D] font-medium">{card.time}</span>
      </div>

      {/* Reader Container (Constrained max 800px) */}
      <article className="w-full max-w-[800px] mx-auto px-4 pt-6 pb-20 lg:px-8">
        <div className="relative rounded-xl overflow-hidden mb-6 bg-[#F8F9FA]">
          <img src={card.image} alt={card.headline} className="w-full h-56 sm:h-72 lg:h-96 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <h1 className="font-serif font-bold text-[#1A1A1A] text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4">
          {card.headline}
        </h1>
        <p className="text-[#6C757D] text-sm sm:text-base leading-relaxed mb-6">
          {card.summary}
        </p>

        {/* Highlights Section */}
        {card.highlights && card.highlights.length > 0 && (
          <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl p-4 sm:p-5 mb-8">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BRAND }}>
              Story Highlights
            </p>
            <ul className="space-y-2.5">
              {card.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm sm:text-base text-[#1A1A1A] leading-snug">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BRAND }} />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Clustered Coverage Section */}
        {card.publishers && card.publishers.length > 0 && (
          <div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#6C757D] mb-4 pb-2 border-b border-[#E9ECEF]">
              Coverage from {card.publishers.length} publisher{card.publishers.length > 1 ? 's' : ''}
            </h3>
            <div className="space-y-4">
              {card.publishers.map((pub, i) => (
                <div key={i} className="border border-[#E9ECEF] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4 bg-white">
                  <div className="flex items-center gap-3 md:w-1/4 flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: BRAND }}>
                      {pub.logo}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1A1A1A]">{pub.name}</div>
                      <div className="text-[11px] text-[#6C757D]">{pub.time}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#1A1A1A] leading-snug flex-1">{pub.headline}</p>
                  
                  {/* Full width button on mobile, compact on tablet/desktop */}
                  <button
                    className="w-full md:w-auto px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-lg border transition-all duration-150 flex-shrink-0"
                    style={{ borderColor: BRAND, color: BRAND }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = BRAND;
                      (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = BRAND;
                    }}
                  >
                    Read original ↗
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}