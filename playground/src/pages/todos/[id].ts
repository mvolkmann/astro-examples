// This file defines dynamic routes where path parameters are used.
// In this case the path parameter is the id of a todo.
// Dynamic routes require enabling SSR.
// To do this, enter "npx astro add node".

import type { APIContext } from "astro";

let lastId = 0;

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

declare global {
  var todoMap: Map<number, Todo>;
}
if (!globalThis.todoMap) {
  globalThis.todoMap = new Map<number, Todo>();
}

export async function GET({ params }: APIContext) {
  const { id } = params;
  const idNumber = Number(id);
  const todo = globalThis.todoMap.get(idNumber);
  return new Response(JSON.stringify(todo), {
    headers: { "Content-Type": "application/json" },
  });
}
export async function PUT({ params, request }: APIContext) {
  const { id } = params;
  const idNumber = Number(id);
  const todo = await request.json();
  todo.id = idNumber; // ensures the id matches the path parameter
  const exists = globalThis.todoMap.has(idNumber);
  if (exists) globalThis.todoMap.set(idNumber, todo);
  const status = exists ? 200 : 404;
  return new Response(JSON.stringify(todo), { status });
}

export async function PATCH({ params, request }: APIContext) {
  const { id } = params;
  const idNumber = Number(id);
  const updates = await request.json();
  updates.id = idNumber; // ensures the id matches the path parameter
  let todo = globalThis.todoMap.get(idNumber);
  if (todo) {
    todo = { ...todo, ...updates };
    globalThis.todoMap.set(idNumber, todo);
  }
  const status = todo ? 200 : 404;
  return new Response(JSON.stringify(todo), { status });
}

export async function DELETE({ params, request }: APIContext) {
  const { id } = params;
  if (!id) return new Response('missing "id" parameter', { status: 400 });

  const idNumber = Number(id);
  const status = globalThis.todoMap.delete(idNumber) ? 200 : 404;
  return new Response("", { status });
}
