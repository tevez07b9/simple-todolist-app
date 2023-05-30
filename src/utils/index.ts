import { Todo } from "../types";
import DOMPurify from "dompurify";

export const sanitizeInput = (input: string) => {
  const sanitizedInput = DOMPurify.sanitize(input);
  return sanitizedInput;
};

// Go through the nested trees of todos
export const traverse = (todos: Todo[], cb: (todo: Todo) => void) => {
  todos.forEach((todo) => {
    cb(todo);
    if (todo.todos) traverse(todo.todos, cb);
  });
};
