import { Howl } from "howler";

export type Sound = {
  url: string;
  name: string;
};

const createKit = (name: string, sounds: Sound[]) => {
  sounds.map((sound) => {
    return new Howl({ src: [sound.url], volume: 0.5 });
  });

  return { name, sounds };
};

export async function getSampleKit(name: string) {
  if (name === "808 Kit") {
    const kit = createKit("808 Kit", [
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
    ]);

    return kit;
  }
}
