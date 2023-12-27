// This is using the vanilla JS version of nanostores.
import { atom, computed, map } from "nanostores";

export const $score = atom<number>(0);

export const $status = computed($score, (score: number) =>
  score === 10 ? "win" : "play"
);

type Dog = {
  name: string;
  breed: string;
};

export const $dog = map<Dog>({
  name: "Comet",
  breed: "Whippet",
});
