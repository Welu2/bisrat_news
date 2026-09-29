import React from 'react';
import type { Tab, Category, NewsCard, QuizQuestion, LeaderboardEntry } from './types';
import { HomeIcon, TrendingIcon, PrizeIcon, SettingsIcon } from '../components/Icons';

export const BRAND = '#1A73E8'; // Trustworthy Editorial Blue
export const BRAND_DARK = '#1557B0';

export const NAV_ITEMS: { id: Tab; label: string; icon: (a: boolean) => React.ReactElement }[] = [
  { id: 'home', label: 'Home', icon: (a) => <HomeIcon active={a} /> },
  { id: 'trending', label: 'Trending', icon: (a) => <TrendingIcon active={a} /> },
  { id: 'prize', label: 'Prize', icon: (a) => <PrizeIcon active={a} /> },
  { id: 'settings', label: 'Settings', icon: (a) => <SettingsIcon active={a} /> },
];

export const PUBLISHERS_POOL = [
  { name: 'Addis Daily', logo: 'AD', headline: 'Capital greenlights ring-road overhaul spanning outer suburbs', time: '2h ago' },
  { name: 'Fana Broadcasting', logo: 'FB', headline: 'Infrastructure plan targets 12 key intersections across the ring', time: '3h ago' },
  { name: 'EBC News', logo: 'EC', headline: 'PM unveils 45bn birr road network investment', time: '4h ago' },
  { name: 'The Reporter ET', logo: 'TR', headline: 'Ring road expansion to ease chronic congestion in Addis suburbs', time: '5h ago' },
  { name: 'Addis Standard', logo: 'AS', headline: 'Urban planners welcome the long-delayed ring-road decision', time: '6h ago' },
];

export const NEWS_DATA: Record<Category, NewsCard[]> = {
  Top: [
    {
      id: 1, category: 'Politics', time: '2h ago', featured: true,
      sources: 'Addis Daily', sourcesCount: 3,
      headline: 'Prime Minister Announces Major Infrastructure Investment for Addis Ababa Ring Road Expansion',
      summary: "The federal government unveiled a 45-billion birr plan to expand the capital's ring road network, connecting outer districts to the city center.",
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop&auto=format',
      highlights: [
        '45 billion birr allocated over three fiscal years',
        'Twelve key intersections to be widened or redesigned',
        'Construction to begin in Q1 2027 pending land clearance',
        'Outer suburbs of Akaki-Kaliti and Bole to benefit first',
      ],
      publishers: PUBLISHERS_POOL.slice(0, 3),
    },
    {
      id: 2, category: 'Economy', time: '3h ago',
      sources: 'Fana BC', sourcesCount: 2,
      headline: 'Ethiopian Birr Stabilizes After Central Bank Intervention',
      summary: 'The National Bank of Ethiopia stepped in to stabilize the exchange rate following weeks of pressure from import demand and foreign currency shortfalls.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&auto=format',
      highlights: [
        'NBE injected $120 million into the foreign exchange market',
        'Birr fell 8% against the dollar in the preceding month',
        'Import financing now prioritized for fuel and medicine',
      ],
      publishers: PUBLISHERS_POOL.slice(1, 3),
    },
    {
      id: 3, category: 'Culture', time: '5h ago',
      sources: 'EBC News', sourcesCount: 5,
      headline: 'Grand Ethiopian Renaissance Dam Reaches 90% Capacity Ahead of Schedule',
      summary: "Engineers report the dam has exceeded early projections, with electricity generation set to double by year's end.",
      image: 'https://images.unsplash.com/photo-1446776858070-70c3d5ed6758?w=600&h=400&fit=crop&auto=format',
      highlights: [
        'Full reservoir capacity expected by March 2027',
        'Current output: 4,800 MW — targeting 5,150 MW at full capacity',
        'Egypt and Sudan monitoring negotiations continue in Nairobi',
      ],
      publishers: PUBLISHERS_POOL.slice(0, 2),
    },
    {
      id: 4, category: 'Sport', time: '6h ago',
      headline: 'Almaz Ayana Sets New World Record at Berlin Marathon',
      summary: 'The Ethiopian long-distance runner broke her own world record by eleven seconds in near-perfect conditions.',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop&auto=format',
      highlights: [
        'New record: 2:13:48 — eleven seconds faster than her 2023 mark',
        'Temperature at race start: 12°C with low humidity',
        'Ethiopian Athletics Federation confirms she targets Paris next',
      ],
      publishers: PUBLISHERS_POOL.slice(2, 4),
    },
    {
      id: 5, category: 'Tech', time: '8h ago',
      sources: 'Addis Daily', sourcesCount: 2,
      headline: 'Safaricom Ethiopia Launches 5G Pilot in Four Major Cities',
      summary: 'The telecom giant activates 5G infrastructure in Addis Ababa, Dire Dawa, Hawassa, and Mekelle.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop&auto=format',
      highlights: [
        'Initial speeds measured at 820 Mbps in Addis city center',
        'Full national rollout planned by end of 2027',
        'Enterprise packages go on sale 1 November 2026',
      ],
      publishers: PUBLISHERS_POOL.slice(3, 5),
    },
    {
      id: 6, category: 'Politics', time: '10h ago',
      sources: 'Reuters Africa', sourcesCount: 4,
      headline: 'African Union Summit Concludes With Historic Climate Accord',
      summary: 'Fifty-five member states signed a binding framework for renewable energy transition and cross-border carbon credits.',
      image: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?w=600&h=400&fit=crop&auto=format',
      highlights: [
        'Each signatory commits to 40% renewables by 2035',
        'Carbon credit trading framework to launch in 2028',
        'Ethiopia, Kenya, and Morocco lead the implementation committee',
      ],
      publishers: PUBLISHERS_POOL.slice(0, 4),
    },
  ],
  Politics: [], Economy: [], Culture: [], Sport: [], Tech: [],
};

