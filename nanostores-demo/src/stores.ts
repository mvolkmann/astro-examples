// This is using the vanilla JS version of nanostores.
import {atom, computed, map} from 'nanostores';

export const $score = atom<number>(0);
export type ScoreData = {score: number};


export const $status = computed($score, (score: number) =>
  score === 10 ? 'win' : 'play'
);

type Dog = {
  name: string;
  breed: string;
};

export const $dog = map<Dog>({
  name: 'Comet',
  breed: 'Whippet'
});

export function toggleDog() {
  // The get method retrieves the entire object.
  // There is no getKey method.
  const {name} = $dog.get();
  // The set method changes the entire object.
  // The setKey method changes a single property.
  $dog.setKey('name', name === 'Comet' ? 'Oscar' : 'Comet');
  $dog.setKey('breed', name === 'Comet' ? 'GSP' : 'Whippet');
}

// This declaration can be omitted
// if @ts-ignore precedes all definitions of these functions.
declare global {
  function subscribeToScore(data: ScoreData): void;
}

globalThis.subscribeToScore = (data: ScoreData) => {
  $score.subscribe(score => data.score = score);
};