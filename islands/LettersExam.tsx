import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { Alphabet, Letter } from "../components/alphabet.ts";

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
    console.log({ wrongCount })
    if (wrongCount > 0) {
      setScore(s => s / 2);
    } else {
      setScore(s => s + 100);
    }
    const newSet = pickSet(alphabet);
    setSet(newSet);
    setCurrent(pickLetter(newSet));
    setWrongCount(0);
  }, [alphabet, wrongCount]);

  const onWrong = useCallback(() => {
    console.log('wrong!')
    setWrongCount((i) => i + 1);
  }, []);

  const [score, setScore] = useState(0);

  return (
    <div>
      <Player key={current.letter} letter={current} score={score} />
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

let currentAudio: HTMLAudioElement | null = null;

export function Player(
  { letter, score }: { letter: Letter; score: number },
) {
  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    audio.current = new Audio(letter.slow);
    return () => console.log("Cleanup!");
  }, []);
  useEffect(() => {
    console.log("play!", [!!audio.current, letter.letter]);

    if (letter && audio.current) {
      audio.current.play();
    }
  }, [!!audio.current, letter.letter]);

  const scoreStyle = score == 0 ? "text-black" :
    score < 50 ? "text-red-600 font-bold" :
    score < 70 ? "text-red-900" :
    score < 100 ? "text-yellow-900" :
    score < 500 ? "text-green-900" :
    score < 1000 ? "text-green-600" :
    "text-green-900 bold"

  return (
    <div class="py-4 grid grid-cols-3">
      <div>
        &nbsp;
      </div>
      <div>
        <button
          className="block m-auto items-center rounded-md border border-gray-300 bg-white px-8 py-6 text-4xl font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => audio.current?.play()}
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
        <div class={"text-lg m-auto mr-0 " + scoreStyle}>{score.toFixed(0)}</div>
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
  const audio = useRef<HTMLAudioElement>();
  useEffect(() => {
    audio.current = new Audio(props.letter.slow);
  });

  const serif = props.letter.letter == "I";

  const [showWrong, setShowWrong] = useState(false);
  const animateWrong = () => {
    setShowWrong(true);
    props.onWrong();
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
        isCorrect && props.showRight
          ? "bg-green-400"
          : (showWrong ? "bg-red-400" : "bg-white hover:bg-gray-200")
      } px-10 py-8 text-6xl font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
      onClick={() => {
        if (isCorrect) {
          props.onCorrect();
        } else {
          animateWrong();
        }
      }}
    >
      {props.letter.letter}
    </button>
  );
}
