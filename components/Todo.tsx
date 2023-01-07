import { useState } from "react";
import useTodoAction from "../hook/useTodoAction";
import { TodoType } from "../models/ITodo";

function Todo({ todoData }: { todoData: TodoType }) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const { handlerCheck, handleDelete, handleEdit, isCompleted } =
    useTodoAction(todoData);

  return (
    <li
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <span style={{ textDecoration: isCompleted ? "line-through" : "" }}>
        {todoData.todo}
      </span>
      {isHover && (
        <>
          <input
            type="checkbox"
            onChange={handlerCheck}
            checked={isCompleted}
          />
          <button onClick={handleEdit}>edit</button>
          <button onClick={handleDelete}>x</button>
        </>
      )}
    </li>
  );
}

export default Todo;
