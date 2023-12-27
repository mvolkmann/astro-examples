import { atom, computed, map } from "nanostores";
import { getParsedCommandLineOfConfigFile } from "typescript";

export const $score = atom<number>(0);

export const $status = computed($score, (score: number) => {
  console.log("stores.ts computed: score =", score, typeof score);
  return score === 10 ? "win" : "play";
});

type Dog = {
  name: string;
  breed: string;
};

export const $dog = map<Dog>({
  name: "Comet",
  breed: "Whippet",
});
