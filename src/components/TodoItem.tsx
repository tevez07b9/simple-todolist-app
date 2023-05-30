import React from "react";
import { Todo } from "../types";
import {
  CheckSquare,
  Square,
  X,
  ChevronRight,
  ChevronDown,
} from "react-feather";
import { useTodos } from "../context/TodosContext";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { checkTodo, removeTodo, addTodo } = useTodos();
  const [showSubItems, setShowSubItems] = React.useState(false);

  const handleAdd = (text: string) => {
    addTodo(text, todo.id);
  };

  return (
    <div className="w-full">
      <div
        onClick={() => checkTodo(todo.id)}
        className="flex space-x-4 cursor-pointer hover:bg-stone-700 p-2 rounded-md"
      >
        {todo.checked ? <CheckSquare /> : <Square />}
        <p className={`${todo.checked ? "line-through" : ""}`}>{todo.text}</p>
        {showSubItems ? (
          <ChevronDown
            onClick={(e) => {
              e.stopPropagation();
              setShowSubItems(!showSubItems);
            }}
          />
        ) : (
          <ChevronRight
            onClick={(e) => {
              e.stopPropagation();
              setShowSubItems(!showSubItems);
            }}
          />
        )}
        <X
          onClick={(e) => {
            e.stopPropagation();
            removeTodo(todo.id);
          }}
        />
      </div>
      {showSubItems ? (
        <div className="ml-10">
          {todo.todos ? <Todos todos={todo.todos} /> : null}
          <AddTodo handleAdd={handleAdd} />
        </div>
      ) : null}
    </div>
  );
};

export default TodoItem;
