class Todo {
  // todo list arrat to store all todos
  static todoList = [];

  // initialize todo values
  constructor() {
    this.todoList = [];
  }

  // update localstorage for todos
  static updateLocalstorage = () => {
    localStorage.setItem('todo', JSON.stringify(Todo.todoList));
  };

  // add todo into Todo's todoList
  static addTodo = (description, completed) => {
    const todo = { description, completed, index: this.todoList.length };
    const todoList = document.querySelector('.list-container');
    this.todoList.push(todo);
    Todo.updateUI(todoList);
    // update localstorage for todos
    Todo.updateLocalstorage();
  };

  // update todo as a whole (especially) from localstorage
  static updateTodo = (currentTodo) => {
    this.todoList = currentTodo;
    Todo.updateUI(document.querySelector('.list-container'));
  };

  // remove todo from Todo's todoList by index
  static removeTodo = (id) => {
    const todoList = document.querySelector('.list-container');
    const input = document.querySelector('#todo-input');
    this.todoList = this.todoList.filter((toDo) => toDo.index !== id);

    this.todoList.forEach((todo) => {
      if (todo.index > id) {
        todo.index -= 1;
      }
    });
    // update the UI with the new todos
    Todo.updateUI(todoList);
    // foucs carret on input box
    if (input !== null) document.querySelector('#todo-input').focus();
    // update localstorage for todos
    Todo.updateLocalstorage();
  };

  static editTodo = (todo, indexToUpdate) => {
    const todoToUpdate = document.getElementById(`task-${indexToUpdate}`);
    if (todoToUpdate !== null) {
      // add event listener for updating todo on enter key pressed
      todoToUpdate.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          // update todo's when
          todo.description = e.target.value;
          Todo.todoList[indexToUpdate].description = e.target.value;
          // after updating todo's, reset the icon from delete back to select
          const icon = document.querySelector(`.select-${indexToUpdate}`);
          icon.id = 'selection';
          // // deselect todo row
          const todoRow = document.querySelector(`.lists-${indexToUpdate}`);
          todoRow.classList.remove('active');
          // // and the focus back to todo's input
          document.querySelector('#todo-input').focus();
          // update localstorage for todos
          localStorage.setItem('todo', JSON.stringify(Todo.todoList));
        }
      });
    }
    document.getElementById(`task-${indexToUpdate}`).focus();
  };

  static updateCompletedTodoStatus = (todo) => {
    // handle selections for todo's checkboxes
    if (todo.length > 0) {
      todo.forEach((task) => {
        // first select the checkboxes
        const todoCheckbox = document.querySelector(
          `#todo-checkbox-${task.index}`,
        );
        // add on change event listener for each checkboxes
        if (todoCheckbox !== null) {
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
        }
      });
      // keep checkboxes checked status when updating the ui
      // i.e. for completed tasks check the checkbox and for
      // uncompleted tasks uncheck the checkbox
      todo.forEach((todo) => {
        const checkbox = document.querySelector(
          `#todo-checkbox-${todo.index}`,
        );
        if (todo.completed) checkbox.checked = true;
      });
      Todo.clearCompletedLists();
    }
  };

  static updateUI = (targetElement) => {
    if (Todo.todoList != null) {
      //  clear currently displayed todos
      if (targetElement !== null) {
        targetElement.innerHTML = '';
        for (let i = Todo.todoList.length - 1; i >= 0; i -= 1) {
          const task = Todo.todoList[i];
          targetElement.innerHTML += `<section class='lists lists-${
            task.index
          } drop-targets' draggable=${true}><div class='list'><input class='single-todo' type='checkbox' id='todo-checkbox-${
            task.index
          }' /><label id='checkbox-${task.index}' class='' for='single-list-${
            task.index
          }'><input class='list-input ${
            task.completed ? 'completed' : ''
          }' id='task-${task.index}' value='${
            task.description
          }' /></label></div><i id='selection' class='ptr select-${i}'></i></section>`;
        }

        // create a remove envet handler for each newly displayed todos
        this.todoList.forEach((todo, index) => {
          const select = document.querySelector(`.select-${index}`);
          const selectedTodoIndex = select !== null ? Number(select.classList[1].slice(7)) : 0;
          const todoRow = document.querySelector(`.lists-${selectedTodoIndex}`);
          if (select !== null) {
            select.addEventListener('click', () => {
              // select the todo to be edited or removed
              select.id = 'selected';
              Todo.editTodo(todo, selectedTodoIndex);
              // select to do row
              todoRow.classList.add('active');
              // create removing event for select's remove instance
              select.classList.add('remove-todo');
              const remove = document.querySelector('.remove-todo');
              remove.addEventListener('click', () => {
                Todo.removeTodo(selectedTodoIndex);
              });
            });
          }
          // also update todo's when manually selected
          // (i.e.update by focusing on input box of each todos)
          const currentTodo = document.querySelector(`#task-${index}`);
          if (currentTodo !== null) {
            currentTodo.addEventListener('click', () => {
              todoRow.classList.add('active');
              const selectedTodoIndex = Number(currentTodo.id.slice(5));
              Todo.editTodo(todo, selectedTodoIndex);
            });
          }
        });
        Todo.updateCompletedTodoStatus(Todo.todoList);
      }
    }
  };

  static clearCompletedLists = () => {
    // handle clear completed todo's functionality
    const clear = document.querySelector('.clear-all');
    const todoList = document.querySelector('.list-container');
    if (clear !== null) {
      clear.addEventListener('click', () => {
        Todo.todoList = Todo.todoList.filter(
          (todos) => todos.completed !== true,
        );
        // update localstorage for todos
        Todo.updateLocalstorage();
        Todo.updateUI(todoList);
      });
    }
  };

  static resetTodos = () => {
    // remove all todos from todoList
    this.todoList = this.todoList.filter((todo) => todo.index === -1);
    // update the local storage
    Todo.updateLocalstorage();
    // update the UI
    const todoList = document.querySelector('.list-container');
    Todo.updateUI(todoList);
  };
}

module.exports = Todo;
