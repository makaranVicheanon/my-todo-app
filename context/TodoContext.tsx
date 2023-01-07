import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../firebase/fireabse-config";
import { TodoType } from "../models/ITodo";

interface ITodoContext {
  todoList: TodoType[];
  setTodoList: Dispatch<SetStateAction<TodoType[]>>;
  todo: string;
  setTodo: Dispatch<SetStateAction<string>>;
  selectedTodo: TodoType | null;
  setSelectedTodo: Dispatch<SetStateAction<TodoType | null>>;
}

const defaultValue: ITodoContext = {
  todoList: [],
  setTodoList: () => {},
  todo: "",
  setTodo: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
};

const TodoContext = createContext<ITodoContext>(defaultValue);
export const useTodo = () => useContext(TodoContext);

export default function TodoProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [todo, setTodo] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    const q = query(collection(db, "todo"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todos: TodoType[] | DocumentData = [];
      querySnapshot.forEach((doc) => {
        todos.push(doc.data());
      });
      setTodoList(todos as TodoType[]);
    });
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoList,
        setTodoList,
        todo,
        setTodo,
        selectedTodo,
        setSelectedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
