export default class Todo {
  static todoList = [];

  constructor(description, completed) {
    this.description = description;
    this.completed = completed;
    this.index = Todo.todoList.length;
  }

  // add todo into Todo's todoList
  static setTodo = (description, completed) => {
    const todo = new Todo(description, completed);
    const todoList = document.querySelector('.list-container');
    Todo.todoList.push(todo);
    Todo.updateUI(todoList);
  };

  // remove todo from Todo's todoList by index
  static removeTodo = (index) => {
    const todoList = document.querySelector('.list-container');
    Todo.todoList = Todo.todoList.filter((toDo) => toDo.index !== index);
    // update id's of remaining todo's
    Todo.todoList.forEach((todo) => {
      if (todo.index > index) todo.index -= 1;
    });
    Todo.updateUI(todoList);
    // foucs carret on input box
    document.querySelector('#todo-input').focus();
  };

  static updateUI = (targetElement) => {
    //  clear currently displayed todos
    targetElement.innerHTML = '';
    // update to do lists display with current todoList
    for (let i = Todo.todoList.length - 1; i >= 0; i -= 1) {
      const task = Todo.todoList[i];
      targetElement.innerHTML += `
        <section class='lists'>
            <div class='list'>
                <input class='single-todo' type='checkbox' id='single-list-${task.index}' />
                <label for='single-list-${task.index}'>${task.description} </label>
            </div>
            <i id='selection' class='ptr remove-${i}'></i>
        </section>
    `;
    }
    // for each newly displayed to does create remove event
    Todo.todoList.forEach((_, index) => {
      const remove = document.querySelector(`.remove-${index}`);
      remove.addEventListener('click', () => {
        const indexToRemove = Number(remove.classList[1].slice(7));
        Todo.removeTodo(indexToRemove);
      });
    });
  };
}
