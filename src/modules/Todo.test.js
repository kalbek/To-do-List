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
    const firstTodo = { description: "first todo", completed: false, index: 0 };
    // first add two todos inside todo list
    Todo.addTodo("first todo", false);
    Todo.addTodo("second todo", false);
    // then remvoe one todo (the second todo) form todo list
    Todo.removeTodo(1);
    // test if the remaining todo contains only the first todo
    const remainingTodo = Todo.todoList.filter((todo) => todo.index === 0);
    expect(remainingTodo).toEqual([firstTodo]);
    // expect(Todo.todoList).toContainEqual(fistTodo);
  });
});
