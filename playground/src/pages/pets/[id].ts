// import type { APIContext } from "astro";
import type { APIRoute } from "astro";

export function getStaticPaths() {
  return [{ params: { id: "1" } }];
}

// Alternate way to declare.
// export function GET({ params, request }: APIContext) {
export const GET: APIRoute = () => {
  const dog = { name: "Comet", breed: "Whippet" };
  return new Response(JSON.stringify(dog));
};
