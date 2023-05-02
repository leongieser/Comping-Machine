import {useState, useEffect, useRef} from 'react'
import * as Tone from 'tone';
import { useMasterControlStore, type TmasterControlStore } from './masterControlStore';
import { useSequencerStore, type TSequencerStore} from './sequencerStore';

// const NOTE = "C2";

type Track = {
  id: number;
  sampler: Tone.Sampler;
};

type ToneTrack = {
    id: number,
    sampler: {urls: {[key: string]: string}}
  }



type Props = {
  samples: { url: string; name: string }[];
  numOfSteps?: number;
};



const SeqTest = () => {
  const { isPlaying, togglePlaying, steps} = useMasterControlStore() as TmasterControlStore
  const { selectedKit, currentPatterns, currentSequence, setCurrentSequence } = useSequencerStore() as TSequencerStore

    //TODO change target to at least es2015
    const stepIds = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] as const;





    const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      Tone.Transport.bpm.value = Number(e.target.value);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value));
    };

    // to howl or not to howl
    useEffect(() => {
      selectedKit.sounds.map((sample, sampleIndex) => ({
        id: sampleIndex,
        name: sample.name,
        sampler: new Tone.Sampler({
          urls: {
            ["C2"]: sample.url,
          },
        }).toDestination(),
      }));

      setCurrentSequence(new Tone.Sequence(
        (time, step: number) => {

          //TODO type changes after mapping
          selectedKit.sounds.map((sound, i) => {
            if (currentPatterns[i][step]) {
              sound.sampler.triggerAttack("C2", time); //TODO place note into sequencerStore
            }
            // lampsRef.current[step].checked = true; // todo create step indicator
          });
        },
        [...stepIds],
        "16n"
      ));

        console.log(currentSequence);
      currentSequence.start(0);

      return () => {
        currentSequence.dispose();
        setCurrentSequence(null);
        selectedKit.sounds.map((sound) => void sound.sampler.dispose());
      };
    }, [selectedKit, isPlaying]);

    return (
      <div>
        <div>
          {selectedKit.sounds.map((sample) => (
            <div>{sample.name}</div>
          ))}
        </div>

      </div>
    );
  }

  export default SeqTest;