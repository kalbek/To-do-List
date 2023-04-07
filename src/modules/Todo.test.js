const { JSDOM } = require("jsdom");
const { updateUI } = require("./Todo.js");
const Todo = require("./Todo.js");

describe("createTodoListHTMLElements", () => {
  it("should create todo lists HTML element in the DOM", () => {
    // Arrange
    // create target div continer to append the todos
    const target = document.createElement("div");
    console.log("tar: ", target);
    target.setAttribute("id", "list-container");
    let expectedOutputHtml = "";
    const mockTodos = [
      { description: "first todo", completed: false, index: 0 },
      { description: "second todo", completed: false, index: 1 },
      { description: "third todo", completed: false, index: 2 },
    ];
    // Act
    mockTodos.forEach((todo) => {
      Todo.addTodo(todo.description, todo.completed);
    });
    let todos;
    for (let i = mockTodos.length - 1; i >= 0; i -= 1) {
      const task = mockTodos[i];
      todos += `<section class='lists lists-${task.index} drop-targets' draggable=${true}><div class='list'><input class='single-todo' type='checkbox' id='todo-checkbox-${task.index}' /><label id='checkbox-${task.index}' class='' for='single-list-${task.index}'><input class='list-input ${task.completed ? "completed" : ""}' id='task-${task.index}' value='${task.description}' /></label></div><i id='selection' class='ptr select-${i}'></i></section>`;
    }
    Todo.createTodoListHTMLElements(target, mockTodos);
    expect(target.innerHTML).toEqual(todos)
    // console.log("target: ", target)
    // console.log("todo: ", document.getElementById('todo'))
    
    //Assert
    // expect(Todo.createTodoListHTMLElements(target, mockTodos).toEqual(expectedOutputHtml))
  });
});

describe("AddTodos", () => {
  test("should add todo (object) into todo list (array)", () => {
    // create a single todo object
    const newTodo = {
      description: "first todo",
      completed: false,
      index: 0,
    };
    // add the todo object insite todos
    Todo.addTodo("first todo", false);
    // test if the todo lists contains the newly added todos
    expect(Todo.todoList).toContainEqual(newTodo);
  });
});

describe("RemoveTodo", () => {
  test("should remove a todos from todo list and ids must be updated", () => {
    // clear all todo's from todoList for new test
    Todo.todoList.splice(0);
    // define 3 new todo items
    const initialTodo = [
      {
        description: "first todo",
        completed: false,
        index: 0,
      },
      {
        description: "second todo",
        completed: false,
        index: 1,
      },
      {
        description: "third todo",
        completed: false,
        index: 2,
      },
    ];
    // todo list to expect after removing the second to do item
    // note: the ids are updating
    const expectedOutPut = [
      {
        description: "first todo",
        completed: false,
        index: 0,
      },
      {
        description: "third todo",
        completed: false,
        index: 1,
      },
    ];

    // add the 3 todos inside todolist
    initialTodo.forEach((todo) => {
      Todo.addTodo(todo.description, todo.completed);
    });
    // remove the second todo item
    Todo.removeTodo(1);
    // test if the todoList will be equal to the expected out put
    expect(Todo.todoList).toEqual(expectedOutPut);
  });
});
