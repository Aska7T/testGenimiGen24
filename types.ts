export interface SolarTerm {
  id: number;
  name: string;
  pinyin: string;
  dateStr: string; // Approximate date string e.g., "02-04"
  description: string;
  poem: string;
  poet: string;
  customs: string[];
  foods: string[];
  dos: string[];
  donts: string[];
  color: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MerchandiseItem {
  id: number;
  name: string;
  price: number;
  points?: number; // Optional points for mixed payment
  image: string;
  tag?: string;
  category: 'wenchuang' | 'agri' | 'digital';
}

export interface ContentArticle {
  id: number;
  title: string;
  author: string;
  summary: string;
  image: string;
  reads: number;
  tag: string;
}

export interface CommunityPost {
  id: number;
  user: string;
  avatar: string;
  image: string;
  content: string;
  likes: number;
  location: string;
}

export interface SoundTrack {
  id: number;
  title: string;
  duration: string;
  type: 'nature' | 'music' | 'guide';
}

export enum AppTab {
  HOME = 'home',
  CULTURE = 'culture',
  LIFESTYLE = 'lifestyle',
  MALL = 'mall' // Renamed from INTERACT to focus on Commerce/Interact
}

export interface UserState {
  points: number;
  badges: number[]; // Array of Solar Term IDs collected
  completedDailyQuiz: boolean;
  location: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  location: string;
}