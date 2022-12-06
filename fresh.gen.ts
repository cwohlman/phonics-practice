// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/joke.ts";
import * as $1 from "./routes/index.tsx";
import * as $2 from "./routes/stories/button.tsx";
import * as $3 from "./routes/stories/sound.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/LetterPractice.tsx";
import * as $$2 from "./islands/LettersExam.tsx";
import * as $$3 from "./islands/WordPractice.tsx";

const manifest = {
  routes: {
    "./routes/api/joke.ts": $0,
    "./routes/index.tsx": $1,
    "./routes/stories/button.tsx": $2,
    "./routes/stories/sound.tsx": $3,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/LetterPractice.tsx": $$1,
    "./islands/LettersExam.tsx": $$2,
    "./islands/WordPractice.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
