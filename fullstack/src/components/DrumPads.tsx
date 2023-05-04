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


    <div className="flex flex-wrap">
              {kit
                ? kit.sounds.map((sampleUrl, index) => (
                    <div key={index} className="w-1/4 p-1">
                      <div className="h-32 w-32">
                        <DrumPad sampleUrl={sampleUrl}  />
                      </div>
                    </div>
                  ))
                 : null}
      </div>
  );
}

export default App;
