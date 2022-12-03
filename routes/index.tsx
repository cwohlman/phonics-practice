import { Head } from "$fresh/runtime.ts";
import Practice from "../islands/Practice.tsx";
import { alphabet } from "../components/alphabet.ts";
import LettersExam from "../islands/LettersExam.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-xl">
        <Practice
          alphabet={alphabet}
        />
      </div>
    </>
  );
}
