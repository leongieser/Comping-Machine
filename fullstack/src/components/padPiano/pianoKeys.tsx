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
      <div className="pianoPage text-stone-300 rounded-md bg-slate-800 ml-8 p-3 w-[525px]">
        <div className='flex flex-row mb-4 justify-between'>
          <h1 className=''>SYNTH</h1>
          <form className='justify-end'>
            <label >
              Octave:
              <select required
                onChange={(e) => handleOctaveChange(Number(e.target.value))}
                value="2"
                name='octave' id='octave-root'
                className='text-fuchsia-950 rounded-lg mx-2'>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              </label>
          </form>
        </div>
        <div className="flex flex-row justify-center text-center relative w-[500px]">
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(0)}
          >
            A
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-2 w-[38px] left-[95px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(1)}
          >
            W
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center"
            onClick={() => playNoteByIndex(2)}
          >
            S
          </button>
          <button
            className="black-key bg-black text-white  absolute left-2 w-[38px] h-20 left-[142px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(3)}
          >
            E
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center"
            onClick={() => playNoteByIndex(4)}
          >
            D
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(5)}
          >
            F
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-2 w-[38px] left-[232px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(6)}
          >
            T
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(7)}
          >
            G
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-[279px] w-[38px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(8)}
          >
            Y
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(9)}
          >
            H
          </button>
          <button
            className="black-key bg-black text-white h-20 absolute left-[326px] w-[38px] rounded-br-lg rounded-bl-lg "
            onClick={() => playNoteByIndex(10)}
          >
            U
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(11)}
          >
            J
          </button>
          <button
            className="flex white-key bg-white text-black ml-1 h-40 w-[42px] w-8 h-16 rounded-br-md rounded-bl-md items-end justify-center "
            onClick={() => playNoteByIndex(12)}
          >
            K
          </button>

        </div>
      </div>
    </>
  );
}

//export default PianoKeys;