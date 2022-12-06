import { alphabet } from "../components/alphabet.ts";
import Answer from "../components/Answer.tsx";
import { DemoItem, MultiBox } from "../components/Demobox.tsx";
import { dictionary } from "../components/dictionary.ts";

export default function WordAnswerButtonsStory() {
  return (
    <>
      <MultiBox name="Word buttons">
        {dictionary.map(letter => <DemoItem><Answer subject={letter} /></DemoItem>)}
      </MultiBox>
    </>
  );
}
