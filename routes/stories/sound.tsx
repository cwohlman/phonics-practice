import { Head } from "$fresh/runtime.ts";
import { Button } from "../../components/Button.tsx";
import DemoBox from "../../components/Demobox.tsx";

export default function Home() {
  return (
    <>
      <DemoBox name="Hello World">
        <Button>Hello</Button>
      </DemoBox>
    </>
  );
}
