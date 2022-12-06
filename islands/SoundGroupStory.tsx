import { DemoItem, MultiBox } from "../components/Demobox.tsx";
import { dictionary, l } from "../components/dictionary.ts";import SoundGroup from "../components/SoundGroup.tsx";
;

export default function SoundStory() {
  return (
    <>
      <MultiBox name="Words">
        {dictionary.map(word => <DemoItem><SoundGroup word={word} /></DemoItem>)}
      </MultiBox>
    </>
  );
}
