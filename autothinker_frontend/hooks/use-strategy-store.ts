"use client"

import { create } from "zustand"

interface StrategyStore {
  strategy: any | null
  setStrategy: (strategy: any) => void
  clearStrategy: () => void
}

export const useStrategyStore = create<StrategyStore>((set) => ({
  strategy: null,
  setStrategy: (strategy) => set({ strategy }),
  clearStrategy: () => set({ strategy: null }),
}))
