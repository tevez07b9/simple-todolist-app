import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../types";

const Todos: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <ul className="w-full">
        {todos?.map((todo) => (
          <li key={todo.id} className="mb-2">
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
