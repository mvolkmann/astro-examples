import type { APIContext, APIRoute } from "astro";
import { categorizeByAge } from "../../categorize.ts";

// This requires SSR configuration!
export const POST: APIRoute = async ({
  request,
}: APIContext): Promise<Response> => {
  const data = await request.formData();
  const name = data.get("name");
  const age = Number(data.get("age"));
  const category = categorizeByAge(age);
  const message = `${name} is ${category}.`;

  return new Response("", {
    status: 302, // redirect
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Location: `/form-handler?message=${message}`,
    },
  });
};
