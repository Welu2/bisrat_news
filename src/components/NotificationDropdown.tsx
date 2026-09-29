import React, { useEffect, useRef } from 'react';
import { BRAND } from '../lib/constants';

export function NotificationDropdown({ onClose, onPrize }: { onClose: () => void; onPrize: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#E9ECEF] z-50 overflow-hidden animate-fadeSlideDown"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E9ECEF]">
        <span className="text-sm font-semibold text-[#1A1A1A]">Notifications</span>
        <button onClick={onClose} className="text-[11px] font-semibold text-[#6C757D] hover:text-[#1A1A1A]">Mark all read</button>
      </div>

      <button
        onClick={() => { onPrize(); onClose(); }}
        className="w-full flex gap-3 px-4 py-3.5 hover:bg-[#F8F9FA] transition-colors text-left border-b border-[#E9ECEF]"
      >
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 bg-blue-50">🏆</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-semibold text-[#1A1A1A]">Weekly Quiz is Live!</span>
            <span className="text-[9px] font-bold uppercase tracking-wide text-white px-1.5 py-0.5 rounded-full" style={{ background: BRAND }}>NEW</span>
          </div>
          <p className="text-xs text-[#6C757D] leading-snug">Play now to compete for 500 ETB and mobile data prizes.</p>
          <span className="text-[10px] text-[#6C757D] mt-1 block">Just now</span>
        </div>
      </button>

      <div className="flex gap-3 px-4 py-3.5 opacity-60">
        <div className="w-9 h-9 rounded-full bg-[#F8F9FA] flex items-center justify-center text-lg flex-shrink-0">📰</div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-[#1A1A1A] mb-0.5">Breaking: GERD hits 90% capacity</div>
          <p className="text-xs text-[#6C757D]">Engineers confirm ahead-of-schedule output.</p>
          <span className="text-[10px] text-[#6C757D] mt-1 block">5h ago</span>
        </div>
      </div>
    </div>
  );
}