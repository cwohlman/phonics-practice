import { Button } from "../../components/Button.tsx";
import {DemoBox} from "../../components/Demobox.tsx";

export default function ButtonStory() {
  return (
    <>
      <DemoBox name="Hello World">
        <Button>Hello</Button>
      </DemoBox>
    </>
  );
}
