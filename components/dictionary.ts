import { alphabet, Letter } from "./alphabet.ts";

export type Dictionary = Word[];

export type NoSay = { silent: string };

export type Word = {
  word: string,
  sounds: (Letter | NoSay)[],
  audio: string,
  picture: string,
}

function error<T>(message: string): T {
  throw new Error(message);
}

export function s(silent: string): NoSay {
  return { silent };
}

export function l(letter: string): Letter {
  return alphabet.find(a => a.letter == letter) || error("Not found")
}

export const dictionary: Dictionary = [
  {
    word: "cat",
    sounds: [l("c"), l("a"), l("t")],
    audio: "cat.m4a",
    picture: "cat.png",
  },
  {
    word: "cab",
    sounds: [l("c"), l("a"), l("b")],
    audio: "cab.m4a",
    picture: "cab.png",
  },
  {
    word: "can",
    sounds: [l("c"), l("a"), l("n")],
    audio: "can.m4a",
    picture: "can.png",
  },
  {
    word: "an",
    sounds: [l("a"), l("n")],
    audio: "an.m4a",
    picture: "an.png",
  },
  {
    word: "and",
    sounds: [l("a"), l("n"), l("d")],
    audio: "and.m4a",
    picture: "and.png",
  },
  {
    word: "on",
    sounds: [l("o"), l("n")],
    audio: "on.m4a",
    picture: "on.png",
  },
  {
    word: "in",
    sounds: [l("i"), l("n")],
    audio: "in.m4a",
    picture: "in.png",
  },
  {
    word: "if",
    sounds: [l("i"), l("f")],
    audio: "if.m4a",
    picture: "if.png",
  },
  {
    word: "no",
    sounds: [l("n"), l("o")],
    audio: "no.m4a",
    picture: "no.png",
  },
  {
    word: "ant",
    sounds: [l("a"), l("n"), l("t")],
    audio: "ant.m4a",
    picture: "ant.png",
  },
  {
    word: "sit",
    sounds: [l("s"), l("i"), l("t")],
    audio: "sit.m4a",
    picture: "sit.png",
  },
  {
    word: "mat",
    sounds: [l("m"), l("a"), l("t")],
    audio: "mat.m4a",
    picture: "mat.png",
  },
  {
    word: "not",
    sounds: [l("n"), l("o"), l("t")],
    audio: "not.m4a",
    picture: "not.png",
  },
  {
    word: "sat",
    sounds: [l("s"), l("a"), l("t")],
    audio: "sat.m4a",
    picture: "sat.png",
  },
  {
    word: "sam",
    sounds: [l("s"), l("a"), l("m")],
    audio: "sam.m4a",
    picture: "sam.png",
  },
  {
    word: "set",
    sounds: [l("s"), l("e"), l("t")],
    audio: "set.m4a",
    picture: "set.png",
  },
  {
    word: "see",
    sounds: [l("s"), l("ē"), l("ē")],
    audio: "see.m4a",
    picture: "see.png",
  },
  {
    word: "seed",
    sounds: [l("s"), l("ē"), l("ē"), l("d")],
    audio: "seed.m4a",
    picture: "seed.png",
  },
  {
    word: "seem",
    sounds: [l("s"), l("ē"), l("ē"), l("m")],
    audio: "seem.m4a",
    picture: "seem.png",
  },
  {
    word: "me",
    sounds: [l("m"), l("ē")],
    audio: "me.m4a",
    picture: "me.png",
  },
  {
    word: "am",
    sounds: [l("a"), l("m")],
    audio: "am.m4a",
    picture: "am.png",
  },
  {
    word: "at",
    sounds: [l("a"), l("t")],
    audio: "at.m4a",
    picture: "at.png",
  },
  {
    word: "it",
    sounds: [l("i"), l("t")],
    audio: "it.m4a",
    picture: "it.png",
  },
  {
    word: "is",
    sounds: [l("i"), l("s")],
    audio: "is.m4a",
    picture: "is.png",
  },
  {
    word: "ram",
    sounds: [l("r"), l("a"), l("m")],
    audio: "ram.m4a",
    picture: "ram.png",
  },
  {
    word: "rat",
    sounds: [l("r"), l("a"), l("t")],
    audio: "rat.m4a",
    picture: "rat.png",
  },
  {
    word: "eat",
    sounds: [l("ē"), s("a"), l("t")],
    audio: "eat.m4a",
    picture: "eat.png",
  },
  {
    word: "ear",
    sounds: [l("ē"), s("a"), l("r")],
    audio: "ear.m4a",
    picture: "ear.png",
  },
  {
    word: "seat",
    sounds: [l("s"), l("ē"), s("a"), l("t")],
    audio: "seat.m4a",
    picture: "seat.png",
  },
  {
    word: "meat",
    sounds: [l("m"), l("ē"), s("a"), l("t")],
    audio: "meat.m4a",
    picture: "meat.png",
  },
  {
    word: "meet",
    sounds: [l("m"), l("ē"), l("ē"), l("t")],
    audio: "meat.m4a",
    picture: "meet.png",
  },
  {
    word: "mitt",
    sounds: [l("m"), l("i"), l("t"), l("t")],
    audio: "mitt.m4a",
    picture: "mitt.png",
  },
  {
    word: "read",
    sounds: [l("r"), l("ē"), s("a"), l("d")],
    audio: "read.m4a",
    picture: "read.png",
  },
  {
    word: "reed",
    sounds: [l("r"), l("ē"), l("ē"), l("d")],
    audio: "read.m4a",
    picture: "reed.png",
  },
  {
    word: "mad",
    sounds: [l("m"), l("a"), l("d")],
    audio: "mad.m4a",
    picture: "mad.png",
  },
  {
    word: "mom",
    sounds: [l("m"), l("o"), l("m")],
    audio: "mom.m4a",
    picture: "mom.png",
  },
  {
    word: "sad",
    sounds: [l("s"), l("a"), l("d")],
    audio: "sad.m4a",
    picture: "sad.png",
  },
  {
    word: "this",
    sounds: [l("th"), l("i"), l("s")],
    audio: "this.m4a",
    picture: "this.png",
  },
  {
    word: "that",
    sounds: [l("th"), l("a"), l("t")],
    audio: "that.m4a",
    picture: "that.png",
  },
  {
    word: "the",
    sounds: [l("th"), l("ē")],
    audio: "the.m4a",
    picture: "the.png",
  },
  {
    word: "rid",
    sounds: [l("r"), l("i"), l("d")],
    audio: "rid.m4a",
    picture: "rid.png",
  },
  {
    word: "rod",
    sounds: [l("r"), l("o"), l("d")],
    audio: "rod.m4a",
    picture: "rod.png",
  },
  {
    word: "sack",
    sounds: [l("s"), l("a"), l("c"), s("k")],
    audio: "sack.m4a",
    picture: "sack.png",
  },
  {
    word: "sock",
    sounds: [l("s"), l("o"), l("c"), s("k")],
    audio: "sock.m4a",
    picture: "sock.png",
  },
  {
    word: "sick",
    sounds: [l("s"), l("i"), l("c"), s("k")],
    audio: "sick.m4a",
    picture: "sick.png",
  },
  {
    word: "rock",
    sounds: [l("s"), l("o"), l("c"), s("k")],
    audio: "rock.m4a",
    picture: "rock.png",
  },
  {
    word: "fat",
    sounds: [l("f"), l("a"), l("t")],
    audio: "fat.m4a",
    picture: "fat.png",
  },
  {
    word: "fan",
    sounds: [l("f"), l("a"), l("n")],
    audio: "fan.m4a",
    picture: "fan.png",
  },
  {
    word: "fun",
    sounds: [l("f"), l("u"), l("n")],
    audio: "fun.m4a",
    picture: "fun.png",
  },
  {
    word: "fin",
    sounds: [l("f"), l("i"), l("n")],
    audio: "fin.m4a",
    picture: "fin.png",
  },
  {
    word: "feet",
    sounds: [l("f"), l("ē"), l("ē"), l("t")],
    audio: "feet.m4a",
    picture: "feet.png",
  },
  {
    word: "run",
    sounds: [l("r"), l("u"), l("n")],
    audio: "run.m4a",
    picture: "run.png",
  },
  {
    word: "sun",
    sounds: [l("s"), l("u"), l("n")],
    audio: "sun.m4a",
    picture: "sun.png",
  },
  {
    word: "mud",
    sounds: [l("m"), l("u"), l("d")],
    audio: "mud.m4a",
    picture: "mud.png",
  },
  {
    word: "nut",
    sounds: [l("n"), l("u"), l("t")],
    audio: "nut.m4a",
    picture: "nut.png",
  },
  // {
  //   word: "car",
  //   sounds: [l("c"), l("a"), l("r")],
  //   audio: "car.m4a",
  //   picture: "car.png",
  // },
];