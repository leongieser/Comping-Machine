import DrumPad from "./Pad"
import { getKit } from "../services/sampleKitService"
import { useState, useEffect } from "react"
import { TKit } from './drumSequencer/sequencerStore'

function App() {
  const [kit, setKit] = useState<TKit | null >(null)

  useEffect(() => {
    setKit(getKit("Acoustic Kit"))
  }, [])

  return (

<div className=''>

    <div className="flex flex-wrap border border-black w-full
     bg-zinc-800 rounded-md drop-shadow-md shadow-2xl ">
              {kit
                ? kit.sounds.map((sampleUrl, index) => (
                  <div key={index} className="w-1/4">
                      <div className="p-2">
                        <DrumPad sampleUrl={sampleUrl}  />
                      </div>
                    </div>
                  ))
                  : null}
      </div>
                  </div>
  );
}

export default App;
