import { useEffect, useState } from "react";
import ChordSelector from "./ChordSelector";
import {useChord, useBearStore, useChordStore }from "../../../../Hooks/useChord";
import { Chord, Note } from "tonal";


  const ChordSeq = ({ setProg, savedChords }) => {
  //TODO investigate bars
  const [bars, setBars] = useState(1);

  const [seq, setSeq] = useState([...Array(16).fill(null)]);

  let [step, setStep] = useState(null)
  const [showSelector, setShowSelector] = useState(false);
  const [chordNames, setChordNames] = useState([]);

  const chord = useChordStore();


  useEffect(() => {
    console.log('saved Chord Prog', savedChords)

    if(savedChords) {
      let oldChords = [...Array(16).fill(null)];
      console.log('old chords', oldChords)
      //TODO
      //!
      //foreach much more performant
      for (let i = 0; i < savedChords.length; i++) {
        if (savedChords[i]) {

          //should be on the chord object
          let chordRoot = savedChords[i][0].slice(0, chord.rootNote.length - 1);
          let chordName = Chord.get(`${chordRoot}${savedChords[i][1]}`).aliases[0];
          oldChords[i] = chordRoot + chordName;
        }
      }
      setChordNames([...oldChords])
    } else {
      setChordNames([...Array(16).fill(null)])
    }


  }, [savedChords])

  const handleBars = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("sq", seq)
    let barsN = Number(e.target.value)
    setBars(barsN)
    console.log("sq", seq)
    setSeq([...Array(barsN * 16).fill(1)]) // fill with 0 ?
    console.log("sq after set", seq)
    setChordNames([...Array(barsN * 16).fill(null)]); // this cannot be null
    // barCell+i
    // Array.from({length: 10}, (_, i) => i + 1)

    console.log("seq after:" , seq)
  }

  // Shows or hides the chord selector
  const handleStepClick = (e) => {
    console.log("step: ", e.target.id);
    setStep(e.target.id)
    showSelector ? setShowSelector(false) : setShowSelector(true);
  }

  function addChord() {



    if (chord.chordType && chord.rootNote) {
      const newChord = [chord.rootNote, chord.chordType]
      let prevSeq = seq;
      prevSeq[step] = newChord;
      setSeq([...prevSeq]);
      setProg([...prevSeq]);
      // console.log(newChord, 'step: ', step);

      let chordRoot = chord.rootNote.slice(0, chord.rootNote.length - 1);
      let chordName = Chord.get(`${chord.rootNote}${chord.chordType}`).aliases[0];
      let prevNames = chordNames;
      prevNames[step] = chordRoot + chordName;
      setChordNames([...prevNames]);
    }


  }

  function removeChord(e) {
    console.log("cord to remove: ", e.target.id);
    const prevSeq = seq;
    //! wtf
    prevSeq[e.target.id] = null; // this should set the cord to his initial state (but not null)
    setSeq([...prevSeq]);
    setProg([...prevSeq]);
    const prevNames = chordNames;
    prevNames[e.target.id] = null;
    setChordNames([...prevNames]);
  }

  return (
    <div className="container flex  flex-col items-center my-2">
      <div className="relative p-1 w-10/12">
        <form >
          <label className="text-fuchsia-400">Bars:
            <select onChange={(e) => handleBars(e)} className="text-fuchsia-950 rounded-lg ml-6 mb-2">
              <option>1</option>
              {/* I didn't had the time expand the logic to use more than one measure (16 steps) in the sequence of the chords. The plan is to implement it */}
              <option hidden >2</option>
              <option hidden >4</option>
              <option hidden >16</option>
              <option hidden >32</option>
            </select>
          </label>
        </form>
        <div className="flex ">
          <span className="text-white text-md mr-2 w-[50px]">Steps: </span>

          <div className="relative flex justify-between w-full">
            {seq.map((_, i) => {

            return (

                <div key={"seq"+i} className="relative">
                  <div key={"stepEl"+i} id={i.toString()}
                    onClick={(e) => handleStepClick(e)}
                    className="inline hover:opacity-100 hover:bg-fuchsia-500 opacity-80 rounded min-w-[50px] h-fit text-white bg-fuchsia-600
                    flex flex-col">
                    {i + 1}
                  </div>
                  <div key={"buttonContainer"+i} className="">
                    <button className={`opacity-70 hover:opacity-100 absolute -top-3 -right-2
                    ${chordNames[i] ? 'visible' : 'invisible'}`}
                      key={"removeCord"+i} id={i.toString()} onClick={(e) => removeChord(e)}>⛔</button>
                  </div>
                </div>
              )
            })}
            {showSelector &&
              <div className={`w-full absolute top-11 z-10 p-3`}>
                <ChordSelector setShowSelector={setShowSelector} addChord={addChord}/>
              </div>
            }
          </div>
        </div>
        <div className="block left-20 mt-1">
          <div className="flex justify-between items-center w-full ">
            <span className="text-white text-md -mr-3 w-[50px] ">Chart: </span>
            {chordNames.map((name) => {
              return <div key={name} className="text-fuchsia-950 bg-fuchsia-200 px-1 inline opacity-80 rounded w-[50px] y-[50px] text-sm">
                {name}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChordSeq;