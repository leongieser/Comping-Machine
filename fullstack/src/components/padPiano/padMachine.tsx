import { usePadSeqStore } from "../../../Hooks/usePadSeqStore"
import soundBank from "../../../libs/padSounds";
import { useState, useEffect, useRef } from "react";
import ChordSelector from "../machines/chords/ChordSelector";
import * as Tone from 'tone';
import { useMasterControlStore, type TmasterControlStore } from '../drumSequencer/masterControlStore';
import { useChordStore } from "../../../Hooks/useChord";
import { Howl } from 'howler';
import { Chord, transpose, note } from 'tonal';
import { TChord } from "bring/ts/types";
import PianoKeys from "./pianoKeys";


const PadChordMachine = () => {

  const { isPlaying, togglePlaying } = useMasterControlStore() as TmasterControlStore;
  const [ seq, setSeq ] = useState([...Array(16)].map(() => [...Array(2)].fill("")))
  const [ step, setStep ] = useState(null)
  const [chordProg, setChordProg ] = useState([]);
  const {selectedPad, updateSelectedPad, isMuted, updateIsMuted} = usePadSeqStore();
  const [chordNames, setChordNames] = useState([...Array(16).fill("")])
  const chord = useChordStore();
  const [showSelector, setShowSelector] = useState(false);
  const seqRef = useRef<Tone.Sequence>(null);

  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  let count = -1;
  let nextChordRoot;
  let nextChord;

  // Shows or hides the chord selector
  const handleStepClick = (e: React.MouseEvent<HTMLDivElement>) => {

    setStep(e.currentTarget.id)

    showSelector ? setShowSelector(false) : setShowSelector(true);
  }

  const handlePadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    const selectedPadObj = soundBank.find((pad) => pad.name === value);

    updateSelectedPad(selectedPadObj);
  }

  let chordSounds = new Howl({
    src: [selectedPad.url], // This will be dynamic also
    onload() {
      howlerSampler.getSamples();
      setIsAudioLoaded(true);
    },
    onloaderror() {
      console.log('Error loading Howler audio: ')
    }
  })

  const howlerSampler = {
    getSamples: () => {
      const noteLength = 2400; //The audio is made so that each note lasts 2400ms
      let timeMark = 0;
      // Map each note to its corresponding MIDI key starting from C1(24) and finishing with C7(96)
      for (let i = 24; i <= 96; i++) {
        chordSounds['_sprite'][i] = [timeMark, noteLength];
        timeMark += noteLength;
      }
    },
    playChord() {
      if (!isAudioLoaded) {
        console.log('Audio not loaded yet.');
        return;
      }
      const midiNotes = [];
      nextChord.intervals
        .map(interval => transpose(nextChordRoot, interval))
        .forEach(chordNote => {
          midiNotes.push(note(chordNote).midi)
        })
      console.log(midiNotes)
      midiNotes.forEach(n => chordSounds.play(String(n)))
      console.log('looping');
    },
    stopChord() {
      if (!isAudioLoaded) {
        console.log('Audio not loaded yet.');
        return;
      }
      chordSounds.stop();
    }
  }

  const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  useEffect(() => {
    if(isPlaying) {
      //create new sequence
      const seq = new Tone.Sequence((time, chord) => {
        count === chordProg.length -1 ? count = 0 : count++;
        if (chordProg[count]) {
          nextChordRoot = chordProg[count][0]
          nextChord = Chord.get(chordProg[count][1]);
          howlerSampler.playChord();
        }
      }, steps, "16n");
      seq.start();
      seqRef.current = seq;
    } else {
      //stop
      if (seqRef.current !== null) {
        seqRef.current.stop();
        seqRef.current = null;
      }
    }
  }, [isPlaying, chordNames, chordProg, seq]);

  function addChord(chord: TChord) {

    if (chord.chordType && chord.rootNote) {

      const newChord = [chord.rootNote, chord.chordType]
      let prevSeq = seq;
      prevSeq[step] = newChord;
      setSeq([...prevSeq]);
      setChordProg([...prevSeq]);

      let chordRoot = chord.rootNote.slice(0, chord.rootNote.length - 1);
      let chordName = Chord.get(`${chord.rootNote}${chord.chordType}`).aliases[0];
      let prevNames = chordNames;
      prevNames[step] = chordRoot + chordName;
      setChordNames([...prevNames]);

    }

  }

  function removeChord(e: React.MouseEvent<HTMLButtonElement>) {
    const cIdx = Number(e.currentTarget.id);
    const prevSeq = seq;
    prevSeq[cIdx] = ['', '']; // this should set the cord to his initial state (but not null)
    setSeq([...prevSeq]);
    const prevProg = chordProg;
    prevProg[cIdx] = ['', ''];
    setChordProg([...prevProg]);
    const prevNames = chordNames;
    prevNames[cIdx] = '';
    setChordNames([...prevNames]);
  }

  return (
    <>
    <div className="flex flex-row p-4 bg-gray-400 rounded shadow shadow-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)]">
      <div className="bg-slate-200 p-2 rounded shadow shadow-lg shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] w-40">

        <select className="text-fuchsia-900 bg-fuchsia-100 w-18 rounded" onChange={handlePadChange}>
          {soundBank.map((pad) => (
              <option key={pad.name} value={pad.name}>
                {pad.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex left-2 p-2 ml-10 rounded shadow shadow-lg shadow-gray-400 bg-violet-500/50 h-24">
          <span className="text-white text-md mr-2 mt-5 w-[50px]">Steps: </span>

          <div className="relative flex justify-between w-full mt-5">
            {seq.map((_, i) => {

            return (
                <div key={"seq"+i} className="relative">
                  <div key={"stepEl"+i} id={i.toString()}
                    onClick={(e) => handleStepClick(e)}
                    className="inline shadow-[inset_0_-0.5px_4px_rgba(0,0,0,0.6)] hover:opacity-100 hover:bg-fuchsia-500 opacity-80 rounded min-w-[50px] h-fit ml-1.5 mr-1.5 text-center text-white bg-gray-500
                    flex flex-col justify-between">
                    {i + 1}
                  </div>
                  <div key={"buttonContainer"+i} className="">
                    <button className={`opacity-70 hover:opacity-100 absolute -top-3 -right-2
                    ${chordNames[i] ? 'visible' : 'invisible'}`}
                      key={"removeCord"+i} id={i.toString()} onClick={(e) => removeChord(e)}>⛔</button>
                  </div>
                </div>

              )
            })}


            {showSelector &&
              <div className={`w-full absolute top-11 z-10 p-3`}>
                <ChordSelector setShowSelector={setShowSelector} addChord={addChord}/>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default PadChordMachine;