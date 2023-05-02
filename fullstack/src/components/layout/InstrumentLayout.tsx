import { useSession } from 'next-auth/react'
import PadMachine from '../padMachine';

export default function InstrumentLayout() {
  const {data} = useSession()
  console.log("data from app", data);
  // TODO fetch user sessions?

  //


  return (

    // <PadSequencer/>
    // <DrumSequencer/>
    <div className="flex flex-col justify-center items-center bg-slate-700 w-full h-full">
      <div className='flex flex-row'>
    <section id="pad-sequencer"className="h-60 w-96" ></section>
      <PadMachine />
    {/* <DrumMachine> */}
    <section id="instrument-selection" className="h-60 w-96"></section>
      </div>
      <div className='flex flex-row'>

    <section id="drum-sequencer" className="h-60 w-96" ></section>
    <section id="instrument-selection" className="h-60 w-96"></section>
      </div>
    </div>
  )
}

