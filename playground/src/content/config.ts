import { defineCollection, z } from "astro:content";

// The schema is defined using Zod.
const string = z.string();
const dogs = defineCollection({
  type: "content",
  schema: z.object({
    breed: string,
    name: string,
    image: string,
    website: string,
  }),
});

export const collections = { dogs };
