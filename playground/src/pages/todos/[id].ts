// This file defines dynamic routes where path parameters are used.
// In this case the path parameter is the id of a todo.
// Dynamic routes require enabling SSR.
// To do this, enter "npx astro add node".

import type { APIContext } from "astro";
import { todoMap } from "../todos-state.ts";

export async function GET({ params }: APIContext) {
  const { id } = params;
  const idNumber = Number(id);
  const todo = todoMap.get(idNumber);
  return new Response(JSON.stringify(todo), {
    headers: { "Content-Type": "application/json" },
  });
}
export async function PUT({ params, request }: APIContext) {
  const { id } = params;
  const idNumber = Number(id);
  const todo = await request.json();
  todo.id = idNumber; // ensures the id matches the path parameter
  const exists = todoMap.has(idNumber);
  if (exists) todoMap.set(idNumber, todo);
  const status = exists ? 200 : 404;
  return new Response(JSON.stringify(todo), { status });
}

export async function PATCH({ params, request }: APIContext) {
  const { id } = params;
  const idNumber = Number(id);
  const updates = await request.json();
  updates.id = idNumber; // ensures the id matches the path parameter
  let todo = todoMap.get(idNumber);
  if (todo) {
    todo = { ...todo, ...updates };
    todoMap.set(idNumber, todo);
  }
  const status = todo ? 200 : 404;
  return new Response(JSON.stringify(todo), { status });
}

export async function DELETE({ params, request }: APIContext) {
  const { id } = params;
  if (!id) return new Response('missing "id" parameter', { status: 400 });

  const idNumber = Number(id);
  const status = todoMap.delete(idNumber) ? 200 : 404;
  return new Response("", { status });
}
