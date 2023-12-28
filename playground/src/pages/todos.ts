import type {APIContext} from 'astro';
import {todoMap} from './todos-state.ts';

let lastId = 0; // used by addTodo and POST functions

// Add some initial todos.
function addTodo(text: string) {
  const todo = {id: ++lastId, text, completed: false};
  todoMap.set(todo.id, todo);
}
addTodo('buy milk');
addTodo('cut grass');

export async function GET() {
  const todos = [...todoMap.values()];
  return new Response(JSON.stringify(todos), {
    headers: {'Content-Type': 'application/json'}
  });
}

export async function POST({request}: APIContext) {
  const todo = await request.json();
  if (todo.completed === undefined) todo.completed = false;
  const id = ++lastId;
  todo.id = id;
  todoMap.set(id, todo);
  return new Response(JSON.stringify(todo), {status: 201});
}
