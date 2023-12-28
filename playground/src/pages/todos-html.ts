import {todoMap} from './todos-state.ts';

export async function GET() {
  const todos = [...todoMap.values()];
  let html = '<ul>';
  for (const todo of todos) {
    html += `<li>${todo.text}</li>`;
  }
  html += '</ul>';
  return new Response(html, {
    headers: {'Content-Type': 'text/html'}
  });
}
