"use client";

import { Inter } from "@next/font/google";
import AddTodoForm from "../components/AddTodoForm";
import TodoList from "../components/TodoList";
import TodoProvider from "../context/TodoContext";

export default function Home() {
  return (
    <main>
      <TodoProvider>
        <AddTodoForm />
        <TodoList />
      </TodoProvider>
    </main>
  );
}
