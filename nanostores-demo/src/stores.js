console.log('stores.js: entered');
import {atom, computed, map} from 'nanostores';

const score = atom(0);

// @ts-ignore
globalThis.stores = {
  count: atom(1),
  dog: map({
    name: 'Comet',
    breed: 'Whippet'
  }),
  score,
  status: computed(score, value => (value === 10 ? 'win' : 'play'))
};

console.log('stores.js: globalThis.stores =', globalThis.stores);
