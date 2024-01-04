import {defineCollection, reference, z} from 'astro:content';

const nfl = defineCollection({
  type: 'content',
  schema: z.object({
    city: z.string(),
    name: z.string(),
    conference: z.string(),
    logoUrl: z.string(),
    headCoach: z.string(),
    established: z.number(),
    relatedTeams: z.array(reference('nfl')).optional()
  })
});

export const collections = {nfl};
