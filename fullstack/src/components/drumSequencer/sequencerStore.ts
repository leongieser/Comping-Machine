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

  setBars: (bars: number) => void;
  setSelectedKit: (kit: TKit) => void;
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

  // Sets the number of bars - allows for a n of bars between 1 and 4 to avoid errors and performance issues
  setBars: (bars: number) => {
    if (bars >= 1 && bars <= 4) {
      set(() => ({ bars }));
    }
  },

  setSelectedKit: (kit: TKit) => set(() => ({ selectedKit: kit })),
}));
