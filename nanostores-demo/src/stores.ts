import { atom, map } from "nanostores";

export const $score = atom<number>(0);

export const dog = map({
  name: "Dog",
  breed: "Whippet",
});
