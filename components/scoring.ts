import { alphabet, Letter } from "./alphabet.ts";
import { dictionary, Word } from "./dictionary.ts";

export type Test = { practice: Letter | Word } | { test: Letter | Word };
export type Result = "pass" | "hint" | "practice" | "fail";
export type Lesson = { practice: Letter[] | Word[] } | {
  question: Letter;
  options: Letter[];
} | { question: Word; options: Word[] };

export class UserScore {
  letterScores: {
    [letter: string]: Result[];
  } = {};
  wordScores: {
    [word: string]: Result[];
  } = {};
  currentScore = 0;
  lessonNumber = 0;

  applyLessonResult(lesson: Lesson, result: Result) {
    if ("question" in lesson) {
      this.applyResult(lesson.question, result);
    }

    // otherwise nothing
  }

  applyResult(
    subject: Letter | Word,
    result: Result,
  ) {
    if ("phonetic" in subject) {
      this.letterScores[subject.letter] =
        this.letterScores[subject.letter] || [];
      this.letterScores[subject.letter].push(result);
    } else if ("word" in subject) {
      this.letterScores[subject.word] = this.letterScores[subject.word] || [];
      this.letterScores[subject.word].push(result);
    }

    this.recomputeScore();
  }

  recomputeScore() {
    const letterScores = Object.values(this.letterScores).map(computeScore)
      .reduce((m, a) => m + a, 0);
    const wordScores = Object.keys(this.wordScores).map((word) => {
      const results = this.wordScores[word];
      const baseScore = computeScore(results);
      const multiplier = word.length;

      return baseScore * multiplier;
    }).reduce((m, a) => m + a, 0);

    this.currentScore = letterScores + wordScores;
  }

  countLettersWithPassingScore(score: number) {
    const letterScores = Object.values(this.letterScores).map(computeScore);

    return letterScores.reduce((m, a) => m + (a >= score ? 1 : 0), 0);
  }

  chooseLesson(): Lesson {
    this.lessonNumber++;

    // While fewer than 4 letters are learned practice letters.

    if (this.countLettersWithPassingScore(5) < 4) {
      return this.getLettersLesson();
    }

    // While fewer than 15 letters are learned, 2 letter to 1 word (lessons)
    if (this.countLettersWithPassingScore(5) < 15) {
      return this.lessonNumber % 3 == 0
        ? this.getWordsLesson()
        : this.getLettersLesson();
    }

    // While fewer than all letters are learned, 2 word lessons to 1 letter lesson
    if (this.countLettersWithPassingScore(5) < alphabet.length) {
      return this.lessonNumber % 3 != 0
        ? this.getWordsLesson()
        : this.getLettersLesson();
    }

    // Then 10:1 words
    return this.getWordsLesson();
  }

  getLettersLesson(optionsCount = 6): Lesson {
    const selectedSet: Letter[] = [];
    const sourceSet = [...alphabet];

    for (let i = 0; i < sourceSet.length; i++ ){
      const letter = sourceSet[i];
      const score = computeScore(this.letterScores[letter.letter]);

      if (score <= 5) {
        sourceSet.splice(i, 1);
        selectedSet.push(letter);
      }

      if (selectedSet.length >= optionsCount) break;
    }

    while (selectedSet.length < optionsCount && sourceSet.length) {
      const index = Math.floor(Math.random() * sourceSet.length);
      const letter = sourceSet[index];
      sourceSet.splice(index, 1);
      selectedSet.push(letter);
    }

    return {
      options: shuffle(selectedSet),
      question: pickOption(selectedSet),
    };
  }

  getWordsWithLearnedLetters() {
    return dictionary.filter((word) =>
      word.sounds.every((sound) =>
        "silent" in sound || computeScore(this.letterScores[sound.letter]) >= 4
      )
    );
  }

  getWordsLesson(optionsCount = 6): Lesson {
    const selectedSet: Word[] = [];
    const sourceSet = [...this.getWordsWithLearnedLetters()];

    while (selectedSet.length < optionsCount && sourceSet.length) {
      const index = Math.floor(Math.random() * sourceSet.length);
      const word = sourceSet[index];
      sourceSet.splice(index, 1);
      selectedSet.push(word);
    }

    if (! selectedSet.length) return this.getLettersLesson();

    return {
      options: selectedSet,
      question: pickOption(selectedSet),
    };
  }
}

export function computeScore(results: Result[]): number {
  if (!results) return 0;

  const subset = results.slice(-5);

  // 2 points for every pass
  // 1 point for every non-fail

  return subset.reduce(
    (m, a) => (a == "pass" ? 2 : a == "fail" ? 0 : 1) + m,
    0,
  );
}

export function pickOption<T>(alphabet: T[]): T {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
}

export function shuffle<T>(set: T[]): T[] {
  const source = [...set];
  const shuffled: T[] = [];

  while (source.length > 0) {
    const index = Math.floor(Math.random() * source.length);

    shuffled.push(...source.splice(index, 1));
  }

  return shuffled;
}