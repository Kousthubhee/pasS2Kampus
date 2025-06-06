import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface KeysStore {
  keysRemaining: number;
  useKey: () => void;
  resetKeys: () => void;
}

export const useKeysStore = create<KeysStore>()(
  persist(
    (set) => ({
      keysRemaining: 3,
      useKey: () => set((state) => ({ keysRemaining: Math.max(0, state.keysRemaining - 1) })),
      resetKeys: () => set({ keysRemaining: 3 }),
    }),
    {
      name: 'keys-storage',
    }
  )
);