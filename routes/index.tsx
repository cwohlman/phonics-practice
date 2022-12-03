import { Head } from "$fresh/runtime.ts";
import { dictionary } from "../components/dictionary.ts";
import WordPractice from "../islands/WordPractice.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-xl">
        <WordPractice
          dictionary={dictionary}
        />
      </div>
    </>
  );
}
