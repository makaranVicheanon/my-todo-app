import { async } from "@firebase/util";
import { ChangeEvent } from "react";
import { useTodo } from "../context/TodoContext";
import { TodoType } from "../models/ITodo";
import { updateTodo, addToDo } from "../services/todoServices";

const useTodoForm = () => {
	const { todo, setTodo, selectedTodo, setSelectedTodo } = useTodo();

	const edit = async () => {
		const res = await updateTodo(selectedTodo!.id, todo);
		return res;
	};

	const create = async () => {
		const newTodo: TodoType = {
			id: self.crypto.randomUUID(),
			todo: todo.toLowerCase(),
			isCompleted: false,
			createdAt: new Date(),
		};
		const res = await addToDo(newTodo);
		return res;
	};

	const submitHanlder = async (e: any) => {
		e.preventDefault();
		if (todo === "") {
			alert("Cannot be empty");
			return;
		}

		const res = !!selectedTodo ? await edit() : await create();
		if (res === "Existed") return;
		if (res === "Failed") alert("todo is deleted.");
		e.target.reset();
		setSelectedTodo(null);
		setTodo("");
	};

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTodo(e.target.value);
	};

	return {
		changeHandler,
		submitHanlder,
	};
};

export default useTodoForm;
