// This is using the vanilla JS version of nanostores.
import {atom, computed, map} from 'nanostores';

type Dog = {
  name: string;
  breed: string;
};

type ScoreData = {score: number, status: string};

export const $score = atom<number>(0);

export const $status = computed($score, (score: number) =>
  score === 10 ? 'win' : 'play'
);

const $dog = map<Dog>({
  name: 'Comet',
  breed: 'Whippet'
});

// @ts-ignore
globalThis.ns = {
  subscribeToDog(data: Dog) {
    $dog.subscribe(dog => {
      data.name = dog.name;
      data.breed = dog.breed;
    });
  },
  subscribeToScore(data: ScoreData) {
    $score.subscribe(score => data.score = score);
    $status.subscribe(status => data.status = status);
  },
  toggleDog() {
    // The get method retrieves the entire object.
    // There is no getKey method.
    const {name} = $dog.get();

    // The set method changes the entire object.
    // The setKey method changes a single property.
    $dog.setKey('name', name === 'Comet' ? 'Oscar' : 'Comet');
    $dog.setKey('breed', name === 'Comet' ? 'GSP' : 'Whippet');
  }
};
