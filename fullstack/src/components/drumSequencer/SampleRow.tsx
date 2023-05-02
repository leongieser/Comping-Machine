import { useSequencerStore, type TSequencerStore } from './sequencerStore';

const SampleRow = ({ sound, soundIndex }) => {
  const { updatePatternStep } = useSequencerStore() as TSequencerStore;




  const toggleStep = (stepIndex: number) => {
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