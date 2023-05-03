// import { create } from "zustand";

// export type TmasterControlStore = {
//   isPlaying: boolean;
//   togglePlaying: () => void;
//   audioContextLoaded: boolean;
//   toggleaudioContextLoaded: () => void;
// };

// export const useMasterControlStore = create((set) => ({
//   isPlaying: false,
//   togglePlaying: () =>
//     set((state: { isPlaying: boolean }) => ({ isPlaying: !state.isPlaying })),

//   audioContextLoaded: false,
//   toggleaudioContextLoaded: () =>
//     set((state: { audioContextLoaded: boolean }) => ({
//       isPlaying: !state.audioContextLoaded,
//     })),
// }));

import { create } from "zustand";
import * as Tone from "tone";

export type TmasterControlStore = {
  isPlaying: boolean;
  note: string;
  bpm: number;
  steps: number;
  globalVolume: number;
  nOfSteps: number;

  togglePlaying: () => void;
  setBpm: (bpm: number) => void;
  setGlobalVolume: (volume: number) => void;
  updateLamps: (step: number) => void;
};

export const useMasterControlStore = create((set) => ({
  isPlaying: false,
  note: "C2",
  bpm: 120,
  steps: 16,
  globalVolume: 0.5,
  nOfSteps: 16,

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
