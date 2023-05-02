import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import SampleRow from './SampleRow';
import { useSequencerStore, type TSequencerStore} from './sequencerStore';
import { useMasterControlStore, type TmasterControlStore } from './masterControlStore';
import { getKit } from './sampleKitService';

const SampleSequencer = () => {
  const { selectedKit, setSelectedKit, currentPatterns } = useSequencerStore() as TSequencerStore;

  //TODO move to parent component once testing is done
  const { isPlaying, togglePlaying, bpm, setBpm } = useMasterControlStore() as TmasterControlStore;
  const handleKitChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKit = await getKit(e.target.value);
    setSelectedKit(newKit);
  };
  //TODO #############################################

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };


  // testing out two different approaches. it already works just experimenting with different ways to do it


  useEffect(() => {
    if (!currentPatterns) return;

    const scheduleSamples = (time) => {
      currentPatterns.forEach((row, rowIndex) => {
        row.forEach(async (step) => {
          if (step) {
            const sample = selectedKit.sounds[rowIndex];

            // Buffer is failing try howler?
            const player: Tone.Player = await new Promise((resolve, reject) => {
              const player = new Tone.Player({
                  url: sample.url,
                  onerror: (err) => reject(err),
                  onload: () => resolve(player),

              })});

            player.toDestination()

            player.start(time);
          }
        });
      });
    };

    Tone.Transport.scheduleRepeat(scheduleSamples, '1n');
  }, [currentPatterns, selectedKit]);
  //? should slectedKit be here? or is the change of currentPatterns enough?
  //! I think it should be here because the selectedKit is what is being used to get the samples



  return (
    <div>
      <div>
        <label htmlFor="volume">BPM: {bpm}</label>
        <input type="range" id="bpm" name="bpm" min="0" max="0" step={0.1} />
      </div>

      <button onClick={togglePlaying}className="h-10 w-20 flex justify-center items-center">{isPlaying ? "Pause" : "Play"}</button>

      <select onChange={handleKitChange}>
        <option selected value={selectedKit.name}>{selectedKit.name}</option>
        <option value="Acoustic Kit">Acoustic Kit</option>
      </select>

      {selectedKit?.sounds.map((sound, index) => (
        <SampleRow
          key={index}
          sound={sound}
          soundIndex={index}
        />
      ))}

    </div>
  );
};

export default SampleSequencer;