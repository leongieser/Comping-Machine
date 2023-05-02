import { Howl } from "howler";

export type Sound = {
  url: string;
  name: string;
};

// const createKit = (name: string, sounds: Sound[]) => {
//   sounds.map((sound) => {
//     return new Howl({ src: [sound.url], volume: 0.5 });
//   });

//   return { name, sounds };
// };

export async function getKit(name: string) {
  let kit;

  if (name === "808 Kit") {
    kit = {
      name: "808 Kit",
      sounds: [
        { url: "/audio/kit-808/kick.mp3", name: "Kick" },
        { url: "/audio/kit-808/rimshot.mp3", name: "Rim Shot" },
        { url: "/audio/kit-808/snare.mp3", name: "Snare" },
        { url: "/audio/kit-808/clap.mp3", name: "Clap" },
        { url: "/audio/kit-808/conga-low.mp3", name: "Conga Low" },
        { url: "/audio/kit-808/conga-mid.mp3", name: "Conga Mid" },
        { url: "/audio/kit-808/conga-high.mp3", name: "Conga High" },
        { url: "/audio/kit-808/tom-low.mp3", name: "Tom Low" },
        { url: "/audio/kit-808/tom-mid.mp3", name: "Tom Mid" },
        { url: "/audio/kit-808/tom-high.mp3", name: "Tom High" },
        { url: "/audio/kit-808/hihat-closed.mp3", name: "Hihat Closed" },
        { url: "/audio/kit-808/hihat-open.mp3", name: "Hihat Open" },
        { url: "/audio/kit-808/cymbal.mp3", name: "Cymbal" },
        { url: "/audio/kit-808/maracas.mp3", name: "Maracas" },
        { url: "/audio/kit-808/cow-bell.mp3", name: "Cow Bell" },
        { url: "/audio/kit-808/claves.mp3", name: "Claves" },
      ],
    };
  }

  if (name === "Acoustic Kit") {
    kit = {
      name: "Acoustic Kit",
      sounds: [
        { url: "/audio/kit-acoustic/kick.mp3", name: "Kick" },
        { url: "/audio/kit-acoustic/sidestick.mp3", name: "Sidestick" },
        { url: "/audio/kit-acoustic/snare.mp3", name: "Snare" },
        { url: "/audio/kit-acoustic/snare-rh.mp3", name: "Snare 2" },
        { url: "/audio/kit-acoustic/snare-soft.mp3", name: "Snare 3" },
        { url: "/audio/kit-acoustic/tom-4.mp3", name: "Tom 4" },
        { url: "/audio/kit-acoustic/tom-3.mp3", name: "Tom 3" },
        { url: "/audio/kit-acoustic/tom-2.mp3", name: "Tom 2" },
        { url: "/audio/kit-acoustic/tom-1.mp3", name: "Tom 1" },
        { url: "/audio/kit-acoustic/hihat-foot.mp3", name: "Hihat Foot" },
        { url: "/audio/kit-acoustic/hihat-closed.mp3", name: "Hihat Closed" },
        { url: "/audio/kit-acoustic/hihat-open.mp3", name: "Hihat Open" },
        { url: "/audio/kit-acoustic/crash.mp3", name: "Crash" },
        { url: "/audio/kit-acoustic/ride-edge.mp3", name: "Ride Edge" },
        { url: "/audio/kit-acoustic/ride-bell.mp3", name: "Ride Bell" },
        { url: "/audio/kit-acoustic/china.mp3", name: "China" },
      ],
    };
  }

  return kit;
}
