import React from "react";
import { Todo } from "../types";
import { v4 as uuidv4 } from "uuid";
import { traverse } from "../utils";

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string, id?: string) => void;
  removeTodo: (id: string) => void;
  checkTodo: (id: string) => void;
}

const TodoContext = React.createContext<TodoContextType>(null!);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = React.useState<Todo[]>([]);

  React.useEffect(() => {
    const _todos = Array.from([1, 2, 3], (x) => ({
      id: uuidv4(),
      checked: false,
      text: `Todo Item ${x}`,
    }));
    setTodos(_todos);
  }, []);

  const addTodo = (text: string, id = "") => {
    if (!text) return;

    // nested todo
    if (id) {
      const _todos = [...todos];
      traverse(_todos, (todo) => {
        if (todo.id === id) {
          if (!Array.isArray(todo.todos)) todo.todos = [];
          todo.todos.push({
            id: uuidv4(),
            checked: false,
            text,
          });
        }
      });
      setTodos(_todos);
      return;
    }

    setTodos((oldTodos) => [
      ...oldTodos,
      {
        id: uuidv4(),
        checked: false,
        text,
      },
    ]);
  };

  const removeTodo = (id: string) => {
    const _todos = [...todos].filter((todo) => todo.id !== id);

    // for nested todos
    traverse(_todos, (todo) => {
      if (todo.todos) {
        todo.todos = todo.todos.filter((todo) => todo.id !== id);
      }
    });
    setTodos([..._todos]);
  };

  const checkTodo = (id: string) => {
    const _todos = [...todos];
    traverse(_todos, (todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
    });
    setTodos([..._todos]);
  };

  const value = { todos, addTodo, removeTodo, checkTodo };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodos() {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useAuth must be user within an TodoContextProvider");
  }

  return context;
}
