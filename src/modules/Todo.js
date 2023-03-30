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

  static updateTodos = (todo, indexToUpdate) => {
    const todoToUpdate = document.getElementById(`task-${indexToUpdate}`);

    // add event listener for updating todo on enter key pressed
    todoToUpdate.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // update todo's
        todo.description = e.target.value;
        // after updating todo's, reset the icon from delete back to select
        const icon = document.querySelector(`.remove-${indexToUpdate}`);
        icon.id = 'selection';
        // deselect todo row
        const todoRow = document.querySelector(`.lists-${indexToUpdate}`);
        todoRow.classList.remove('active');
        // and the focus back to todo's input
        document.querySelector('#todo-input').focus();
      }
    });
    document.getElementById(`task-${indexToUpdate}`).focus();
  }

  static updateUI = (targetElement) => {
    //  clear currently displayed todos
    targetElement.innerHTML = '';
    // update to do lists display with current todoList
    for (let i = Todo.todoList.length - 1; i >= 0; i -= 1) {
      const task = Todo.todoList[i];
      targetElement.innerHTML += `
        <section class='lists lists-${task.index}'>
            <div class='list'>
                <input class='single-todo' type='checkbox' id='single-list-${task.index}' />
                <label for='single-list-${task.index}'>
                  <input id='task-${task.index}' value=${task.description} />
                </label>
            </div>
            <i id='selection' class='ptr remove-${i}'></i>
        </section>
    `;
    }
    // for each newly displayed to does create remove event
    Todo.todoList.forEach((todo, index) => {
      const select = document.querySelector(`.remove-${index}`);
      select.addEventListener('click', () => {
        const selectedTodoIndex = Number(select.classList[1].slice(7));
        // select the todo to be edited or removed
        select.id = 'selected';
        Todo.updateTodos(todo, selectedTodoIndex);
        // select to do row
        const todoRow = document.querySelector(`.lists-${selectedTodoIndex}`);
        todoRow.classList.add('active');
        // create removing event for select's remove instance
        select.classList.add('remove-todo');
        const remove = document.querySelector('.remove-todo');
        remove.addEventListener('click', () => {
          Todo.removeTodo(selectedTodoIndex);
        });
      });
    });
  };
}
