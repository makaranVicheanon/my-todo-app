import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzKrf1QFzwW3Y5-OcoU5SInQyuncMAuD4",
  authDomain: "simple-todo-68aa5.firebaseapp.com",
  projectId: "simple-todo-68aa5",
  storageBucket: "simple-todo-68aa5.appspot.com",
  messagingSenderId: "403950498105",
  appId: "1:403950498105:web:4160a55370c489a3c878e8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
