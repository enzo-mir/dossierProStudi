import { create } from "zustand";

export const stateAdmin = create((set) => ({
  word: "",
  setWord: (value) => set(() => ({ word: value })),
  counter: 0,
  setCount: (val) => set(() => ({ counter: val })),
}));
