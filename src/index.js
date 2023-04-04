// import _ from 'lodash';
import './style.css';
import Todo from './modules/Todo.js';

const addTodo = document.querySelector('#enter');
const todo = document.querySelector('#todo-input');

function addTodos() {
  if (todo.value !== '') Todo.setTodo(todo.value, false);
  todo.value = '';
  todo.focus();
}

function component() {
  const element = document.createElement('div');
  // handle event for add todo
  addTodo.addEventListener('click', () => {
    addTodos();
  });

  todo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodos();
  });
  return element;
}

window.onload = () => {
  // update todoList on page load
  const currentTodo = localStorage.getItem('todo');
  // initially since there is no todo's donot update ui from local storage
  if (currentTodo === null) {
    Todo.todoList = Todo.todoList.filter((todo) => todo.index === -1);
    Todo.updateUI(document.querySelector('.list-container'));
  } else {
    // but if todos exist, update UI with local storage
    Todo.todoList = JSON.parse(currentTodo);
    Todo.updateUI(document.querySelector('.list-container'));
  }
  todo.focus();
};
document.body.appendChild(component());
