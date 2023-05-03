import { useSession } from 'next-auth/react'
import PadMachine from '../padPiano/padMachine';
import SampleSequencer from '../drumSequencer/SampleSequencer';
import { useMasterControlStore, type TmasterControlStore } from '../drumSequencer/masterControlStore';
import { PlayIcon, PauseIcon } from '@radix-ui/react-icons';
import PianoKeys from '../padPiano/pianoKeys';
export default function InstrumentLayout() {
  const {data} = useSession()
  console.log("data from app", data);
  // TODO fetch user sessions?


const {isPlaying, togglePlaying, bpm, setBpm, globalVolume, setGlobalVolume} = useMasterControlStore() as TmasterControlStore;
  return (


    <div className='flex items-star'>

    <div className="grid grid-cols-custom grid-rows-custom gap-0 bg-zinc-900 w-full h-100 ">

    <section id="pad-sequencer"className="flex justify-center items-center col-start-2 col-end-3 row-start-2 row-end-3" >
      <PadMachine />
    </section>

    <section id="control-section" className="flex col-start-2 col-end-3 row-start-3 row-end-4 justify-center mb-5">
      <div className='w-[900px] flex items-center bg-zinc-700 rounded'>

      <button className={`border-2 border-zinc-950 flex items-center justify-center w-16 h-10 ml-20 rounded-md ${isPlaying ? "bg-red-300" : "bg-green-300"}` } onClick={togglePlaying}>
        {isPlaying ? <PauseIcon style={{width: "20px", height: "20px", strokeWidth: "3px"}} /> : <PlayIcon style={{width: "20px", height: "20px", strokeWidth: "3px"}}/>}
        </button>

    <div className='flex flex-row items-center ml-56'>
      <label className='relative text-zinc-200 text-l' >BPM: {bpm}

        <input
          className='w-[200px] ml-2 mb-2 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-runnable-track]:h-[20px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500'
          type='range'
          min={40}
          max={250}
          step={1}
          onChange={(e) => setBpm(Number(e.target.value))} defaultValue={120}
          />
      </label>

      <label className='relative text-zinc-200 text-l ' >Master Vol: {Math.ceil(globalVolume * 100)}

        <input
          className='w-[200px] ml-2 mt-2 cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-black/25 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500'
          type='range'
          min={0}
          max={1}
          step={0.01}
          onChange={(e) => setGlobalVolume(Number(e.target.value))} defaultValue={0.5}
          />
      </label>
    </div>

           {/*
          <label className='relative text-fuchsia-500 text-xl opacity-80 '>
          <div className='min-w-[600px] absolute -top-6'>PAD LEVEL: </div>
          <input className='w-[200px]'
          type='range' min={0} max={1} step={0.01} onChange={ (e) => handlePadLevel(e)} defaultValue={0.70} />
        </label> */}

        </div>
    </section>

    <section id="piano-keys" className="flex justify-center items-center col-start-3 col-end-4 row-start-2 row-end-4">

      <PianoKeys/>
    </section>

    {/* <section id="drum-sampler-selection" className=" flex items-center justify-center col-start-3 col-end-4 row-start-3 row-end-4">
          <div>placeholder for some funky stuff</div>
    </section> */}



    <section id="drum-sequencer" className="flex items-center justify-center col-start-2 col-end-3 row-start-4 row-end-6 bg-zinc-900" >
    <SampleSequencer />
    </section>
    <section id="drumpad-selection" className="col-start-3 col-end-4 row-start-4 row-end-6 flex items-center justify-center bg-zinc-900">
      <div className='bg-teal-500 w-[500px] h-[500px]'></div>
    </section>

    </div>
          </div>
  )
}

