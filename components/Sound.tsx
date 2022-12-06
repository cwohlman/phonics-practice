import { MutableRef, useEffect, useState } from "preact/hooks";
import { Letter } from "./alphabet.ts";
import { soundManager } from "./soundManager.ts";

export default function Sound(
  { letter, size, player }: {
    letter: Letter;
    size: "letter" | "word" | "sentance";
    player?: MutableRef<undefined | (() => void | Promise<void>)>;
  },
) {
  useEffect(() => soundManager.preload(letter.slow), [letter.slow]);

  const onPlay = async () => {
    const promise = soundManager.play(letter.slow);
    setPlaying(true);

    await promise;

    setPlaying(false);
  };

  if (typeof player == "object") {
    player.current = onPlay;
  }

  const [playing, setPlaying] = useState(false);


  const sizeClass = size == "letter" ? "p-4 text-8xl" : " p-2 text-xl";
  const fontClass = letter.letter == "I" ? " font-sans" : "font-sans";
  const playingClass = playing ? "text-red-500" : "hover:text-indigo-500";
  return (
    <div class={"flex flex-col " + fontClass + " " + sizeClass}>
      <div class="m-auto tracking-tight -mb-6">
        {letter.letter}
      </div>
      <div class={"m-auto cursor-pointer " + playingClass} onClick={onPlay}>
        •
      </div>
    </div>
  );
}
