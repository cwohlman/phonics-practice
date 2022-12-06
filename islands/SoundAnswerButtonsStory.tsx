import { alphabet } from "../components/alphabet.ts";
import Answer from "../components/Answer.tsx";
import { DemoItem, MultiBox } from "../components/Demobox.tsx";

export default function SoundAnswerButtonsStory() {
  return (
    <>
      <MultiBox name="Sound Buttons">
        {alphabet.map(letter => <DemoItem><Answer subject={letter} /></DemoItem>)}
      </MultiBox>
    </>
  );
}
