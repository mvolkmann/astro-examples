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

function addTodo(text: string) {
  const todo = { id: ++lastId, text, completed: false };
  globalThis.todoMap.set(todo.id, todo);
}

addTodo("buy milk");
addTodo("cut grass");

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

// params is an object containing properties
// that match the dynamic segments of the route.
//
// props is an object containing properties
// supplied by the getStaticPaths function.
// This is only available in server-side rendering.
//
// request is a Request object that contains
// the method, url, headers, and body.
//
// Additional properties in an APIContext object include
// clientAddress, cookies, generator, locals, redirect, site, and url.
export async function GET({ params, props, request }: APIContext) {
  const res = new Response(JSON.stringify([...globalThis.todoMap.values()]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
  return res;
}

export async function POST({ params, request }: APIContext) {
  const text = await getBody(request);
  const todo = JSON.parse(text) as Todo;
  if (todo.completed === undefined) todo.completed = false;
  const id = ++lastId;
  todo.id = id;
  globalThis.todoMap.set(id, todo);
  return new Response(JSON.stringify(todo), { status: 201 });
}
