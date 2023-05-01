import { create } from "zustand";

export type TmasterControlStore = {
  isPlaying: boolean;
  togglePlaying: () => void;
  audioContextLoaded: boolean;
  toggleaudioContextLoaded: () => void;
};

export const useMasterControlStore = create((set) => ({
  isPlaying: false,
  togglePlaying: () =>
    set((state: { isPlaying: boolean }) => ({ isPlaying: !state.isPlaying })),

  audioContextLoaded: false,
  toggleaudioContextLoaded: () =>
    set((state: { audioContextLoaded: boolean }) => ({
      isPlaying: !state.audioContextLoaded,
    })),
}));
