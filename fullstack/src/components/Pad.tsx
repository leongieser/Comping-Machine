import { useState, useEffect } from 'react';

import { Howl } from 'howler';

const Pad = ({ sampleUrl, gradientClass  }) => {
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
    className="drum-pad w-full h-full mr-1.5 mb-1.5 text-white font-bold bg-zinc-600 rounded-md shadow-xl transition-all duration-150 focus:outline-none"    onClick={handleClick}
    >
      {sampleUrl.name}
    </button>
  );
};

export default Pad;