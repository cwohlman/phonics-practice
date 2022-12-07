import { alphabet } from "../components/alphabet.ts";
import { dictionary } from "../components/dictionary.ts";
import { UserScore } from "../components/scoring.ts";
import { LessonLayout } from "./AutomaticLesson.tsx";

export default function LessonLayoutStory() {
  return (
    <div>
      {LessonLayout(
        {
          question: dictionary[1],
          options: dictionary.slice(0, 6),
        },
        new UserScore(),
        () => undefined,
        () => undefined,
        () => undefined,
        () => undefined,
        [],
      )}
      {LessonLayout(
        {
          question: alphabet[1],
          options: alphabet.slice(0, 6),
        },
        new UserScore(),
        () => undefined,
        () => undefined,
        () => undefined,
        () => undefined,
        [],
      )}
    </div>
  );
}
