import type { APIContext } from "astro";

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

export async function GET() {
  const todos = [...globalThis.todoMap.values()];
  let html = "<ul>";
  for (const todo of todos) {
    html += `<li>${todo.text}</li>`;
  }
  html += "</ul>";
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
