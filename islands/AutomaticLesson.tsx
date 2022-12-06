import { options } from "https://esm.sh/v95/preact@10.11.0/src/index.d.ts";
import { useMemo, useState } from "preact/hooks";
import { Letter } from "../components/alphabet.ts";
import Answer from "../components/Answer.tsx";
import { Word } from "../components/dictionary.ts";
import { Lesson, Result, UserScore } from "../components/scoring.ts";
import { soundManager } from "../components/soundManager.ts";
import { Player } from "./LettersExam.tsx";

export function autoPlay(lesson: Lesson) {
  if ('question' in lesson) {
    if ('audio' in lesson.question) {
      soundManager.play(lesson.question.audio);
    } else {
      soundManager.play(lesson.question.slow);
    }
  }
}

export default function AutomaticLesson() {
  const progress = useMemo(() => new UserScore(), []);

  const [lesson, setLesson] = useState(() => progress.chooseLesson());
  const [didGiveUp, setDidGiveUp] = useState(false);
  const [didPractice, setDidPractice] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState<(Word | Letter)[]>([]);


  const onResult = (result: Result) => {
    progress.applyLessonResult(lesson, result);
  };

  const onPractice = (subject: Word | Letter) => {
    // progress.applyResult(subject, "practice");
    setDidPractice(true);
  };

  const onGiveUp = (subject: Word | Letter) => {
    // progress.applyResult(subject, "practice");
    setDidGiveUp(true);
  };

  const onContinue = () => {
    const newLesson = progress.chooseLesson();
    setLesson(newLesson);
    setDidGiveUp(false);
    setDidPractice(false);
    setFailedAttempts([]);

    autoPlay(newLesson);
  };

  if ("question" in lesson) {
    const onAnswer = (choice: Letter | Word) => {
      if (choice == lesson.question) {
        onResult(didGiveUp ? 'hint' : didPractice ? 'practice' : 'pass');
        onContinue();
      } else {
        onResult("fail");
        setFailedAttempts(a => [choice, ...a]);
      }
    }
    return (
      <div>
        <Player
          key={'slow' in lesson.question ? lesson.question.slow : lesson.question.audio}
          letter={lesson.question}
          score={progress.currentScore}
          onGiveUp={() => setDidGiveUp(true)}
        />
        <div class="grid gap-2 w-full grid-cols-3">
          {lesson.options.map((option, i) => (
            <Answer key={i} subject={option} onAnswer={() => {
              onAnswer(option)
            }} onGiveUp={() => onGiveUp(option)} onPractice={() => onPractice(option)} showWrong={failedAttempts.includes(option)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div></div>
      <div>
      </div>
    </div>
  );
}
