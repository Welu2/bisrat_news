export type Tab = 'home' | 'trending' | 'prize' | 'settings';
export type Category = 'Top' | 'Politics' | 'Economy' | 'Culture' | 'Sport' | 'Tech';
export type PrizeState = 'countdown' | 'active' | 'quiz' | 'leaderboard';

export interface PublisherCoverage {
  name: string;
  logo: string;
  headline: string;
  time: string;
}

export interface NewsCard {
  id: number;
  category: string;
  headline: string;
  summary: string;
  image: string;
  time: string;
  sources?: string;
  sourcesCount?: number;
  featured?: boolean;
  highlights?: string[];
  publishers?: PublisherCoverage[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

export interface LeaderboardEntry {
  rank: number;
  phone: string;
  score: number;
  prize: string;
  prizeType: 'cash' | 'data';
}