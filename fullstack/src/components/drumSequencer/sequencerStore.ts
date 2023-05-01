import { create } from "zustand";

export type TKit = {
  name: string;
  sounds: {
    url: string;
    name: string;
  }[];
};

export type TSequencerStore = {
  selectedKit: TKit | null;
  setSelectedKit: (kit: TKit) => void;
  currentPatterns: boolean[][];
  initializePatterns: (numSounds: number) => void;
  updatePatternStep: (soundIndex: number, step: number, value: boolean) => void;
};

export const useSequencerStore = create((set) => ({
  selectedKit: null,
  setSelectedKit: (kit: TKit) => set(() => ({ selectedKit: kit })),
  currentPatterns: [],
  initializePatterns: (numSounds: number) => {
    set(() => ({
      currentPatterns: Array.from({ length: numSounds }, () =>
        Array(16).fill(false)
      ),
    }));
  },
  updatePatternStep: (soundIndex: number, step: number, value: boolean) => {
    set((state) => {
      const newPatterns = [...state.currentPatterns];

      newPatterns[soundIndex] = [...newPatterns[soundIndex]]; /// woaht?
      newPatterns[soundIndex][step] = value;
      console.log("state", state);

      return { currentPatterns: newPatterns };
    });
  },
}));
