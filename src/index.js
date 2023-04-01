// import _ from 'lodash';
import "./style.css";
import Todo from "./modules/Todo.js";

const addTodo = document.querySelector("#enter");
const todoList = document.querySelector(".list-container");
const todo = document.querySelector("#todo-input");

function addTodos() {
  if (todo.value !== "") Todo.setTodo(todo.value, false);
  todo.value = "";
  todo.focus();
}

function component() {
  const element = document.createElement("div");

  // Todo.updateUI(todoList);

  // handle event for add todo
  addTodo.addEventListener("click", () => {
    addTodos();
  });

  todo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodos();
  });
  return element;
}

window.onload = () => {
  // update todoList on page load
  const currentTodo = localStorage.getItem("todo");
  // Todo.todoList = JSON.parse(currentTodo);
  // if (Todo != null) Todo.updateUI(document.querySelector(".list-container"));

  todo.focus();
};
document.body.appendChild(component());
