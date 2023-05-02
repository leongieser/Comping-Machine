import { create } from "zustand";
import * as Tone from "tone";

export type TmasterControlStore = {
  isPlaying: boolean;
  bpm: number;
  steps: number;
  globalVolume: number;

  togglePlaying: () => void;
  setBpm: (bpm: number) => void;
  setGlobalVolume: (volume: number) => void;
};

export const useMasterControlStore = create((set) => ({
  isPlaying: false,
  bpm: 120,
  steps: 16,
  globalVolume: 0.5,

  togglePlaying: async () => {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
      set({ isPlaying: false });
    } else {
      await Tone.start();
      Tone.Transport.start();
      set({ isPlaying: true });
    }
  },

  setBpm: (bpm: number) => {
    Tone.Transport.bpm.value = bpm;
    set({ bpm });
  },

  setGlobalVolume: (volume: number) => {
    Tone.Destination.volume.value = volume;
    set({ globalVolume: volume });
  },
}));
