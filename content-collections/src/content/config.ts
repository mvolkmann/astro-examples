import {defineCollection, z} from 'astro:content';

const nfl = defineCollection({
  type: 'content',
  schema: z.object({
    city: z.string(),
    name: z.string(),
    conference: z.string(),
    logoUrl: z.string()
  })
});

export const collections = {nfl};
