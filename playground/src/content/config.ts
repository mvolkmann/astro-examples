import {defineCollection, z} from 'astro:content';

// The schema is defined using Zod.
const string = z.string();
const dogs = defineCollection({
  type: 'content',
  schema: ({image}) =>
    z.object({
      breed: string,
      name: string,
      photo: image(), // enables using Image component for optimized images
      website: string
    })
});

export const collections = {dogs};