// Distribute sample data to category feeds[cite: 5]
(['Politics', 'Economy', 'Culture', 'Sport', 'Tech'] as Category[]).forEach(cat => {
  NEWS_DATA[cat] = NEWS_DATA.Top.filter(n => n.category === cat);
  if (NEWS_DATA[cat].length === 0) NEWS_DATA[cat] = NEWS_DATA.Top.slice(1, 4);
});

export const TRENDING: NewsCard[] = [
  {
    id: 10, category: 'Economy', time: '1h ago',
    sources: 'Addis Standard', sourcesCount: 6,
    headline: 'Ethiopia Ranks 3rd Fastest-Growing Economy in Africa for 2026',
    summary: 'IMF report places Ethiopia behind only Senegal and Niger, citing infrastructure investment and export diversification.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop&auto=format',
    highlights: ['GDP growth forecast at 8.2% for FY2026', 'Export revenues up 17% year-on-year', 'IMF commends fiscal discipline and structural reforms'],
    publishers: PUBLISHERS_POOL.slice(0, 2),
  },
  {
    id: 11, category: 'Politics', time: '2h ago',
    sources: 'EBC News', sourcesCount: 3,
    headline: 'Parliament Passes Landmark Digital Privacy Bill',
    summary: 'Legislators vote 312–48 to enact comprehensive data protection rules, the first of their kind in East Africa.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&h=400&fit=crop&auto=format',
    highlights: ['Data brokers must register and disclose clients', 'Citizens gain right to access and delete personal data', 'Enforcement authority to be established within 18 months'],
    publishers: PUBLISHERS_POOL.slice(1, 3),
  },
  {
    id: 12, category: 'Sport', time: '4h ago',
    sources: 'Fana BC', sourcesCount: 2,
    headline: 'Ethiopian National Football Team Qualifies for AFCON 2027',
    summary: "A 2-0 victory over Sudan secured Ethiopia's first AFCON qualification in six years.",
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&h=400&fit=crop&auto=format',
    highlights: ["Goals from Getaneh Kebede (34') and Shimelis Bekele (78')", 'Ethiopia finishes Group C unbeaten with 16 points', 'AFCON 2027 hosted by Morocco in January'],
    publishers: PUBLISHERS_POOL.slice(2, 4),
  },
  {
    id: 13, category: 'Culture', time: '6h ago',
    sources: 'The Reporter ET', sourcesCount: 4,
    headline: 'Addis Ababa Named UNESCO Creative City of Music',
    summary: 'The capital joins a global network of 90 cities recognized for their vibrant music scenes and cultural heritage.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&auto=format',
    highlights: ['Recognition covers traditional Tizita and modern Ethio-jazz', 'City to co-host the UNESCO Music Cities Forum in 2028', 'Grant of €500,000 for cultural infrastructure development'],
    publishers: PUBLISHERS_POOL.slice(0, 3),
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { question: 'Which Ethiopian city hosted the 2026 African Union Summit?', options: ['Dire Dawa', 'Addis Ababa', 'Hawassa', 'Mekelle'], correct: 1 },
  { question: 'What capacity did the Grand Ethiopian Renaissance Dam reach this week?', options: ['75%', '82%', '90%', '95%'], correct: 2 },
  { question: 'By how many seconds did Almaz Ayana break her Berlin Marathon record?', options: ['5 seconds', '9 seconds', '11 seconds', '14 seconds'], correct: 2 },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, phone: '+251 911 *** 12', score: 3, prize: '500 ETB', prizeType: 'cash' },
  { rank: 2, phone: '+251 912 *** 88', score: 3, prize: '300 ETB', prizeType: 'cash' },
  { rank: 3, phone: '+251 910 *** 45', score: 3, prize: '5 GB Data', prizeType: 'data' },
  { rank: 4, phone: '+251 913 *** 71', score: 2, prize: '2 GB Data', prizeType: 'data' },
  { rank: 5, phone: '+251 914 *** 30', score: 2, prize: '1 GB Data', prizeType: 'data' },
  { rank: 6, phone: '+251 916 *** 55', score: 2, prize: '1 GB Data', prizeType: 'data' },
  { rank: 7, phone: '+251 917 *** 09', score: 1, prize: '—', prizeType: 'data' },
  { rank: 8, phone: '+251 918 *** 44', score: 1, prize: '—', prizeType: 'data' },
];