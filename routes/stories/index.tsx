import LessonLayoutStory from "../../islands/LessonLayoutStory.tsx";
import ButtonStory from "./button.tsx";
import SoundAnswerButtonsStory from "./sound-button.tsx";
import WordAnswerButtonsStory from "./sound-group-button.tsx";
import SoundGroupStory from "./sound-group.tsx";
import SoundStory from "./sound.tsx";

export default function Stories() {
  return (
    <div>
      <ButtonStory />
      <SoundStory />
      <SoundAnswerButtonsStory />
      <SoundGroupStory />
      <WordAnswerButtonsStory />
      <LessonLayoutStory />
    </div>
  );
}
