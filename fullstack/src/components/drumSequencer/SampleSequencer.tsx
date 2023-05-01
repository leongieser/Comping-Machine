import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import SampleRow from './SampleRow';
import { useSequencerStore, type TSequencerStore} from './sequencerStore';
import { useMasterControlStore, type TmasterControlStore } from './masterControlStore';
import { getSampleKit } from './sampleKitService';

const SampleSequencer = () => {
  const [ selectedKitName, setSelectedKitName ] = useState('808 Kit'); // needs to go to the store
  const { selectedKit, setSelectedKit, currentPatterns ,initializePatterns } = useSequencerStore() as TSequencerStore;
  const { isPlaying, togglePlaying } = useMasterControlStore() as TmasterControlStore;




  useEffect(() => {
    const fetchSampleKit = async () => {
      const kit = await getSampleKit(selectedKitName);
      setSelectedKit(kit);
      initializePatterns(kit.sounds.length);
    };

    fetchSampleKit();
  }, [selectedKitName, setSelectedKit, initializePatterns]);





//######## goes into playgorund ############################
// only isPlaying will be fetched from the master control store

  const handlePlayBTNPress = async () => {
    await Tone.start()
    togglePlaying()
  }

  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.start("+1");
    } else {
      Tone.Transport.stop();
    }
  }, [isPlaying]);

//#########################################################


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

  return (
    <div>
      <select value={selectedKitName} onChange={(e) => setSelectedKitName(e.target.value)}>
        <option value="808 Kit">808 Kit</option>
        {/* Add more options for other kits */}
      </select>
      {selectedKit?.sounds.map((sound, index) => (
        <SampleRow
          key={index}
          sound={sound}
          soundIndex={index}
          kitName={selectedKit.name}
        />
      ))}
      <button disabled={false} onClick={() => handlePlayBTNPress()}>{isPlaying ? 'Stop' : 'Play'}</button>
    </div>
  );
};

export default SampleSequencer;