import {defineCollection, z} from 'astro:content';

const nfl = defineCollection({
  type: 'content',
  schema: z.object({
    city: z.string(),
    name: z.string(),
    conference: z.string(),
    logoUrl: z.string(),
    headCoach: z.string(),
    established: z.number()
  })
});

export const collections = {nfl};
