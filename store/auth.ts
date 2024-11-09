import { create } from 'zustand';

interface AuthState {
  token: string | null;
  role: string | null;
  setToken: (token: string) => void;
  setRole: (role: string | undefined) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: 'user',
  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
  clearAuth: () => set({ token: null, role: null }),
}));

export default useAuthStore;
