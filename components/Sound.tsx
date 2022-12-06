import { useEffect, useState } from "preact/hooks";
import { Letter } from "./alphabet.ts";
import { soundManager } from "./soundManager.ts";

export default function Sound({ letter, size }: { letter: Letter, size: "letter" | "word" | "sentance" }) {
  useEffect(() => soundManager.preload(letter.slow), [letter.slow])
  
  const [playing, setPlaying] = useState(false);

  const onPlay = async () => {
    const promise = soundManager.play(letter.slow);
    setPlaying(true);
    
    await promise;

    setPlaying(false);
  }

  const sizeClass = size == "letter" ? "text-8xl" : "text-xl"
  const playingClass = playing ? "text-red-500" : ""
  return <div class={"flex flex-col p-1 " + sizeClass} onClick={onPlay}>
    <div class="m-auto tracking-tight">
      {letter.letter}
    </div>
    <div class={"m-auto cursor-pointer " + playingClass}>
    •
    </div>
  </div>
}