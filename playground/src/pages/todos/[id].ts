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

if (!globalThis.todoMap) {
  globalThis.todoMap = new Map<number, Todo>();
}

async function getBody(request: Request): Promise<string> {
  const { body } = request;
  let text = "";
  if (body) {
    // See https://davetayls.me/blog/2023-05-21-convert-a-readablestream-to-a-string-in-javascript.
    const reader = body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { value, done } = await reader.read();
      if (value) text += decoder.decode(value);
      if (done) break;
    }
  }
  return text;
}

export async function PUT({ params, request }: APIContext) {
  const text = await getBody(request);
  const todo = JSON.parse(text) as Todo;
  const exists = globalThis.todoMap.has(todo.id);
  if (exists) globalThis.todoMap.set(todo.id, todo);
  const status = exists ? 200 : 404;
  return new Response(JSON.stringify(todo), { status });
}

export async function PATCH({ params, request }: APIContext) {
  const text = await getBody(request);
  const updates = JSON.parse(text) as Todo;
  const { id } = updates;
  let todo = globalThis.todoMap.get(id);
  if (todo) {
    todo = { ...todo, ...updates };
    globalThis.todoMap.set(id, todo);
  }
  const status = todo ? 200 : 404;
  return new Response(JSON.stringify(todo), { status });
}

export async function DELETE({ params, request }: APIContext) {
  const { id } = params;
  if (!id) return new Response('missing "id" parameter', { status: 400 });
  const idNumber = Number(id);
  console.log("todos/[id].ts : idNumber =", idNumber);
  console.log("todos/[id].ts : globalThis.todoMap =", globalThis.todoMap);
  const status = globalThis.todoMap.delete(idNumber) ? 200 : 404;
  return new Response("", { status });
}
