import React from "react";
import Header from "../components/Header";
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";
import { useTodos } from "../context/TodosContext";

function Homepage() {
  const { addTodo, todos } = useTodos();

  const handleAdd = (text: string) => {
    addTodo(text);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center">
        <h1 className="mb-4 border-b border-gray-300">Todos</h1>
        <div className="w-[70%] lg:w-[50%]">
          <Todos todos={todos} />
          <div className="ml-10">
            <AddTodo handleAdd={handleAdd} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
