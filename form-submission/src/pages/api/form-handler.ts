import type { APIContext, APIRoute } from "astro";
import { categorizeByAge } from "../../categorize.ts";

// This is used when the form action is "/api/form-handler".
// This requires SSR configuration.
export const POST: APIRoute = async ({
  redirect,
  request,
}: APIContext): Promise<Response> => {
  const data = await request.formData();
  const name = data.get("name");
  const age = Number(data.get("age"));
  const category = categorizeByAge(age);
  const message = `${name} is ${category}.`;
  return redirect(`/form-handler?message=${message}`, 302);
};
