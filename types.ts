
export interface Design {
  id: string;
  title: string;
  category: 'Gate' | 'Grill' | 'Window' | 'Furniture' | 'Other';
  imageUrl: string;
  description: string;
  isOfficial?: boolean;
}

export type OrderStatus = 'pending' | 'approved' | 'denied' | 'work_started' | 'completed';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  designId?: string;
  designUrl: string;
  amount: number;
  status: OrderStatus;
  timestamp: number;
  paymentMethod: 'card' | 'bank_transfer' | 'jazzcash' | 'easypaisa';
}

export interface BankDetails {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
}

export interface ShopProfile {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  timing: string;
  bankDetails: BankDetails;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UserCreation {
  id: string;
  imageUrl: string;
  timestamp: number;
  type: 'upload' | 'generation';
  prompt?: string;
}

export enum AppSection {
  HOME = 'home',
  GALLERY = 'gallery',
  STUDIO = 'studio',
  ABOUT = 'about',
  CHAT = 'chat',
  LOGIN = 'login',
  ADMIN = 'admin',
  ORDERS = 'orders'
}

export interface GenerationHistory {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
  originalId?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text?: string;
  audioUrl?: string;
  duration?: number;
  isVoice?: boolean;
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  city?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  email: string | null;
  location: UserLocation | null;
  isAdmin?: boolean;
}
