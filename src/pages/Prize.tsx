import React, { useState, useEffect } from 'react';
import { BRAND, QUIZ_QUESTIONS, LEADERBOARD } from '../lib/constants';
import type { PrizeState } from '../lib/types';

export function Prize() {
  const [state, setState] = useState<PrizeState>('countdown');

  const titles: Record<PrizeState, string> = {
    countdown: 'Prize Zone',
    active: 'Prize Zone',
    quiz: 'Weekly Quiz',
    leaderboard: 'Standings & Leaderboard',
  };

  return (
    <div className="flex flex-col h-full w-full min-h-0 overflow-hidden bg-white">
      {/* Page Header */}
      <div className="border-b border-[#E9ECEF] px-4 py-3 sm:px-6 flex-shrink-0 bg-white z-10">
        <h2 className="font-serif font-bold text-[#1A1A1A] text-lg sm:text-xl md:text-2xl">{titles[state]}</h2>
        <p className="text-[#6C757D] text-xs">Win weekly cash prizes and mobile internet packages</p>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
        {state === 'countdown' && (
          <CountdownScreen onSimulateOpen={() => setState('active')} />
        )}

        {state === 'active' && (
          <ActiveScreen onStart={() => setState('quiz')} />
        )}

        {state === 'quiz' && (
          <QuizScreen onSubmit={() => setState('leaderboard')} />
        )}

        {/* Leaderboard ONLY renders when state is 'leaderboard' */}
        {state === 'leaderboard' && (
          <LeaderboardScreen onReset={() => setState('countdown')} />
        )}
      </div>
    </div>
  );
}

// ── 1. Countdown State (Pre-Quiz) ─────────────────────────────────────────────
function CountdownScreen({ onSimulateOpen }: { onSimulateOpen: () => void }) {
  const [time, setTime] = useState({ d: 2, h: 7, m: 43, s: 12 });

  useEffect(() => {
    const id = setInterval(() => {
      setTime(t => {
        let { d, h, m, s } = t;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; d = Math.max(0, d - 1); }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center m-auto text-center px-4 py-8 sm:py-12 max-w-md w-full">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 text-2xl sm:text-3xl bg-blue-50 flex-shrink-0">
        🏆
      </div>
      <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: BRAND }}>
        Weekly News Trivia
      </p>
      <h2 className="font-serif font-bold text-[#1A1A1A] text-2xl sm:text-3xl mb-1">Opens In</h2>
      <p className="text-[#6C757D] text-xs sm:text-sm mb-6">Friday · 6:00 PM EAT · Pool: 1,000+ ETB</p>

      {/* Clock Boxes */}
      <div className="flex gap-2 sm:gap-3 mb-6 w-full justify-center">
        {[{ label: 'Days', val: time.d }, { label: 'Hours', val: time.h }, { label: 'Min', val: time.m }, { label: 'Sec', val: time.s }].map(({ label, val }) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl border border-[#E9ECEF] bg-[#F8F9FA] flex items-center justify-center font-mono font-bold text-lg sm:text-2xl text-[#1A1A1A] shadow-xs">
              {pad(val)}
            </div>
            <span className="text-[10px] text-[#6C757D] uppercase tracking-wider mt-1">{label}</span>
          </div>
        ))}
      </div>

      {/* Tiered Rewards Card */}
      <div className="w-full bg-[#F8F9FA] border border-[#E9ECEF] rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold text-[#6C757D] uppercase tracking-wider mb-2.5 text-left">Prizes up for grabs</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span>🥇 1st Place</span><span className="font-semibold text-emerald-600">500 ETB</span></div>
          <div className="flex justify-between"><span>🥈 2nd Place</span><span className="font-semibold text-emerald-600">300 ETB</span></div>
          <div className="flex justify-between"><span>🥉 3rd Place</span><span className="font-semibold text-sky-600">5 GB Data</span></div>
        </div>
      </div>

      <button onClick={onSimulateOpen} className="text-xs text-[#6C757D] hover:text-[#1A73E8] underline underline-offset-4 cursor-pointer">
        Preview: simulate quiz open →
      </button>
    </div>
  );
}

// ── 2. Active State (Ready to Play) ───────────────────────────────────────────
function ActiveScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center m-auto text-center px-4 py-8 sm:py-12 max-w-sm w-full">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mb-4 bg-blue-50 flex-shrink-0">
        🏆
      </div>
      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: BRAND }}>
        Live Event
      </p>
      <h2 className="font-serif font-bold text-[#1A1A1A] text-2xl sm:text-3xl mb-2">The Quiz Is Open!</h2>
      <p className="text-[#6C757D] text-xs sm:text-sm mb-6 leading-relaxed">
        Answer 3 quick questions about this week's headlines. Scores and leaderboards unlock immediately upon submitting.
      </p>

      <button
        onClick={onStart}
        className="w-full py-3.5 rounded-xl font-bold text-sm text-white hover:opacity-90 active:scale-[0.99] transition-all shadow-sm cursor-pointer"
        style={{ background: BRAND }}
      >
        Start Weekly Quiz
      </button>
      <span className="text-xs text-[#6C757D] mt-3">3 questions · ~2 minutes</span>
    </div>
  );
}

