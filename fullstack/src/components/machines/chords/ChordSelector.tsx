// const chordTypes = require('../../../../libs/chordTypes');
import { commonChords, altDomChords, moreChords} from '../../../../libs/chordTypes';
import { useState, useEffect } from 'react';
import {useChordStore} from '../../../../Hooks/useChord';

const ChordSelector = ({ setShowSelector, addChord}) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedRoot, setSelectedRoot] = useState('');
  const [selectedOctave, setSelectedOctave] = useState('');
  const chord = useChordStore()

  // https://freshman.tech/snippets/typescript/fix-value-not-exist-eventtarget/

  const rootSelect = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Cb'];

  const buildChord = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    let rNote = selectedRoot + selectedOctave;
    let type = e.target.value;
    chord.updateRoot(rNote);
    chord.updateType(type);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSelector(false);
    addChord();
  }

  return (
    <div>

      <form className={
        `text-fuchsia-500 bg-gray-900 rounded-lg
         flex items-center justify-around p-2
      `}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>Octave:
          <select required
            onChange={(e) => setSelectedOctave(e.target.value)}
            name='octave' id='octave-root'
            className='text-fuchsia-950 rounded-lg mx-2'>
            {/* <option selected hidden disabled value="--none--"></option> */}
            <option selected value="2">2</option>
            <option>3</option>
          </select>
        </label>
        <label>Root:
          <select required
            onChange={(e) => setSelectedRoot(e.target.value)}
            name='root' id='note-root'
            className='text-fuchsia-950 rounded-lg mx-2'>
            {<option>{rootSelect[0]}</option>}
            {rootSelect.slice(1).map(root => <option key={root}>{root}</option>)}

          </select>
        </label>
        <label>Type:
          <select required
            onChange={(e) => buildChord(e)}
            name='type' id='chord-type'
            className='text-fuchsia-950 rounded-lg mx-2'>
            <optgroup label="Everyday Chords: ">
            {<option>{commonChords[0]}</option>}
            {commonChords.slice(1).map(type => <option key={type}>{type}</option>)}
            </optgroup>
            <optgroup label="Altered Dominant Chords: ">
              {altDomChords.map(type => <option key={type}>{type}</option>)}
            </optgroup>
            <optgroup label="Other Chords: ">
              {moreChords.map(type => <option key={type}>{type}</option>)}
            </optgroup>
          </select>
        </label>
        <button type='submit'>Add Chord</button>
      </form>

    </div>
  );
}

export default ChordSelector;