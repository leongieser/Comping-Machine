import { create } from "zustand";
import { combine } from "zustand/middleware";
import { TChord } from "../src/ts/types";

// savedChordProg
//TODO fuck this bundle all the jamSessionData
export const useChordProg = create(
  combine({ chordType: "", rootNote: "" }, (set) => ({
    updateType: (type: string) => set(() => ({ chordType: type })),
    updateRoot: (note: string) => set(() => ({ rootNote: note })),
  }))
);

interface ChordsSavedStore {
  chords: TChord[],
  addChord: (chord: TChord) => void;
}

export const useChordsSavedStore = create<ChordsSavedStore>((set) => ({
  chords: [],
  addChord: (chord) => set((state) => ({ chords: [...state.chords, chord]}))
}));