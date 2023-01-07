import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	getCountFromServer,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../firebase/fireabse-config";
import { TodoType } from "../models/ITodo";

const isTodoExist = async (id: string) => {
	const q = query(collection(db, "todo"), where("todo", "==", id));
	const checkTodo = await getCountFromServer(q);

	if (checkTodo.data().count >= 1) {
		alert("Todo already Exist");
		return true;
	}
	return false;
};

const addToDo = async (todo: TodoType) => {
	try {
		if (await isTodoExist(todo.todo)) return "Existed";
		await setDoc(doc(db, "todo", todo.id), todo);
	} catch (error) {
		alert("Error");
		return "Failed";
	}
	return "Success";
};

const getAllTodo = async () => {
	try {
		const todoList = await getDocs(collection(db, "todo"));

		let result: TodoType[] | DocumentData = [];
		todoList.forEach((doc) => {
			result.push(doc.data());
		});
		return result as TodoType[];
	} catch (error) {
		console.error(error);
	}
};

const tickTodo = async (id: string, todoState: boolean) => {
	try {
		const todo = doc(db, "todo", id);

		await updateDoc(todo, {
			isCompleted: !todoState,
		});
		return !todoState;
	} catch (error) {
		alert("Error");
		console.error(error);
		return todoState;
	}
};

const updateTodo = async (id: string, todo: string) => {
	try {
		console.log(id + ":" + (await isTodoExist(id)));

		if (await isTodoExist(todo)) return "Existed";
		const todoRef = doc(db, "todo", id);
		await updateDoc(todoRef, { todo: todo });
		return "Success";
	} catch (error) {
		return "Failed";
	}
};

const deleteTodo = async (id: string) => {
	try {
		await deleteDoc(doc(db, "todo", id));
	} catch (error) {}
};

export { addToDo, getAllTodo, updateTodo, deleteTodo, tickTodo };
