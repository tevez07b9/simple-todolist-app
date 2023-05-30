import React from "react";
import { sanitizeInput } from "../utils";

const AddTodo: React.FC<{ handleAdd: (text: string, id?: string) => void }> = ({
  handleAdd,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newTodo = sanitizeInput(formData.get("newtodo") as string);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    handleAdd(newTodo);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        ref={inputRef}
        className="focus-visible:outline-none p-2 rounded-md bg-transparent hover:bg-stone-700 focus-visible:bg-stone-700"
        name="newtodo"
        placeholder="Add New Todo"
        type="text"
      />
    </form>
  );
};

export default AddTodo;
