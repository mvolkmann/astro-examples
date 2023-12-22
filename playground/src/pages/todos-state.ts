export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export const todoMap = new Map<number, Todo>();
