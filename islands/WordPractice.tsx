import { useEffect, useRef, useState } from "preact/hooks";
import { Dictionary, NoSay, Word } from "../components/dictionary.ts";
import { Letter } from "../components/alphabet.ts";

export type PracticeProps = {
  dictionary: Dictionary;
};

export function pickWord(dictionary: Dictionary): Word {
  return dictionary[Math.floor(Math.random() * dictionary.length)];
}

export default function WordPractice(props: PracticeProps) {
  const [word, setWord] = useState(() => pickWord(props.dictionary));
  return (
    <div class="flex m-5">
      <div class="m-auto text-6xl">
        {word.sounds.map((sound, i) =>
          "letter" in sound
            ? <Sound key={i} letter={sound} />
            : <Silent letter={sound} />
        )}
        <Word sound={word.audio} />
        <Next onNext={() => setWord(pickWord(props.dictionary))} />
      </div>
    </div>
  );
}

let currentAudio: HTMLAudioElement | null = null;

export function Silent(props: { letter: NoSay }) {
  return (
    <div
      className={`inline-flex items-center rounded-m bg-white px-1 py-4 text-sm font-medium text-gray-700`}
    >
      {props.letter.silent}
    </div>
  );
}

export function Sound(props: { letter: Letter }) {
  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    audio.current = new Audio(props.letter.slow);
  });

  const serif = props.letter.letter == "I";
  const [error, setError] = useState<Error>();

  return (
    <button
      className={`inline-flex items-center rounded-m ${error ? "bg-red-300" : "bg-white"} px-3 py-4 text-4xl font-medium text-gray-700 hover:bg-gray-200`}
      onClick={() => {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio.current || null;
        audio.current?.play().catch((e) => setError(e));
      }}
      onTouchStart={() => {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio.current || null;
        audio.current?.play();
      }}
      onTouchEnd={() => {
        if (audio.current) {
          audio.current.pause();
          audio.current.currentTime = 0;
          currentAudio = null;
        }
      }}
    >
      {props.letter.letter}
      {error?.message}
    </button>
  );
}

export function Next(props: { onNext: () => void }) {
  return (
    <button
      className={`ml-5 inline-flex items-center rounded-md border border-gray-300 bg-white px-8 py-6 text-4xl font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={props.onNext}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
}

export function Word(props: { sound: string }) {
  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    audio.current = new Audio(props.sound);
  }, [props.sound]);

  const [error, setError] = useState<Error>();

  return (
    <button
      className={`ml-5 inline-flex items-center rounded-md border ${
        error ? "border-red-800 bg-red-300" : "border-gray-300 bg-white hover:bg-gray-200"
      } px-8 py-6 text-4xl font-medium text-gray-700 shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={() => {
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio.current || null;
        audio.current?.play().catch((e) => setError(e));
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
        />
      </svg>
      {error?.message}
    </button>
  );
}
