import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Trending } from './pages/Trending';
import { Prize } from './pages/Prize';
import { Settings } from './pages/Settings';
import { StoryDetail } from './components/StoryDetail';
import { NotificationDropdown } from './components/NotificationDropdown';
import { BisratLogo } from './components/Icons';
import { NAV_ITEMS, BRAND } from './lib/constants';
import type { Tab, NewsCard } from './lib/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState<NewsCard | null>(null);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Home onCardClick={card => setSelectedCard(card)} />;
      case 'trending':
        return <Trending onCardClick={card => setSelectedCard(card)} />;
      case 'prize':
        return <Prize />;
      case 'settings':
        return <Settings />;
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* ── Working Story Detail Overlay ── */}
      {selectedCard && (
        <StoryDetail
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}

      {/* ── Desktop Permanent Sidebar (Responsive width) ── */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-[#E9ECEF] bg-white flex-shrink-0">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[#E9ECEF]">
          <BisratLogo size={32} />
          <span className="font-serif font-bold text-[#1A1A1A] text-xl tracking-tight">Bisrat</span>
        </div>

        {/* Clean, Non-Duplicated Navigation Menu */}
        <nav className="flex-1 py-5 px-3 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="w-full flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
              style={activeTab === item.id ? { background: `${BRAND}15`, color: BRAND } : { color: '#6C757D' }}
              onMouseEnter={e => {
                if (activeTab !== item.id) (e.currentTarget as HTMLButtonElement).style.background = '#F8F9FA';
              }}
              onMouseLeave={e => {
                if (activeTab !== item.id) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {item.icon(activeTab === item.id)}
              {item.label}
              {item.id === 'prize' && (
                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: BRAND }}>
                  NEW
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User Card Pinned to Footer */}
        <div className="px-5 py-4 border-t border-[#E9ECEF] bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: BRAND }}>
              A
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-[#1A1A1A] truncate">Abebe Girma</div>
              <div className="text-[10px] text-[#6C757D]">+251 919 *** 77</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main App Shell ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between px-4 py-3 sm:px-6 border-b border-[#E9ECEF] bg-white relative z-20">
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-lg hover:bg-[#F8F9FA] transition-colors relative"
              aria-label="View notifications"
            >
              <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: BRAND }} />
            </button>

            {notifOpen && (
              <NotificationDropdown
                onClose={() => setNotifOpen(false)}
                onPrize={() => setActiveTab('prize')}
              />
            )}
          </div>

          {/* Logo on mobile, active screen label on desktop */}
          <div className="flex items-center gap-2 lg:hidden">
            <BisratLogo size={26} />
            <span className="font-serif font-bold text-[#1A1A1A] text-lg tracking-tight">Bisrat</span>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-serif font-bold text-[#1A1A1A] text-xl capitalize">{activeTab}</h1>
          </div>

          {/* Search Toggle */}
          <div className="flex items-center">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl px-3 py-1.5 animate-fadeSlideDown">
                <svg className="w-4 h-4 text-[#6C757D]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search coverage..."
                  className="bg-transparent text-xs sm:text-sm text-[#1A1A1A] placeholder-[#6C757D] outline-none w-36 sm:w-52"
                  onBlur={() => { if (!searchQuery) setSearchOpen(false); }}
                />
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-[#F8F9FA] transition-colors"
                aria-label="Search articles"
              >
                <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-hidden relative">
          {renderActiveScreen()}
        </main>

        {/* ── Mobile Bottom Navigation Bar ── */}
        <nav className="lg:hidden flex border-t border-[#E9ECEF] bg-white pb-safe">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors relative"
            >
              {item.icon(activeTab === item.id)}
              <span className="text-[10px] font-semibold" style={{ color: activeTab === item.id ? BRAND : '#6C757D' }}>
                {item.label}
              </span>
              {item.id === 'prize' && (
                <span className="absolute top-2 right-[calc(50%-12px)] w-2 h-2 rounded-full" style={{ background: BRAND }} />
              )}
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeSlideDown {
          animation: fadeSlideDown 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 0.5rem);
        }
      `}</style>
    </div>
  );
}