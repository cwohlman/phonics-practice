import { MutableRef, useEffect, useRef, useState } from "preact/hooks";

import { Letter } from "./alphabet.ts";
import { Word } from "./dictionary.ts";
import Sound, { NoSaySound } from "./Sound.tsx";
import { soundManager } from "./soundManager.ts";

export default function SoundGroup(
  { word, wordPlayer, soundPlayer, onDidPlay, onDidSoundOut }: {
    word: Word;
    wordPlayer?: MutableRef<undefined | (() => void | Promise<void>)>;
    soundPlayer?: MutableRef<undefined | (() => void | Promise<void>)>;
    onDidPlay: () => void;
    onDidSoundOut: () => void;
  },
) {
  const sounds = word.sounds;
  useEffect(() => soundManager.preload(word.audio), [word.audio]);

  const onPlay = async () => {
    const promise = soundManager.play(word.audio);
    setPlaying(true);
    onDidPlay();

    await promise;

    setPlaying(false);
  };

  const onSoundOut = async () => {
    for (const ref of refs.current) {
      if (ref?.current) await ref.current();
    }
  };

  if (typeof wordPlayer == "object") {
    wordPlayer.current = onPlay;
  }

  if (typeof soundPlayer == "object") {
    soundPlayer.current = onSoundOut;
  }

  const [playing, setPlaying] = useState(false);

  const refs = useRef<(MutableRef<(() => void | Promise<void>) | undefined> | undefined)[]>([])
  const getRef = (i: number) => {
    if (! refs.current[i]) refs.current[i] = { current: undefined }
    
    return refs.current[i];
  }

  const playingClass = playing ? "text-red-500" : "hover:text-indigo-500"
  return (
    <div class="flex flex-col">
      <div class="flex mx-5">
        {sounds.map((letter, i) =>
          "silent" in letter
            ? <NoSaySound letter={letter} />
            : <Sound letter={letter} player={getRef(i)} onDidPlay={onDidSoundOut} />
        )}
      </div>
      <div class={"py-1 mx-5 cursor-pointer mb-2 " + playingClass} onClick={onPlay}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 105 24"
          stroke-width="6"
          stroke="currentColor"
          class="w-full h-6"
          preserveAspectRatio="none"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M97.25 3.25L101 12m0 0l-3.75 8.75M101 12H3"
          />
        </svg>
      </div>
    </div>
  );
}
