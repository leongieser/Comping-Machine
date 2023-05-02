import { create } from 'zustand';
import bankBuilder from '../libs/padSounds'
import soundBank from '../libs/padSounds';
import { Howl } from 'howler';

interface BankBuilder {
  name: string;
  url: string;
}

interface PadSeqStoreState {
  selectedPad: BankBuilder;
  isMuted: boolean;
  masterVolume: number;
}

interface PadSeqStoreMethods extends PadSeqStoreState {
  updateSelectedPad: (pad: BankBuilder) => void;
  updateIsMuted: (value: boolean) => void;
  updateMasterVolume: (vol: number) => void;
}

export const usePadSeqStore = create<PadSeqStoreMethods>((set) => ({

  selectedPad: soundBank[0],
  isMuted: false,
  masterVolume: 0.5,

  updateSelectedPad: (pad) => set(() => ({ selectedPad: pad})),
  updateIsMuted: (value) => set(() =>({ isMuted: value })),
  updateMasterVolume: (vol) => set(() =>({ masterVolume: vol}))
}))