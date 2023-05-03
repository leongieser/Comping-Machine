import { useEffect, useState } from 'react';
import * as Tone from "tone";
import AudioBuffer  from 'tone';

type Key = {
  key: string;
  note: string;
  octave: number;
  offset?: number;
};

const pianoKeys: Key[] = [
  { key: "A", note: "C", octave: 2 },
  { key: "W", note: "Db", octave: 2, offset: 2 },
  { key: "S", note: "D", octave: 2 },
  { key: "E", note: "Eb", octave: 2, offset: 24 },
  { key: "D", note: "E", octave: 2 },
  { key: "F", note: "F", octave: 2 },
  { key: "T", note: "Gb", octave: 2, offset: 50 },
  { key: "G", note: "G", octave: 2 },
  { key: "Y", note: "Ab", octave: 2, offset: 72 },
  { key: "H", note: "A", octave: 2 },
  { key: "U", note: "Bb", octave: 2, offset: 0 },
  { key: "J", note: "B", octave: 2 },
  { key: "K", note: "C", octave: 2 },
];

type Synth = {
  synth: Tone.Synth;
  note: string;
};

export default function PianoKeys() {

  const [octave, setOctave] = useState(2);
  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  //useState(new Tone.Synth().toDestination());

  useEffect(() => {

    window.addEventListener("keydown", playNote);
    window.addEventListener("keyup", stopNote);
    return () => {
      window.removeEventListener("keydown", playNote);
      window.removeEventListener("keyup", stopNote);
    };

  }, []);

  useEffect(() => {
    const triggerBuffer = async () => {
      const synth = await new Promise((resolve) => {
        const sampler = new Tone.Synth().toDestination();

        resolve(sampler);
      })
      await Tone.start();
      setSynth(synth as Tone.Synth);
    }

    triggerBuffer()
  }, [])

  function playNoteByKey (key: string) {
    const keyObj = pianoKeys.find(k => k.key === key);
    if (keyObj) {
      const note = keyObj.note + keyObj.octave.toString() ;
      console.log("note", note); // DO NOT REMOVE
      synth.triggerAttack(note, "8n");
      synth.triggerRelease("+1")
    }
  }

  function playNoteByIndex(index: number) {
    const keyObj = pianoKeys[index];
    if (keyObj) {
      const note = keyObj.note + keyObj.octave.toString();
      synth.envelope.decay = 0.1;
      synth.envelope.attack = 0.3;
      synth.triggerAttackRelease(note, "8n");
    }
  }

  function playNote(event: KeyboardEvent) {
    playNoteByKey(event.key.toUpperCase());
  }

  function handleClick(index: number) {
    playNoteByIndex(index);
  }

  function stopNote() {
    synth.triggerRelease();
  }

  function handleOctaveChange(newOctave: number) {
    const newKeys = [...pianoKeys];
    for (let i = 0; i < newKeys.length; i++) {
      newKeys[i].octave = newOctave;
    }
    setOctave(newOctave);
  }
  return (
    <>
      <div className="pianoPage text-stone-300 rounded-md bg-zinc-800 p-3 w-[525px] h-72 border border-black ">
        <div className='flex flex-row mb-4 justify-center'>
          <h1 className='text-lg font-bold'>SYNTHATIZER LEO 3000</h1>
        </div>
        <div className="flex flex-row justify-center text-center relative w-[500px]">
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(0)}
          >
            <p className='mb-2'>A</p>
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-2 w-[38px] left-[95px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(1)}
          >
            <p className='mt-10'>W</p>
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center"
            onClick={() => playNoteByIndex(2)}
          >
            <p className='mb-2'>S</p>
          </button>
          <button
            className="black-key bg-black text-white  absolute left-2 w-[38px] h-20 left-[142px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(3)}
          >
            <p className='mt-10'>E</p>
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center"
            onClick={() => playNoteByIndex(4)}
          >
            <p className='mb-2'>D</p>
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(5)}
          >
            <p className='mb-2'>F</p>
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-2 w-[38px] left-[232px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(6)}
          >
            <p className='mt-10'>T</p>
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(7)}
          >
            <p className='mb-2'>G</p>
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-[279px] w-[38px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(8)}
          >
            <p className='mt-10'>Y</p>
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(9)}
          >
            <p className='mb-2'>H</p>
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-[326px] w-[38px] rounded-br-lg rounded-bl-lg"
            onClick={() => playNoteByIndex(10)}
          >
            <p className='mt-10'>U</p>
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(11)}
          >
            <p className='mb-2'>J</p>
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-36 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(12)}
          >
            <p className='mb-2'>K</p>
          </button>

        </div>
        <div className='flex justify-around mt-8 '>

          <div className='flex flex-col'>
            <label className="text-center mb-2" htmlFor="keys-filter">Filter</label>
            <input type="range" name="keys-filter" id="keys-filter" className="cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500" />
          </div>

          <form className='justify-end'>
            <label >

              <input required
                type="number"
                onChange={(e) => handleOctaveChange(Number(e.target.value))}
                value={octave}
                min={1}
                max={4}
                name='octave' id='octave-root'
                className='text-fuchsia-950 rounded-lg mx-2'/>
              </label>
          </form>

          <div className='flex flex-col'>
            <label className="text-center mb-2" htmlFor="keys-effect" >Effect</label>
            <input type="range" name="keys-effect" id="keys-effect" className="cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"/>
          </div>
        </div>
      </div>
    </>
  );
}

//export default PianoKeys;