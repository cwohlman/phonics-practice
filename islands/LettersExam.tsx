import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { alphabet, Alphabet, Letter } from "../components/alphabet.ts";
import { asset } from "$fresh/runtime.ts";

interface LettersExamProps {
  alphabet: Alphabet;
}

export function pickLetter(alphabet: Alphabet): Letter {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

export function pickSet(alphabet: Alphabet, size = 6): Alphabet {
  const source = [...alphabet];
  const set: Alphabet = [];
  while (set.length < size && source.length > 0) {
    const index = Math.floor(Math.random() * source.length);

    const [element] = source.splice(index, 1);

    set.push(element);
  }
  return set;
}

export default function LettersExam({ alphabet }: LettersExamProps) {
  const [set, setSet] = useState<Alphabet>(pickSet(alphabet));

  const [current, setCurrent] = useState<Letter>(pickLetter(set));

  const [wrongCount, setWrongCount] = useState(0);

  const onCorrect = useCallback(() => {
    console.log({ wrongCount });
    if (wrongCount > 0) {
      setScore((s) => s / 2);
    } else {
      setScore((s) => s + 100);
    }
    const newSet = pickSet(alphabet);
    setSet(newSet);
    setCurrent(pickLetter(newSet));
    setWrongCount(0);
  }, [alphabet, wrongCount]);

  const onWrong = useCallback(() => {
    console.log("wrong!");
    setWrongCount((i) => i + 1);
  }, []);

  const [score, setScore] = useState(0);

  return (
    <div>
      <Player
        key={current.letter}
        letter={current}
        score={wrongCount > 0 ? score / 2 : score}
        onGiveUp={() => setWrongCount(10)}
      />
      <div class="grid gap-2 w-full grid-cols-3">
        {set.map((m) => (
          <Answer
            key={m.letter}
            letter={m}
            correct={current.slow}
            onCorrect={onCorrect}
            onWrong={onWrong}
            showRight={wrongCount >= 3}
          />
        ))}
      </div>
    </div>
  );
}

const audioPlayers: { [key: string]: HTMLAudioElement } = {};

export function Player(
  { letter, score, onGiveUp }: { letter: Letter; score: number, onGiveUp: () => void },
) {
  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    if (audioPlayers[letter.slow]) {
      audio.current = audioPlayers[letter.slow]
    } else {
      audioPlayers[letter.slow] = audio.current = new Audio(asset(letter.slow));
    }
  }, []);
  useEffect(() => {
    console.log("play!", letter.letter);

    if (letter && audio.current) {
      audio.current.play();
    }

    return () => audio.current?.pause();
  }, [!!audio.current, letter.letter]);

  const scoreStyle = score == 0
    ? "text-black"
    : score < 50
    ? "text-red-600"
    : score < 70
    ? "text-red-900"
    : score < 100
    ? "text-yellow-900"
    : score < 300
    ? "text-green-900"
    : score < 500
    ? "text-green-800"
    : score < 700
    ? "text-green-700"
    : score < 1000
    ? "text-green-600"
    : score < 2000
    ? "text-blue-700"
    : "text-blue-500";

  return (
    <div class="py-4 grid grid-cols-3">
      <div>
        <button
          className="block m-auto ml-0 items-center rounded-md border-none border-gray-300 bg-white px-8 py-6 text-4xl font-medium text-gray-700  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => onGiveUp()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>

        </button>
        
      </div>
      <div>
        <button
          className="block m-auto items-center rounded-md border border-gray-300 bg-white px-8 py-6 text-4xl font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            if (audio.current) {
              audio.current.play();
              audio.current.currentTime = 0;
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        </button>
      </div>
      <div class="flex px-5">
        <div class=" m-auto mr-0 ">
          Score:{" "}
          <span class={"text-lg font-bold " + scoreStyle}>
            {score.toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Answer(
  props: {
    letter: Letter;
    correct: string;
    onCorrect: () => void;
    onWrong: () => void;
    showRight: boolean;
  },
) {
  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    setCelebrate(false);
  }, [props.letter, props.correct])

  const serif = props.letter.letter == "I";

  const [showWrong, setShowWrong] = useState(false);
  const animateWrong = () => {
    setShowWrong(true);
    props.onWrong();
  };
  const animateRight = () => {
    setCelebrate(true);
    setTimeout(props.onCorrect, 500);
  };

  useEffect(() => {
    setShowWrong(false);
  }, [props.letter, props.correct]);

  const isCorrect = props.correct == props.letter.slow;

  return (
    <button
      className={`inline-flex ${
        serif ? "font-serif" : ""
      } items-center rounded-md border border-gray-300 ${
        (isCorrect && props.showRight) || celebrate
          ? "bg-green-400"
          : (showWrong ? "bg-red-400" : "bg-white hover:bg-gray-200")
      } px-10 py-8 text-6xl font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={() => {
        if (isCorrect) {
          animateRight();
        } else {
          animateWrong();
        }
      }}
    >
      {props.letter.letter}
    </button>
  );
}
