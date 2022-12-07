import { MutableRef, useEffect, useState } from "preact/hooks";
import { Letter } from "./alphabet.ts";
import { NoSay } from "./dictionary.ts";
import { soundManager } from "./soundManager.ts";

export default function Sound(
  { letter, player, onDidPlay }: {
    letter: Letter;
    player?: MutableRef<undefined | (() => void | Promise<void>)>;
    onDidPlay: () => void;
  },
) {
  useEffect(() => soundManager.preload(letter.slow), [letter.slow]);

  const onPlay = async () => {
    const promise = soundManager.play(letter.slow);
    setPlaying(true);
    onDidPlay();

    const result = await promise;

    setPlaying(false);

    return result;
  };

  if (typeof player == "object") {
    player.current = onPlay;
  }

  const [playing, setPlaying] = useState(false);


  const fontClass = letter.letter == "I" ? " font-sans" : "font-sans";
  const playingClass = playing ? "text-red-500" : "hover:text-indigo-500";
  return (
    <div class={"flex flex-col mx-1 " + fontClass + " " + "text-4xl lg:text-8xl"}>
      <div class="m-auto tracking-tight">
        {letter.letter}
      </div>
      <div class={"m-auto cursor-pointer h-8 leading-6 overflow-hidden " + playingClass} onClick={(e) => {
        e.preventDefault();
        onPlay();
      }}>
        •
      </div>
    </div>
  );
}

export function NoSaySound({ letter }: {
  letter: NoSay;
}) {
  return (
    <div class={"flex flex-col font-sans text-4xl lg:text-8xl mx-1"}>
      <div class="m-auto tracking-tight ">
      <span class="text-lg lg:text-4xl">{letter.silent}</span>
      </div>
      <div class={"m-auto h-8 leading-6"}>
        &nbsp;
      </div>
    </div>
  );
}