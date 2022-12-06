import { useRef } from "preact/hooks";
import { Letter } from "./alphabet.ts";
import { Word } from "./dictionary.ts";
import Sound from "./Sound.tsx";
import SoundGroup from "./SoundGroup.tsx";

export default function Answer({ subject }: { subject: Letter | Word }) {
  const soundOutRef = useRef<() => void | Promise<void>>();
  const wordPlayerRef = useRef<() => void | Promise<void>>();

  const Component = ("letter" in subject)
    ? <Sound letter={subject} player={soundOutRef} />
    : (
      <SoundGroup
        word={subject}
        soundPlayer={soundOutRef}
        wordPlayer={wordPlayerRef}
      />
    );

  return (
    <div class="m-5 border border-gray-200 rounded shadow flex flex-col min-w-[200px]">
      <div class="m-auto">
        {Component}
      </div>
      <div class="flex justify-stretch">
        <button
          class="border border-gray-200 border-b-0 border-l-0 p-3 flex-1 text-center hover:text-indigo-500 hover:bg-indigo-100"
          onClick={() => soundOutRef.current ? soundOutRef.current() : null}
        >
          <svg
            width="24"
            height="24"
            version="1.1"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            class="m-auto"
          >
            <g>
              <path d="m381.71 143.29c1.6133-0.23437 3.2461 0.25 4.4766 1.3125 1.2305 1.0703 1.9375 2.6172 1.9375 4.2422l0.0625 0.003906c0 3.4336-2.4453 6.3789-5.8203 7.0039-18.723 3.6953-34.812 18.598-45.828 33.23-26.609 35.332-39.941 79.68-48.676 123.84-6.2812 31.766-10.145 56.102-11.164 88.539 0.71484 8.918-12.262 8.8164-11.914-0.16406-4.293-43.363-20.266-84.586-48.59-115.17-16.543-17.855-38.969-31.359-64.203-31.902-0.59766-0.011718-1.1953-0.015624-1.793-0.011718-32.996 0.23828-63.008 24.719-80.48 51.539-22.102 33.93-29.457 58.66-30.285 98.531-0.074219 3.1875-2.6875 5.7383-5.875 5.7383 0 0.003906 0 0.003906-0.003906 0.003906-1.5195 0-2.9805-0.60938-4.0469-1.6992-1.0703-1.0859-1.6562-2.5547-1.6328-4.0742 0.75391-50.035 12.293-83.234 41.656-119.34 19.578-24.07 47.566-42.891 80.613-43.129 0.27734-0.003906 0.55859-0.003906 0.83594 0 15.438 0.11328 30.754 4.4141 44.273 11.914 36.738 20.367 59.082 59.477 70.895 98.609 0.63281 2.1094 1.2461 4.2227 1.8281 6.3516 3.2969-29.473 8.8867-58.605 17.031-86.98 11.078-38.594 26.664-77.848 55.297-105.78 11.387-11.105 25.57-19.988 41.402-22.621z" />
              <path
                d="m484.12 144.23c0 23.344-18.922 42.27-42.266 42.27s-42.27-18.926-42.27-42.27 18.926-42.266 42.27-42.266 42.266 18.922 42.266 42.266"
                fill-rule="evenodd"
              />
            </g>
          </svg>
        </button>
        {"word" in subject
          ? (
            <button
              class="border border-gray-200 border-b-0 border-l-0 p-3 flex-1 justify-center hover:text-indigo-500 hover:bg-indigo-100"
              onClick={() =>
                wordPlayerRef.current ? wordPlayerRef.current() : null}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 m-auto"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          )
          : null}
      </div>
    </div>
  );
}
