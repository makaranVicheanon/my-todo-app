import { ChangeEvent } from "react";
import { useTodo } from "../context/TodoContext";
import useTodoForm from "../hook/useTodoForm";
import { TodoType } from "../models/ITodo";
import { addToDo, updateTodo } from "../services/todoServices";

function AddTodoForm() {
  const { todo, selectedTodo } = useTodo();
  const { submitHanlder, changeHandler } = useTodoForm();

  return (
    <form onSubmit={submitHanlder}>
      <label htmlFor="todo">Add Todo Here</label>
      <input name="todo" value={todo} onChange={changeHandler} />
      <button type="submit">{selectedTodo === null ? "Add" : "Edit"}</button>
    </form>
  );
}

export default AddTodoForm;
