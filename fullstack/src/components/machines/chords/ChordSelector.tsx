import { commonChords, altDomChords, moreChords} from '../../../../libs/chordTypes';
import { useState, useEffect } from 'react';
import {useChordStore} from '../../../../Hooks/useChord';
import { useChordsSavedStore } from '../../../../Hooks/useChordProg';

const ChordSelector = ({ setShowSelector, addChord}) => {
  const [selectedOctave, setSelectedOctave] = useState('2');
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedType, setSelectedType] = useState(commonChords[0]);

  const rootSelect = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'E#', 'Fb', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'B#', 'Cb'];

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();
    let rNote = selectedRoot + selectedOctave;
    let type = selectedType;
    useChordStore.getState().updateRoot(rNote);
    useChordStore.getState().updateType(type);
    const chordAdd = useChordStore.getState();
    useChordsSavedStore.getState().addChord(chordAdd);
    setShowSelector(false);
    addChord(chordAdd);

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
            value="2"
            name='octave' id='octave-root'
            className='text-fuchsia-950 rounded-lg mx-2'>
            {/* <option selected hidden disabled value="--none--"></option> */}
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <label>Root:
          <select required
            onChange={(e) => setSelectedRoot(e.target.value)}
            name='root' id='note-root'
            className='text-fuchsia-950 rounded-lg mx-2'>
            {<option selected>{rootSelect[0]}</option>}
            {rootSelect.slice(1).map(root => <option key={root}>{root}</option>)}

          </select>
        </label>
        <label>Type:
          <select required
            onChange={(e) => setSelectedType(e.target.value)}
            name='type' id='chord-type'
            className='text-fuchsia-950 rounded-lg mx-2'>
            <optgroup label="Everyday Chords: ">
            {<option selected >{commonChords[0]}</option>}
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