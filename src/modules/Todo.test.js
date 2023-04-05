const Todo = require("./Todo");

describe("Todo", () => {
  test("should add todo (object) to todo list (array)", () => {
    // create a single todo object
    const newTodo = { description: "first todo", completed: false, index: 0 };
    // add the todo object insite todos
    Todo.addTodo("first todo", false);
    // test if the todo lists contains the newly added todos
    expect(Todo.todoList).toContainEqual(newTodo);
  });
});
