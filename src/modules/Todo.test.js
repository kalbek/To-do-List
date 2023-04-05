const Todo = require("./Todo");

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
  test("should remove a todos i.e. ( an object) from todo list which is (an array)", () => {
    // clear all todo's from todoList for new test
    Todo.todoList.splice(0);
    // define 3 new todos
    const initialTodo = [
      {
        description: "first todo",
        completed: false,
      },
      {
        description: "second todo",
        completed: false,
      },
      {
        description: "third todo",
        completed: false,
      },
    ];
    // add these todos inside Todo's todolist
    initialTodo.forEach((todo, i) => {
      Todo.addTodo(todo.description, todo.completed);
      // console.log("add steps: " + i, Todo.todoList);
    });
    
    // test for remove function while removing each of these 3 todos one by one
    // from Todo's todoList
    Todo.todoList.forEach((todo, i) => {
      Todo.removeTodo(i);
      // test if that specific todo is removed from Todo's todoList
      expect(Todo.todoList).not.toContain(initialTodo[i]);
      // test if ID's of the remaining todos is updated after removing the first item
      // console.log(Todo.todoList)
      // expect(Todo.todoList[i].index).toEqual(todo.index)
    });
  
  });
});
