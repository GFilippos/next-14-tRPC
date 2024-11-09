import { create } from 'zustand';

interface UserStore {
  selectedUserId: string | null;
  setSelectedUserId: (id: string | null) => void;
  clearSelectedUserId: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (id) => set({ selectedUserId: id }),
  clearSelectedUserId: () => set({ selectedUserId: null }),
}));

export default useUserStore;
