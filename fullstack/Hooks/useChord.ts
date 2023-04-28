import { create } from 'zustand';
import { combine } from 'zustand/middleware'
import {TChord} from '../src/ts/types';
// zustand, light weight library for global state management, simpler than redux... yes
import { Note } from 'tonal';
// Creation of the store:

//TODO rename to useChordStore


export const useChord = create((set) => ({
  chordType: '',
  rootNote: '',
  updateType: (type: string) => set({ chordType: type}),
  updateRoot: (note: string) => set({ rootNote: note }),
}))


// const useChord = create(


//   combine({ chordType: '', rootNote: '' },
//   (set) => ({
//   (set) => ({
//   chordType: '',
//   rootNote: '',
//   updateType: (type: string) => set({ chordType: type}),
//   updateRoot: (note: string) => set({ rootNote: note }),
// }))


// export default useChord;


export const useChordStore = create(

  combine({ chordType: '', rootNote: '' },
  (set) => (
    {
      updateType: (type: string) => set(() => ({ chordType: type})),
      updateRoot: (note: string) => set(() => ({ rootNote: note})),
    }
  ))
)



export const useBearStore = create(
  combine({ bears: 0 },
     (set) => (
      {
        increase: (by: number) => set((state) => ({ bears: state.bears + by })),
        decrease: (by: number) => set((state) => ({ bears: state.bears - by }))
    }
  ))
)