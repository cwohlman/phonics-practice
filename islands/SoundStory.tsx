import { alphabet } from "../components/alphabet.ts";
import { Button } from "../components/Button.tsx";
import { DemoItem, MultiBox } from "../components/Demobox.tsx";
import { l } from "../components/dictionary.ts";
import Sound from "../components/Sound.tsx";

export default function SoundStory() {
  return (
    <>
      <MultiBox name="Single Sounds">
        {alphabet.map(letter => <DemoItem><Sound letter={letter} /></DemoItem>)}
      </MultiBox>
    </>
  );
}
