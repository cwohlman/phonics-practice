import { useEffect, useRef } from "preact/hooks";
import { Alphabet, Letter } from "../components/alphabet.ts";

interface PracticeProps {
  alphabet: Alphabet;
}


export default function Practice(props: PracticeProps) {
  return (
    <div class="flex gap-2 w-full flex-wrap">
      {props.alphabet.map((m) => <Sound key={m.letter} letter={m} />)}
    </div>
  );
}

let currentAudio: HTMLAudioElement | null = null;

export function Sound(props: { letter: Letter }) {
  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    audio.current = new Audio(props.letter.slow);
  });

  const serif = props.letter.letter == "I";

  return (
    <button
      className={`inline-flex ${serif ? "font-serif" : ""} items-center rounded-md border border-gray-300 bg-white px-8 py-6 text-4xl font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={() => {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio.current || null;
        audio.current?.play()
      }}
      onTouchStart={() => {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio.current || null;
        audio.current?.play()
      }}
      onTouchEnd={
        () => {
          if (audio.current) {
            audio.current.pause();
            audio.current.currentTime = 0;
            currentAudio = null;
          }
        }
      }
    >
      {props.letter.letter}
    </button>
  );
}
