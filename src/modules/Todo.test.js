const Todo = require("./Todo.js");
const { TextEncoder } = require("util").TextEncoder;
const { JSDOM } = require("jsdom");

const addLiToDOM = jest.fn();
// const { TextEncoder, TextDecoder } = require('util').textEncoder;

describe("addLiToDOM function", () => {
  // set up the JSDOM environment
  const { window } = new JSDOM("<!doctype html><html><body></body></html>");
  global.document = window.document;
  
  // test that the function adds an <li> element to the DOM
  it("adds an <section> element to the DOM", () => {
    // define the list and the <li> element to be added
    const list = ["item1", "item2", "item3"];
    const li = document.createElement("li");
    const di = document.createElement("div");
    di.innerHTML += `<p>ey</p>`
    
    li.textContent = list[0];
    // first add a single to do fot the dom element not to be empty
    const newTodo = { description: "first todo", completed: false, index: 0 };
    // add the todo object insite todos
    Todo.addTodo("first todo", false);
    di.classList.add('list-container')
    const todoList = document.querySelector('.list-container');

    // then update ui
    Todo.updateUI(todoList);
    // call the function to be tested with the list and the <li> element
    // addLiToDOM(list, li);
    console.log("todoList: ", todoList)

    // assert that the <li> element was added to the DOM
    // expect(document.querySelector("ul").contains(li)).toBe(true);
    // expect(todoList.contains(section)).toBe(true);
  });
});

describe("AddTodos", () => {
  test("should add todo (object) into todo list (array)", () => {
    // create a single todo object
    const newTodo = { description: "first todo", completed: false, index: 0 };
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
