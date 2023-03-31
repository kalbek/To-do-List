export default class Todo {
  // todo list arrat to store all todos
  static todoList = [];

  // initialize todo values
  constructor(description, completed) {
    this.description = description;
    this.completed = completed;
    this.index = Todo.todoList.length;
  }

  // update localstorage for todos
  static updateLocalstorage = () => {
    localStorage.setItem('todo', JSON.stringify(Todo.todoList));
  };

  // add todo into Todo's todoList
  static setTodo = (description, completed) => {
    const todo = new Todo(description, completed);
    const todoList = document.querySelector('.list-container');
    Todo.todoList.push(todo);
    Todo.updateUI(todoList);
    // update localstorage for todos
    Todo.updateLocalstorage();
  };

  // update todo as a whole (especially) from localstorage
  static updateTodo = (currentTodo) => {
    Todo.todoList = currentTodo;
    Todo.updateUI(document.querySelector('.list-container'));
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
    // update localstorage for todos
    Todo.updateLocalstorage();
  };

  static updateTodos = (todo, indexToUpdate) => {
    const todoToUpdate = document.getElementById(`task-${indexToUpdate}`);

    // add event listener for updating todo on enter key pressed
    todoToUpdate.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        todo.description = e.target.value;
        // update todo's
        todo.description = e.target.value;
        // after updating todo's, reset the icon from delete back to select
        const icon = document.querySelector(`.select-${indexToUpdate}`);
        icon.id = 'selection';
        // deselect todo row
        const todoRow = document.querySelector(`.lists-${indexToUpdate}`);
        todoRow.classList.remove('active');
        // and the focus back to todo's input
        document.querySelector('#todo-input').focus();
      }
      // update localstorage for todos
      Todo.updateLocalstorage();
    });
    document.getElementById(`task-${indexToUpdate}`).focus();
  };

  static updateUI = (targetElement) => {
    //  clear currently displayed todos
    targetElement.innerHTML = '';
    // update to do lists display with current todoList
    for (let i = Todo.todoList.length - 1; i >= 0; i -= 1) {
      const task = Todo.todoList[i];
      targetElement.innerHTML += `
        <section class='lists lists-${task.index}'>
            <div class='list'>
              <input class='single-todo' type='checkbox' id='todo-checkbox-${
                task.index
              }' />
              <label id='checkbox-${task.index}' class='' for='single-list-${
                task.index
              }'>
                <input class='list-input ${
                  task.completed ? 'completed' : ''
                }' id='task-${task.index}' value='${task.description}' />
              </label>
            </div>
            <i id='selection' class='ptr select-${i}'></i>
        </section>
      `;
    }

    // for each newly displayed to does create remove event
    Todo.todoList.forEach((todo, index) => {
      const select = document.querySelector(`.select-${index}`);
      const selectedTodoIndex = Number(select.classList[1].slice(7));
      const todoRow = document.querySelector(`.lists-${selectedTodoIndex}`);
      select.addEventListener('click', () => {
        // select the todo to be edited or removed
        select.id = 'selected';
        Todo.updateTodos(todo, selectedTodoIndex);
        // select to do row
        todoRow.classList.add('active');
        // create removing event for select's remove instance
        select.classList.add('remove-todo');
        const remove = document.querySelector('.remove-todo');
        remove.addEventListener('click', () => {
          Todo.removeTodo(selectedTodoIndex);
        });
      });
      // also update todo's when manually selected
      // (i.e.update by focusing on input box of each todos)
      const currentTodo = document.querySelector(`#task-${index}`);
      currentTodo.addEventListener('click', () => {
        todoRow.classList.add('active');
        const selectedTodoIndex = Number(currentTodo.id.slice(5));
        Todo.updateTodos(todo, selectedTodoIndex);
      });
    });

    // handle selections for todo's checkboxes
    Todo.todoList.forEach((task) => {
      // first select the checkboxes
      const todoCheckbox = document.querySelector(
        `#todo-checkbox-${task.index}`,
      );
      // add on change event listener for each of them
      todoCheckbox.addEventListener('change', () => {
        task.completed = !task.completed;
        // get the label to those checkboxes
        const label = document.querySelector(`#checkbox-${task.index}`);
        // toogel their classes based on selection
        if (!task.completed) label.classList.remove('completed');
        else label.classList.add('completed');
        // update localstorage for todos
        Todo.updateLocalstorage();
      });
    });
    // keep checkboxes checked status when updating the ui
    // i.e. for completed tasks check the checkbox and for
    // uncompleted tasks uncheck the checkbox
    Todo.todoList.forEach((todo) => {
      const checkbox = document.querySelector(`#todo-checkbox-${todo.index}`);
      if (todo.completed) checkbox.checked = true;
    });
  };
}
