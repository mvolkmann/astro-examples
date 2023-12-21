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

// See https://davetayls.me/blog/2023-05-21-convert-a-readablestream-to-a-string-in-javascript.
async function getBody(request: Request): Promise<string> {
  const { body } = request;
  let text = "";
  if (body) {
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
  const { id } = params;
  if (!id) return new Response('missing "id" parameter', { status: 400 });
  const idNumber = Number(id);
  const text = await getBody(request);
  const todo = JSON.parse(text) as Todo;
  todo.id = idNumber; // ensures the id matches the path parameter
  const exists = globalThis.todoMap.has(idNumber);
  if (exists) globalThis.todoMap.set(idNumber, todo);
  const status = exists ? 200 : 404;
  return new Response(JSON.stringify(todo), { status });
}

export async function PATCH({ params, request }: APIContext) {
  const { id } = params;
  if (!id) return new Response('missing "id" parameter', { status: 400 });
  const idNumber = Number(id);
  const text = await getBody(request);
  const updates = JSON.parse(text) as Todo;
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
