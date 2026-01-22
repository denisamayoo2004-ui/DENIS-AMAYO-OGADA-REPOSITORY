
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  high: number;
  low: number;
  previousClose: number;
  high52: number;
  low52: number;
  isAIPick?: boolean;
  history?: { date: string; price: number; volume: number }[];
}

export interface User {
  id: string;
  name: string;
  idNumber: string;
  phone: string;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: number;
}

export interface PriceReminder {
  id: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  active: boolean;
}

export interface UserPortfolio {
  balance: number;
  holdings: { [symbol: string]: number };
  history: Transaction[];
  reminders: PriceReminder[];
}

export interface Transaction {
  id: string;
  timestamp: number;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}

export type AppView = 'market' | 'analysis' | 'brokerage' | 'academy' | 'portfolio' | 'details' | 'news-reader' | 'login' | 'register' | 'compare' | 'security' | 'historical';

export enum Recommendation {
  BUY = 'BUY',
  SELL = 'SELL',
  HOLD = 'HOLD',
  STRONG_BUY = 'STRONG BUY',
  WAIT = 'WAIT',
  NOT_BUY = 'NOT BUY',
  AVOID = 'AVOID'
}

export interface TechnicalIndicator {
  name: string;
  value: string;
  signal: 'Bullish' | 'Bearish' | 'Neutral';
  description: string;
}

export interface FundamentalPoint {
  metric: string;
  value: string;
  health: 'Strong' | 'Average' | 'Weak';
}

export interface AIAnalysis {
  symbol: string;
  recommendation: Recommendation;
  rationale: string;
  risks: string[];
  benefits: string[];
  suggestedAction: string;
  horizon: string;
  marketTrend: 'Bullish' | 'Bearish' | 'Neutral';
  technicalIndicators: TechnicalIndicator[];
  fundamentals: FundamentalPoint[];
  technicalScore: number; 
  fundamentalScore: number;
  sources: { title: string; web: string }[];
  patternAnalysis?: string;
  sentimentScore: number; // -100 to 100
  sentimentHistory: number[];
  toolkitRefinement?: string;
}

export interface SystemAudit {
  timestamp: number;
  status: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  message: string;
  alertType: 'NEWS' | 'SECURITY' | 'MARKET';
}

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  source: string;
}
