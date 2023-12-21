import type { APIContext } from "astro";

let lastId = 0; // used by addTodo and POST functions

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

// Add some initial todos.
function addTodo(text: string) {
  const todo = { id: ++lastId, text, completed: false };
  globalThis.todoMap.set(todo.id, todo);
}
addTodo("buy milk");
addTodo("cut grass");

export async function GET() {
  const todos = [...globalThis.todoMap.values()];
  return new Response(JSON.stringify(todos), {
    headers: { "Content-Type": "application/json" },
  });
}

// The APIContext object contains the following properties:
// - params: an object containing properties
//   that match the dynamic segments of the route.
// - props: an object containing properties
//   supplied by the getStaticPaths function
//   (only available in server-side rendering)
// - request: a Request object that contains
//   the method, url, headers, and body
// - clientAddress
// - cookies
// - generator
// - locals
// - redirect
// - site
// - url
export async function POST({ request }: APIContext) {
  const todo = await request.json();
  if (todo.completed === undefined) todo.completed = false;
  const id = ++lastId;
  todo.id = id;
  globalThis.todoMap.set(id, todo);
  return new Response(JSON.stringify(todo), { status: 201 });
}
