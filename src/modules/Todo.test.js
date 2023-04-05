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
    Todo.todoList.splice(0);
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
    // test for removing each of these 3 todo inside Todo's todoList
    for (let i = 0; i < initialTodo.length; i++) {
      // add the todos insite Todo.todolist
      Todo.addTodo(initialTodo.description, initialTodo.completed);
      // remove the todos one by one
      Todo.removeTodo(i);
      // test if that specific todo is removed from Todo's todoList
      expect(Todo.todoList).not.toContain(initialTodo[i]);
    }
    // test if ID's of the remaining todos is updated after removing the first item
  });
});
