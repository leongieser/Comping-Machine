import * as Tone from "tone";
import { useMasterControlStore, type TmasterControlStore } from './masterControlStore';
import { useSequencerStore, type TSequencerStore } from './sequencerStore';
import { useRef, useEffect, useState } from 'react';
import { UpdateIcon } from "@radix-ui/react-icons"

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

const KEY = "C4"

const SampleSequencer = ()  => {
  const { note, nOfSteps, isPlaying} = useMasterControlStore() as TmasterControlStore;
  const { selectedKit } = useSequencerStore() as TSequencerStore;
  const [ samplesLoaded, setSamplesLoaded ] = useState(false);

  //!TEMP TO REMOVE
  const drumsVolume = useState(0);
  
  const tracksRef = useRef<Track[]>([]);
  const stepsRef = useRef<HTMLInputElement[][]>([[]]);
  const lampsRef = useRef<HTMLInputElement[]>([]);
  const seqRef = useRef<Tone.Sequence | null>(null);
  const trackIds = Array.from({ length: nOfSteps }, (_, i) => i)
  const stepIds = Array.from({ length: nOfSteps }, (_, i) => i) ;

  const resetPattern = () => {
    stepsRef.current.forEach((step) => {
      step.forEach((step) => {
        step.checked = false;
      });
    });
  };

  const muteTrack = (e) => {
    // If is muted...
    if (tracksRef.current[e.target.id].sampler.volume.value < 0) {
      tracksRef.current[e.target.id].sampler.volume.value = 0;
      e.target.classList.remove('ring-rose-400');
      e.target.classList.remove('shadow-rose-500/50');
      e.target.classList.remove('hover:bg-rose-300');
      e.target.classList.remove('text-rose-300');
      e.target.classList.add('ring-emerald-400');
      e.target.classList.add('shadow-emerald-500/50');
      e.target.classList.add('hover:bg-emerald-300');
      e.target.classList.add('text-emerald-100');

    } else {
      tracksRef.current[e.target.id].sampler.volume.value = -64;
      e.target.classList.add('ring-rose-400');
      e.target.classList.add('shadow-rose-500/50');
      e.target.classList.add('text-rose-300');
      e.target.classList.add('hover:bg-rose-300');
    }
  }

  useEffect(() => {
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


useEffect(() => {

}, [drumsVolume]);




    setSamplesLoaded(true);
    return () => {
      seqRef.current?.dispose();
      tracksRef.current.forEach((trk) => void trk.sampler.dispose());
    };
  }, [selectedKit.sounds, nOfSteps]);


  // const muteTrack = (e) => {
  //   if (tracksRef.current[e.target.id].sampler.volume.value < 0) {
  //     tracksRef.current[e.target.id].sampler.volume.value = 0;
  //   } else {
  //     tracksRef.current[e.target.id].sampler.volume.value = -Infinity;
  //   }
  // }

  const playSample = (e) => {
    tracksRef.current[e.target.id].sampler.triggerAttack(KEY)
  }

  if(!samplesLoaded) {
   return (
      <div className="flex justify-center items-center bg-slate-400">
        Loading samples...
      </div>
   )
  }


  return (
    <div className={`border border-black
    flex justify-center items-center bg-zinc-800 p-5 rounded-md drop-shadow-md shadow-2xl  ${isPlaying ? "shadowzinc-black/50" : "shadow-none"}`}>

      {/* <div className="border p-1 ">
        <div className="h-6 font-normal text-sm">
          <select className="h-6 font-normal text-x" name="cars" id="cars" form="carform">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

      </div> */}

        <div id="drum-container" className="flex flex-col p-3">





        <div className='flex h-11'>

        <div className='flex justify-between items-center w-[147px]'>
              <select className="bg-zinc-200 w-[100px] ml-3 rounded text-center" name="" id="">
                <option value="">808</option>
                <option value="">2</option>
                <option value="">3</option>

              </select>
              <button onClick={resetPattern} className='ml- bg-red-500 h-6 w-6 rounded-full flex justify-center items-center'>
                {/* <svg width="15" height="15" viewBox="0 0 15 15" fillRule="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> */}
                <UpdateIcon />
              </button>
            </div>

        <div id="lamp-container" className="flex items-center h-8  ml-[15px] mt-1.5">
          {stepIds.map((stepId) => (
            <label key={stepId} className="flex items-center justify-center ml-3.5 w-5 mr-3.5 rounded ">
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
          {/* { <label key={15} className="flex items-center justify-center w-5 m-3 rounded ">
              <input className="h-8 w-8 checked:opacity-100 focus:emerald-100"
                type="radio"
                name="lamp"
                id={"lamp" + "-" + 15}
                disabled
                ref={(elm) => {
                  if (!elm) return;
                  lampsRef.current[15] = elm;
                }}

                />
            </label>} */}
        </div>
        </div>


          {trackIds.map((trackId, i) => (
            <div className='my-1.5 flex'>
              <button
                id={trackId.toString()}
                onClick={(e) => { muteTrack(e), { passive: true } }} // passive true... Very nice feature!
                className="text-emerald-100 text-sm flex flex-col justify-center items-center
                w-[100px] ring-1  p-1 mx-3 rounded shadow-lg ring-emerald-400 shadow-emerald-500/50 hover:bg-emerald-300 hover:text-white"
                >{selectedKit.sounds[trackId].name}
              </button>

             <button id={trackId.toString()} onClick={(e) => playSample(e)}
             className='w-fit mr-3 text-md ring-1 ring-sky-500 text-sky-400 p-1  rounded
             shadow-md shadow-sky-900 hover:bg-sky-700 hover:shadow-sky-700 hover:shadow-lg hover:text-white'
             >►</button>
            <div key={trackId+i} className="flex items-center h-8 ml-2"> {/* entire checkbox row */}
              {stepIds.map((stepId) => {
                const id = trackId + "-" + stepId;
                return (
                  <input
                  className="h-10 w-10 mr-2
                  bg-orange-200 rounded border-orange-400 text-orange-500 checked:ring-orange-900 opacity:70 checked:opacity-100 shadow shadow-md
                  hover:bg-orange-300 accent-transparent checked:shadow-xl focus:border-1 shadow-orange-800 cursor-pointer"
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

                </div>
          ))}

        </div>
      </div>



  );
}

export default SampleSequencer;