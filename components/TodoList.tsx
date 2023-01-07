import { useTodo } from "../context/TodoContext";
import Todo from "./Todo";

export default function TodoList() {
  const { todoList, todo, selectedTodo } = useTodo();

  const filteredList =
    selectedTodo !== null
      ? todoList
      : todoList.filter((item) => {
          return item.todo.toLowerCase().includes(todo.toLowerCase());
        });

  if (filteredList.length === 0)
    return <h1>No result. Create a new one instead!</h1>;
  return (
    <ul>
      {filteredList.map((item, index) => {
        return <Todo key={index} todoData={item} />;
      })}
    </ul>
  );
}
