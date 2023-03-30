export default class Todo {
  static todoList = [];
  constructor(description, completed) {
    this.description = description;
    this.completed = completed;
    this.index = Todo.length;
  }
  static setTodo = (description, completed) => {
    const todo = new Todo(description, completed);
    const todoList = document.querySelector(".list-container");
    Todo.todoList.push(todo);
    console.log("af: ", Todo.todoList);
    Todo.updateUI(todoList);
  };

  static getTodo = (index) => {
    todos.forEach((todo) => {
      if (todo.index === index) {
        return todo;
      }
    });
    return null;
  };

  static getTodos = () => {
    return Todo;
  };

  static removeTodo = () => {};

  static updateUI = (targetElement) => {
    //   first clear the UI at target
    targetElement.innerHTML = "";
    Todo.todoList.forEach((task) => {
      targetElement.innerHTML += `
        <section class="lists">
            <div class="list">
                <input class='single-todo' type="checkbox" id="single-list-${task.index}" />
                <label for="single-list-${task.index}">${task.description} </label>
            </div>
            <i id="selection" class="ptr"></i>
        </section>
    `;
    });
  };
}
