import React, { useState } from 'react';
import { BRAND } from '../lib/constants';

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [breakingAlerts, setBreakingAlerts] = useState(true);
  const [language, setLanguage] = useState('English');

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 sm:p-6">
      <div className="max-w-lg mx-auto w-full space-y-6">
        <div className="pb-3 border-b border-[#E9ECEF]">
          <h2 className="font-serif font-bold text-[#1A1A1A] text-xl sm:text-2xl">Settings</h2>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3.5 bg-[#F8F9FA] rounded-xl p-4 border border-[#E9ECEF]">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: BRAND }}>
            A
          </div>
          <div>
            <div className="font-semibold text-[#1A1A1A] text-sm">Abebe Girma</div>
            <div className="text-[#6C757D] text-xs">+251 919 *** 77</div>
          </div>
          <button
            className="ml-auto text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors"
            style={{ borderColor: BRAND, color: BRAND }}
          >
            Edit
          </button>
        </div>

        {/* Notifications Group */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6C757D] mb-3">Notifications</h3>
          <div className="bg-white border border-[#E9ECEF] rounded-xl divide-y divide-[#E9ECEF]">
            <div className="flex items-center justify-between px-4 py-3.5">
              <div>
                <div className="text-sm font-medium text-[#1A1A1A]">Push Notifications</div>
                <div className="text-xs text-[#6C757D]">Receive quiz openings and daily digests</div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                style={{ background: notifications ? BRAND : '#E9ECEF' }}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between px-4 py-3.5">
              <div>
                <div className="text-sm font-medium text-[#1A1A1A]">Breaking Alerts</div>
                <div className="text-xs text-[#6C757D]">Real-time regional breaking news</div>
              </div>
              <button
                onClick={() => setBreakingAlerts(!breakingAlerts)}
                className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                style={{ background: breakingAlerts ? BRAND : '#E9ECEF' }}
              >
                <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${breakingAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Language */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6C757D] mb-3">Preferences</h3>
          <div className="bg-white border border-[#E9ECEF] rounded-xl px-4 py-3.5 flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-[#1A1A1A]">Feed Language</div>
              <div className="text-xs text-[#6C757D]">Multilingual editorial selection</div>
            </div>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="text-sm border border-[#E9ECEF] rounded-lg px-2.5 py-1.5 bg-white text-[#1A1A1A]"
            >
              <option>English</option>
              <option>Amharic (አማርኛ)</option>
              <option>Afaan Oromoo</option>
              <option>Tigrinya (ትግርኛ)</option>
            </select>
          </div>
        </div>

        <div className="text-center text-xs text-[#6C757D] pt-4">Bisrat News v2.4.1 · Prototype Shell</div>
      </div>
    </div>
  );
}