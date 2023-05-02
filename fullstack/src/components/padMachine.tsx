import { usePadSeqStore } from "../../Hooks/usePadSeqStore"
import soundBank from "../../libs/padSounds";
import { useState, useEffect, useRef } from "react";
import ChordSelector from "./machines/chords/ChordSelector";
import * as Tone from 'tone';
import { useMasterControlStore, type TmasterControlStore } from './drumSequencer/masterControlStore';
import { useChordStore } from "../../Hooks/useChord";
import { Howl } from 'howler';
import { Chord, transpose, note } from 'tonal';


const PadChordMachine = () => {

  const { isPlaying, togglePlaying } = useMasterControlStore() as TmasterControlStore;



  const [ seq, setSeq ] = useState([...Array(16)].map(() => [...Array(2)].fill("")))
  console.log(seq);

  const [ step, setStep ] = useState(null)
  const [chordProg, setChordProg ] = useState([]);
  const {selectedPad, updateSelectedPad, isMuted, updateIsMuted} = usePadSeqStore();
  const [chordNames, setChordNames] = useState([...Array(16).fill("")])
  const chord = useChordStore();
  const [showSelector, setShowSelector] = useState(false);
  const seqRef = useRef<Tone.Sequence>(null);

  const [isAudioLoaded, setIsAudioLoaded] = useState(false);

  let count = -1; //16ths count, used to play the chords.
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

  function addChord() {

    if (chord.chordType && chord.rootNote) {
      console.log(chord.rootNote)
      const newChord = [chord.rootNote, chord.chordType]
      let prevSeq = seq;
      prevSeq[step] = newChord;
      setSeq([...prevSeq]);
      setChordProg([...prevSeq]);
      // console.log(newChord, 'step: ', step);

      let chordRoot = chord.rootNote.slice(0, chord.rootNote.length - 1);
      let chordName = Chord.get(`${chord.rootNote}${chord.chordType}`).aliases[0];
      let prevNames = chordNames;
      prevNames[step] = chordRoot + chordName;
      setChordNames([...prevNames]);
      console.log(chordNames);
    }

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
      console.log('de we loop and play bitch');
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
      seq.start(0);
      seqRef.current = seq;
    } else {
      //stop
      if (seqRef.current !== null) {
        seqRef.current.stop();
        seqRef.current = null;
      }
    }
  }, [isPlaying, chordNames]);


  return (
    <>
      <div className="bg-emerald-200 p-2 rounded shadow shadow-lg shadow-fuchsia-800">
        <span className="text-emerald-950">Pad Bank: </span>
        <select className="text-fuchsia-900 bg-fuchsia-100" onChange={handlePadChange}>
          {soundBank.map((pad) => (
              <option key={pad.name} value={pad.name}>
                {pad.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex ">
          <span className="text-white text-md mr-2 w-[50px]">Steps: </span>

          <div className="relative flex justify-between w-full">
            {seq.map((_, i) => {

            return (
                <div key={"seq"+i} className="relative">
                  <div key={"stepEl"+i} id={i.toString()}
                    onClick={(e) => handleStepClick(e)}
                    className="inline hover:opacity-100 hover:bg-fuchsia-500 opacity-80 rounded min-w-[50px] h-fit text-white bg-fuchsia-600
                    flex flex-col">
                    {i + 1}
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
      <button disabled={false} onClick={() => togglePlaying()}>{isPlaying ? 'Stop' : 'Play'}</button>
    </>
  )
}

export default PadChordMachine;