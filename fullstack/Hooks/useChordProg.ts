import { create } from "zustand";
import { combine } from "zustand/middleware";
import { TChord } from "../src/ts/types";

// savedChordProg
//TODO fuck this bundle all the jamSessionData
export const useBearStore = create(
  combine({ chordType: "", rootNote: "" }, (set) => ({
    updateType: (type: string) => set(() => ({ chordType: type })),
    updateRoot: (note: string) => set(() => ({ rootNote: note })),
  }))
);
