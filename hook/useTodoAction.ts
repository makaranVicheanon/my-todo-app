import { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { TodoType } from "../models/ITodo";
import { tickTodo, deleteTodo } from "../services/todoServices";

const useTodoAction = (todoData: TodoType) => {
  const { setSelectedTodo, setTodo } = useTodo();

  const [isCompleted, setIsCompleted] = useState<boolean>(todoData.isCompleted);

  const handlerCheck = async () => {
    console.log(todoData.todo);
    const result = await tickTodo(todoData.id, isCompleted);
    setIsCompleted(result);
  };

  const handleDelete = async () => {
    await deleteTodo(todoData.id);
  };

  const handleEdit = () => {
    setTodo(todoData.todo);
    setSelectedTodo(todoData);
  };

  return {
    handlerCheck,
    handleDelete,
    handleEdit,
    isCompleted,
  };
};

export default useTodoAction;
