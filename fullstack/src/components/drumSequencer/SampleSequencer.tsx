import * as Tone from "tone";
import { useMasterControlStore, type TmasterControlStore } from './masterControlStore';
import { useSequencerStore, type TSequencerStore } from './sequencerStore';
import { useRef, useEffect, useState } from 'react';

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

const SampleSequencer = ()  => {
  const { note, nOfSteps} = useMasterControlStore() as TmasterControlStore;
  const { selectedKit } = useSequencerStore() as TSequencerStore;
  const [ samplesLoaded, setSamplesLoaded ] = useState(false);


  const tracksRef = useRef<Track[]>([]);
  const stepsRef = useRef<HTMLInputElement[][]>([[]]);
  const lampsRef = useRef<HTMLInputElement[]>([]);
  const seqRef = useRef<Tone.Sequence | null>(null);
  const trackIds = Array.from({ length: nOfSteps }, (_, i) => i)
  const stepIds = Array.from({ length: nOfSteps }, (_, i) => i) ;


  const [synth, setSynth] = useState<Tone.Synth | null>(null);

  useEffect(() => {


    const triggerBuffer = async () => {
      const synth = await new Promise((resolve) => {
        const sampler = new Tone.Synth().toDestination();



      })

      setSynth(synth as Tone.Synth);

    }

    triggerBuffer()


    const loadSamples = async () => {

      const samplers = await Promise.all(

        selectedKit.sounds.map((sample, i) =>

          new Promise((resolve) => {
            const sampler = new Tone.Sampler({
              urls: {
                [note]: sample.url,
              },
              onload: () => {
                resolve({
                  id: i,
                  sampler: sampler.toDestination(),
                });
              },
            });
          })
        )
      );

      tracksRef.current = samplers as Track[];




      seqRef.current = new Tone.Sequence(
        (time, step) => {
          tracksRef.current.forEach((track) => {
            if (stepsRef.current[track.id]?.[step]?.checked) {
              track.sampler.triggerAttack(note, time);
            }
            lampsRef.current[step].checked = true;
          });
        },
        [...stepIds], "16n"
      );

      seqRef.current.start(0);
    };

    loadSamples();




    setSamplesLoaded(true);
    return () => {
      seqRef.current?.dispose();
      tracksRef.current.forEach((trk) => void trk.sampler.dispose());
    };
  }, [selectedKit.sounds, nOfSteps]);


  if(!samplesLoaded) {
   return (
      <div className="flex justify-center items-center bg-slate-400">
        Loading samples...
        </div>
   )
  }


  return (
    <div className="flex justify-center items-center bg-slate-400">

      <div className="border p-1 ">
        <div className="h-6 font-normal text-sm">
          <select className="h-6 font-normal text-x" name="cars" id="cars" form="carform">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
          {selectedKit.sounds.map((sample, i) => (
        <div key={"sample"+i+1} className={"bg-slate-200 h-6 p-0.5 flex justify-center items-center font-normal text-sm"}>{sample.name}</div>
          ))}
      </div>

        <div className="flex flex-col">
        <div className="flex h-6 ml-2">
          {stepIds.map((stepId) => (
            <label key={stepId} className="flex items-center justify-center ml-2 w-5 mr-3.5 rounded ">
              <input className="h-8 w-8 checked:opacity-100 focus:emerald-100"
                type="radio"
                name="lamp"
                id={"lamp" + "-" + stepId}
                disabled
                ref={(elm) => {
                  if (!elm) return;
                  lampsRef.current[stepId] = elm;
                }}
              />
            </label>
          ))}
        </div>
          {trackIds.map((trackId, i) => (
            <div key={trackId+i} className="flex items-center h-8 mb-2 ml-2"> {/* entire checkbox row */}
              {stepIds.map((stepId) => {
                const id = trackId + "-" + stepId;
                return (
                  <input
                    className="h-10 w-10 mr-0.5
                    bg-fuchsia-200 rounded border-fuchsia-400 text-fuchsia-500 checked:ring-fuchsia-900 opacity:70 checked:opacity-100 shadow shadow-md
                    hover:bg-fuchsia-300 checked:shadow-fuchsia-200 checked:shadow-fuchsia-800 checked:shadow-xl focus:border-1 shadow-fuchsia-800"
                    key={id}
                    id={id}
                    type="checkbox"
                    ref={(elm) => {
                      if (!elm) return;
                      if (!stepsRef.current[trackId]) {
                          stepsRef.current[trackId] = [];
                        }
                      stepsRef.current[trackId][stepId] = elm;
                      }
                    } />
                );
              })}
            </div>
          ))}
        </div>
      </div>



  );
}

export default SampleSequencer;