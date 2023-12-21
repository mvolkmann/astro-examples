import { defineCollection, z } from "astro:content";

// The schema is defined using Zod.
const string = z.string();
const dogs = defineCollection({
  type: "content",
  schema: z.object({
    name: string,
    breed: string,
    website: string,
  }),
});

export const collections = { dogs };
