import { create } from "zustand";

export const stateMode = create((set)=>({
    mode : "normale",
    setMode : (value) => set(() => ({ mode: value }))

}))