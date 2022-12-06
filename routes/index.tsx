import { Head } from "$fresh/runtime.ts";
import { alphabet } from "../components/alphabet.ts";
import AutomaticLesson from "../islands/AutomaticLesson.tsx";
import LettersExam from "../islands/LettersExam.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-xl">
        <AutomaticLesson
          
        />
      </div>
    </>
  );
}
