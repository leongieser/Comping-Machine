import { create } from "zustand";

export type TKit = {
  name: string;
  sounds: {
    url: string;
    name: string;
  }[];
};

export type TSequencerStore = {
  bars: number;
  selectedKit: TKit;
  currentPatterns: boolean[][];
  currentSequence: any; //TODO type this

  setBars: (bars: number) => void;
  setSelectedKit: (kit: TKit) => void;
  updatePatternStep: (soundIndex: number, step: number, value: boolean) => void;
  setCurrentSequence: (sequence: any) => void; //TODO type this
};

export const useSequencerStore = create((set) => ({
  // Default n of bars allows for future expansion
  bars: 1,

  // The Default Kit so no errors are thrown or empty sounds are played etc.
  selectedKit: {
    name: "808 Kit",
    sounds: [
      { url: "/audio/kit-808/kick.mp3", name: "Kick" },
      { url: "/audio/kit-808/rimshot.mp3", name: "Rim Shot" },
      { url: "/audio/kit-808/snare.mp3", name: "Snare" },
      { url: "/audio/kit-808/clap.mp3", name: "Clap" },
      { url: "/audio/kit-808/conga-low.mp3", name: "Conga Low" },
      { url: "/audio/kit-808/conga-mid.mp3", name: "Conga Mid" },
      { url: "/audio/kit-808/conga-high.mp3", name: "Conga High" },
      { url: "/audio/kit-808/tom-low.mp3", name: "Tom Low" },
      { url: "/audio/kit-808/tom-mid.mp3", name: "Tom Mid" },
      { url: "/audio/kit-808/tom-high.mp3", name: "Tom High" },
      { url: "/audio/kit-808/hihat-closed.mp3", name: "Hihat Closed" },
      { url: "/audio/kit-808/hihat-open.mp3", name: "Hihat Open" },
      { url: "/audio/kit-808/cymbal.mp3", name: "Cymbal" },
      { url: "/audio/kit-808/maracas.mp3", name: "Maracas" },
      { url: "/audio/kit-808/cow-bell.mp3", name: "Cow Bell" },
      { url: "/audio/kit-808/claves.mp3", name: "Claves" },
    ],
  },

  // Fills a 2D array with false values that map to the current kit's sounds and the current number of bars * 16 steps
  currentPatterns: (state: TSequencerStore) => {
    [...Array(state.bars * 16)].map(() =>
      [...Array(state.selectedKit.sounds.length)].fill(false)
    );
  },

  // Sets the number of bars - allows for a n of bars between 1 and 4 to avoid errors and performance issues
  setBars: (bars: number) => {
    if (bars >= 1 && bars <= 4) {
      set(() => ({ bars }));
    }
  },

  // Sets the selected kit and resets the current patterns to match the new kit
  setSelectedKit: async (state: TSequencerStore, kit: TKit) => {
    //? should the patterns be reset when the user selects a different sample kit?
    //! yes - the new kid could potentially have more or less sounds than the previous one
    const newPatterns = [...Array(kit.sounds.length)].map(() =>
      [...Array(state.bars * 16)].fill(false)
    );
    set(() => ({ selectedKit: kit, currentPatterns: newPatterns }));
  },

  // Updates the value of a step in the current patterns array
  updatePatternStep: (soundIndex: number, step: number, value: boolean) => {
    set((state: TSequencerStore) => {
      // Spreading the current state is required to create a shallow copy of the
      // array to not mutate the original state which could lead to unexpected behaviour
      const newPatterns = [...state.currentPatterns];
      newPatterns[soundIndex] = [...newPatterns[soundIndex]];
      newPatterns[soundIndex][step] = value;
      console.log("state", state);

      return { currentPatterns: newPatterns };
    });
  },

  setCurrentSequence(sequence: any) {
    set(() => ({ currentSequence: sequence }));
  },

  //TODO read up on zustands persist function to store state in the local storage
}));
