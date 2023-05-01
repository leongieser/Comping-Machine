import { useState, useEffect } from 'react';
import { useSequencerStore, type TSequencerStore } from './sequencerStore';

const SampleRow = ({ sound, soundIndex, kitName }) => {
  const { updatePatternStep, currentPatterns } = useSequencerStore() as TSequencerStore;
  const [pattern, setPattern] = useState(currentPatterns[soundIndex]);

  useEffect(() => {
    setPattern(currentPatterns[soundIndex]);
  }, [currentPatterns, soundIndex]);

  const toggleStep = (stepIndex) => {
    updatePatternStep(soundIndex, stepIndex, !pattern[stepIndex]);
  };

  return (
    <div className='flex'>
      <div className="w-28 flex justify-center">{sound.name}</div>
      <div className="flex items-center">


      {pattern.map((step, index) => (
        <input
        className='ml-2'
        key={index}
        type="checkbox"
        checked={step}
        onChange={() => toggleStep(index)}
        />
        ))}
        </div>
    </div>
  );
};

export default SampleRow;