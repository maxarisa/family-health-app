import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  height?: number;
  currentWeight?: number;
  coachStyle: 'encouraging' | 'motivating' | 'informative' | 'friendly';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock user for development - remove in production
const mockUser: User = {
  id: 'dev-user-1',
  email: 'demo@familyhealth.com',
  name: 'Demo User',
  age: 35,
  height: 175,
  currentWeight: 72,
  coachStyle: 'encouraging',
};

// DEV MODE: Using mock user, no persistence
// For production, add back persist middleware
export const useAuthStore = create<AuthState>()((set) => ({
  user: mockUser,
  token: 'dev-token',
  isAuthenticated: true,
  isLoading: false,
  setAuth: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    }),
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));
