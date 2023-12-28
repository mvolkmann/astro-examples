// We can use only Alpine to share data between Astro components.
// But we need nanostores to share data with other kinds of components
// like React, Svelte, and Vue.
type Dog = {
  name: string;
  breed: string;
};

type XData = {dog: Dog, score: number, status: string};

// @ts-ignore
globalThis.ns = {
  setData(xData: XData) {
    this.xData = xData;
  },
  setScore(score: number) {
    this.xData.score = score;
    this.xData.status = score === 10 ? 'win' : 'play'
  },
  toggleDog() {
    const { name } = this.xData.dog;
    const isComet = name === 'Comet';
    this.xData.dog.name = isComet ? 'Oscar' : 'Comet';
    this.xData.dog.breed = isComet ? 'GSP' : 'Whippet';
  }
};
