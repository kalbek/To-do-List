// import _ from 'lodash';
import './style.css';
import Todo from './modules/Todo.js';

const addTodo = document.querySelector('#enter');
const todo = document.querySelector('#todo-input');
const reset = document.querySelector('#reset');

function addTodos() {
  if (todo.value !== '') Todo.addTodo(todo.value, false);
  todo.value = '';
  todo.focus();
}

function component() {
  const element = document.createElement('div');

  // handle add todo's on click
  addTodo.addEventListener('click', () => {
    addTodos();
  });
  // handle add todo's on Enter key pressed
  todo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodos();
  });
  // handle reset todos
  reset.addEventListener('click', () => {
    Todo.resetTodos();
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
