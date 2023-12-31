import type {APIContext} from 'astro';
import {type Todo, todoMap} from '../todos-state.ts';

export async function GET({params}: APIContext) {
  const {id} = params;
  const idNumber = Number(id);
  const todo = todoMap.get(idNumber);
  return new Response(JSON.stringify(todo), {
    headers: {'Content-Type': 'application/json'}
  });
}
export async function PUT({params, request}: APIContext) {
  const {id} = params;
  const idNumber = Number(id);
  const todo = await request.json();
  todo.id = idNumber; // ensures the id matches the path parameter
  const exists = todoMap.has(idNumber);
  if (exists) todoMap.set(idNumber, todo);
  const status = exists ? 200 : 404;
  return new Response(JSON.stringify(todo), {status});
}

export async function PATCH({params, request}: APIContext) {
  const {id} = params;
  const idNumber = Number(id);
  const updates = await request.json();
  updates.id = idNumber; // ensures the id matches the path parameter
  let todo = todoMap.get(idNumber);
  if (todo) {
    const patched = {...todo, ...updates} as Todo;
    todoMap.set(idNumber, patched);
  }
  const status = todo ? 200 : 404;
  return new Response(JSON.stringify(todo), {status});
}

export async function DELETE({params}: APIContext) {
  const {id} = params;
  if (!id) return new Response('missing "id" parameter', {status: 400});

  const idNumber = Number(id);
  const status = todoMap.delete(idNumber) ? 200 : 404;
  return new Response('', {status});
}
