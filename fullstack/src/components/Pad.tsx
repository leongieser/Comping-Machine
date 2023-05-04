import { useState, useEffect } from 'react';

import { Howl } from 'howler';

const Pad = ({ sampleUrl  }) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const newSound = new Howl({
      src: [sampleUrl.url],
      preload: true
    });
    setSound(newSound);
  }, [sampleUrl]);

  const handleClick = () => {
    // if (sound) {
    //   if (sound.playing()) {
    //     sound.stop();
    //   } else {
        sound.play();
      // }

  };

  return (
    <button
    className="drum-pad w-[115px] h-[115px] text-white font-bold bg-zinc-600 rounded-md shadow-xl transition-all duration-150 focus:outline-none"    onClick={handleClick}
    >
      {sampleUrl.name}
    </button>
  );
};

export default Pad;