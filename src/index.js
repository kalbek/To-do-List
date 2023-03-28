// import _ from 'lodash';
import './style.css';

function component() {
  const todoList = document.querySelector('.list-container');
  const tasks = [
    {
      index: 0,
      description: 'wash the dishes',
      completed: 'false',
    },
    {
      index: 1,
      description: 'complete To Do list project',
      completed: 'false',
    },
  ];

  tasks.forEach((task) => {
    todoList.innerHTML += `
    <section class="lists">
      <div class="list">
        <input type="checkbox" id="single-list-${task.index}" />
        <label for="single-list-${task.index}">${task.description} </label>
      </div>
      <i id="selection" class="ptr"></i>
    </section>
    `;
  });
}

document.body.appendChild(component());
