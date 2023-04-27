import { create } from 'zustand';
// zustand, light weight library for global state management, simpler than redux... yes
import { Note } from 'tonal';
// Creation of the store:
const useChord = create((set) => ({
  chordType: '',
  rootNote: '',
  updateType: (type) => set({ chordType: type}),
  updateRoot: (note: typeof Note) => set({ rootNote: note }),
}))

export default useChord;