// ── 3. Quiz State (Questions Form) ────────────────────────────────────────────
function QuizScreen({ onSubmit }: { onSubmit: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const allAnswered = Object.keys(answers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      {/* Scrollable Questions Area */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:p-6">
        <div className="max-w-xl mx-auto w-full pb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BRAND }}>
              Round 1 of 1
            </span>
            <span className="text-xs text-[#6C757D]">
              {Object.keys(answers).length} / {QUIZ_QUESTIONS.length} answered
            </span>
          </div>

          <h2 className="font-serif font-bold text-[#1A1A1A] text-xl sm:text-2xl mb-4">Weekly News Trivia</h2>

          {/* Progress bar */}
          <div className="flex gap-2 mb-6">
            {QUIZ_QUESTIONS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-colors duration-200"
                style={{ background: answers[i] !== undefined ? BRAND : '#E9ECEF' }}
              />
            ))}
          </div>

          {/* Question List */}
          <div className="space-y-4 sm:space-y-6">
            {QUIZ_QUESTIONS.map((q, qi) => (
              <div key={qi} className="bg-[#F8F9FA] rounded-xl p-4 sm:p-5 border border-[#E9ECEF]">
                <p className="font-semibold text-[#1A1A1A] text-sm sm:text-base mb-3 leading-snug">
                  <span className="font-bold mr-2" style={{ color: BRAND }}>{qi + 1}.</span>
                  {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label
                      key={oi}
                      className={`flex items-center gap-3 cursor-pointer px-3.5 py-3 rounded-lg border transition-all ${
                        answers[qi] === oi ? 'bg-blue-50 border-[#1A73E8]' : 'bg-white border-[#E9ECEF] hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`quiz_q_${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => setAnswers(prev => ({ ...prev, [qi]: oi }))}
                        className="w-4 h-4 accent-[#1A73E8]"
                      />
                      <span className="text-xs sm:text-sm text-[#1A1A1A] font-medium">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="p-4 sm:px-6 border-t border-[#E9ECEF] bg-white flex-shrink-0 z-10">
        <div className="max-w-xl mx-auto w-full">
          <button
            onClick={onSubmit}
            disabled={!allAnswered}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-150 cursor-pointer ${
              allAnswered ? 'text-white hover:opacity-95 active:scale-[0.99] shadow-sm' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            style={allAnswered ? { background: BRAND } : {}}
          >
            {allAnswered ? 'Submit Answers & Reveal Standings' : `Select all answers (${Object.keys(answers).length}/${QUIZ_QUESTIONS.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 4. Leaderboard State (Revealed ONLY Post-Submit) ───────────────────────────
function LeaderboardScreen({ onReset }: { onReset: () => void }) {
  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full animate-fadeSlideUp">
      {/* Scrollable Ranking Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:p-6">
        <div className="max-w-xl mx-auto w-full pb-6">
          {/* Success Banner */}
          <div className="rounded-xl p-4 sm:p-5 mb-5 text-white" style={{ background: BRAND }}>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-100 mb-1 block">
              Quiz Completed
            </span>
            <h2 className="font-serif font-bold text-xl sm:text-2xl mb-1">Official Standings</h2>
            <p className="text-xs text-blue-100">Top performers with masked contact credentials.</p>
          </div>

          {/* Top 3 Winners Podium */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
            {LEADERBOARD.slice(0, 3).map((entry, i) => (
              <div key={entry.rank} className="border border-[#E9ECEF] rounded-xl p-3 text-center bg-[#F8F9FA] flex flex-col justify-between">
                <div className="text-xl sm:text-2xl mb-1">{medals[i]}</div>
                <div className="font-mono font-bold text-[10px] sm:text-xs text-[#1A1A1A] truncate">{entry.phone}</div>
                <div className={`text-[11px] sm:text-xs font-semibold mt-1 ${entry.prizeType === 'cash' ? 'text-emerald-600' : 'text-sky-600'}`}>
                  {entry.prize}
                </div>
              </div>
            ))}
          </div>

          {/* Full Rankings List */}
          <div className="border border-[#E9ECEF] rounded-xl divide-y divide-[#E9ECEF] bg-white overflow-hidden shadow-2xs">
            {LEADERBOARD.map(entry => (
              <div key={entry.rank} className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-bold text-[#6C757D] w-5 text-left flex-shrink-0">#{entry.rank}</span>
                  <span className="font-mono text-[#1A1A1A] truncate">{entry.phone}</span>
                </div>
                <span className={`font-semibold flex-shrink-0 ${entry.prizeType === 'cash' ? 'text-emerald-600' : 'text-sky-600'}`}>
                  {entry.prize}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned User Standing Footer */}
      <div className="border-t-2 px-4 py-3 sm:px-6 bg-blue-50/80 backdrop-blur flex-shrink-0 z-10" style={{ borderColor: BRAND }}>
        <div className="max-w-xl mx-auto flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A73E8]">Your Result</span>
            <div className="font-serif font-bold text-base sm:text-lg text-[#1A1A1A]">42nd Place</div>
            <div className="text-[11px] text-[#6C757D]">+251 919 *** 77 · 3/3 Correct</div>
          </div>
          <button
            onClick={onReset}
            className="text-xs font-semibold px-3 sm:px-4 py-2 rounded-lg border border-[#1A73E8] text-[#1A73E8] bg-white hover:bg-[#1A73E8] hover:text-white transition-colors cursor-pointer flex-shrink-0"
          >
            Play Again (demo)
          </button>
        </div>
      </div>
    </div>
  );
}