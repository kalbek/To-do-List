class Todo {
  // todo list arrat to store all todos
  static todoList = [];

  // initialize todo values
  constructor() {
    this.todoList = [];
  }

  // update localstorage for todos
  static updateLocalstorage = () => {
    localStorage.setItem("todo", JSON.stringify(Todo.todoList));
  };

  static stringLength = (string) => {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
      count++;
    }
    return count;
  };

  // add todo into Todo's todoList
  static addTodo = (description, completed) => {
    const todo = { description, completed, index: this.todoList.length };
    const todoList = document.querySelector(".list-container");
    this.todoList.push(todo);
    Todo.updateUI(todoList);
    // update localstorage for todos
    Todo.updateLocalstorage();
  };

  // update todo as a whole (especially) from localstorage
  static updateTodo = (currentTodo) => {
    console.log(this.todoList);
    this.todoList = currentTodo;
    Todo.updateUI(document.querySelector(".list-container"));
  };

  // remove todo from Todo's todoList by index
  static removeTodo = (id) => {
    const todoList = document.querySelector(".list-container");
    const input = document.querySelector("#todo-input")
    this.todoList = this.todoList.filter((toDo) => toDo.index !== id);

    this.todoList.forEach((todo) => {
      if (todo.index > id) {
        todo.index -= 1;
      }
    })
    // update the UI with the new todos 
    Todo.updateUI(todoList);
    // foucs carret on input box
    input && document.querySelector("#todo-input").focus();
    // update localstorage for todos
    Todo.updateLocalstorage();
  };

  static updateTodos = (todo, indexToUpdate) => {
    const todoToUpdate = document.getElementById(`task-${indexToUpdate}`);

    // add event listener for updating todo on enter key pressed
    if (todoToUpdate !== null) {
      todoToUpdate.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          todo.description = e.target.value;
          // update todo's
          todo.description = e.target.value;
          // after updating todo's, reset the icon from delete back to select
          const icon = document.querySelector(`.select-${indexToUpdate}`);
          icon.id = "selection";
          // deselect todo row
          const todoRow = document.querySelector(`.lists-${indexToUpdate}`);
          todoRow.classList.remove("active");
          // and the focus back to todo's input
          document.querySelector("#todo-input").focus();
        }
        // update localstorage for todos
        Todo.updateLocalstorage();
      });
    }
    document.getElementById(`task-${indexToUpdate}`).focus();
  };

  static updateUI = (targetElement) => {
    if (Todo.todoList != null) {
      //  clear currently displayed todos
      if (targetElement !== null) {
        targetElement.innerHTML = "";
        // update to do lists display with current todoList
        for (let i = this.todoList.length - 1; i >= 0; i -= 1) {
          const task = this.todoList[i];
          targetElement.innerHTML += `
        <section class='lists lists-${
          task.index
        } drop-targets' draggable=${true}>
            <div class='list'>
              <input class='single-todo' type='checkbox' id='todo-checkbox-${
                task.index
              }' />
              <label id='checkbox-${task.index}' class='' for='single-list-${
            task.index
          }'>
                <input class='list-input ${
                  task.completed ? "completed" : ""
                }' id='task-${task.index}' value='${task.description}' />
              </label>
            </div>
            <i id='selection' class='ptr select-${i}'></i>
        </section>
      `;
        }

        // handle todo drag
        Todo.todoList.forEach((todo) => {
          // select the item element
          const select = document.querySelector(`.lists-${todo.index}`);
          function dragEnter(e) {
            // e.preventDefault();
            e.target.classList.add("drag-over");
          }

          function dragOver(e) {
            // e.preventDefault();
            e.target.classList.add("drag-over");
          }

          function dragLeave(e) {
            e.target.classList.remove("drag-over");
          }
          // handle the dragstart

          function dragStart(e) {
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => {
              e.target.classList.add("hide");
            }, 0);
          }

          function drop(e) {
            e.target.classList.remove("drag-over");

            // get the draggable element
            const id = e.dataTransfer.getData("text/plain");
            const draggable = document.getElementById(id);

            // add it to the drop target
            e.target.appendChild(draggable);

            // display the draggable element
            draggable.classList.remove("hide");
          }

          // attach the dragstart event handler
          select.addEventListener("dragstart", dragStart);
          select.addEventListener("dragenter", dragEnter);
          select.addEventListener("dragover", dragOver);
          select.addEventListener("dragleave", dragLeave);
          select.addEventListener("drop", drop);
        });

        // for each newly displayed to does create remove event
        this.todoList.forEach((todo, index) => {
          const select = document.querySelector(`.select-${index}`);
          const selectedTodoIndex = Number(select.classList[1].slice(7));
          const todoRow = document.querySelector(`.lists-${selectedTodoIndex}`);
          select.addEventListener("click", () => {
            // select the todo to be edited or removed
            select.id = "selected";
            Todo.updateTodos(todo, selectedTodoIndex);
            // select to do row
            todoRow.classList.add("active");
            // create removing event for select's remove instance
            select.classList.add("remove-todo");
            const remove = document.querySelector(".remove-todo");
            remove.addEventListener("click", () => {
              Todo.removeTodo(selectedTodoIndex);
            });
          });
          // also update todo's when manually selected
          // (i.e.update by focusing on input box of each todos)
          const currentTodo = document.querySelector(`#task-${index}`);
          if (currentTodo !== null) {
            currentTodo.addEventListener("click", () => {
              todoRow.classList.add("active");
              const selectedTodoIndex = Number(currentTodo.id.slice(5));
              Todo.updateTodos(todo, selectedTodoIndex);
            });
          }
        });

        // handle selections for todo's checkboxes
        Todo.todoList.forEach((task) => {
          // const todoList = document.querySelector('.list-container');
          // Todo.updateUI(todoList)
          // first select the checkboxes
          const todoCheckbox = document.querySelector(
            `#todo-checkbox-${task.index}`
          );
          // add on change event listener for each checkboxes
          todoCheckbox.addEventListener("change", () => {
            task.completed = !task.completed;
            // get the label to those checkboxes
            const label = document.querySelector(`#checkbox-${task.index}`);
            // toogel their classes based on selection
            if (!task.completed) label.classList.remove("completed");
            else label.classList.add("completed");
            // update localstorage for todos
            Todo.updateLocalstorage();
          });
        });
        // keep checkboxes checked status when updating the ui
        // i.e. for completed tasks check the checkbox and for
        // uncompleted tasks uncheck the checkbox
        Todo.todoList.forEach((todo) => {
          const checkbox = document.querySelector(
            `#todo-checkbox-${todo.index}`
          );
          if (todo.completed) checkbox.checked = true;
        });
        Todo.clearCompletedLists();
      }
    }
  };

  static clearCompletedLists = () => {
    // handle clear completed todo's functionality
    const clear = document.querySelector(".clear-all");
    const todoList = document.querySelector(".list-container");
    clear.addEventListener("click", () => {
      Todo.todoList = Todo.todoList.filter((todos) => todos.completed !== true);
      // update localstorage for todos
      Todo.updateLocalstorage();
      Todo.updateUI(todoList);
    });
  };

  static resetTodos = () => {
    // remove all todos from todoList
    this.todoList = this.todoList.filter((todo) => todo.index === -1);
    // update the local storage
    Todo.updateLocalstorage();
    // update the UI
    const todoList = document.querySelector(".list-container");
    Todo.updateUI(todoList);
  };
}

module.exports = Todo;
