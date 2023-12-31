import {atom, computed, map} from 'nanostores';
import {persistentAtom} from '@nanostores/persistent';

const count = persistentAtom('count', 0, {
  encode: JSON.stringify,
  decode: JSON.parse
});

const score = atom(0);

// @ts-ignore
globalThis.stores = {
  // count: atom(1), // This does not use persistent storage.
  count, // This uses persistent storage.
  dog: map({
    name: 'Comet',
    breed: 'Whippet'
  }),
  score,
  status: computed(score, value => (value === 10 ? 'win' : 'play'))
};
