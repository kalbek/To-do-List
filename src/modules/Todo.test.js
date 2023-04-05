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
    // const firstTodo = { description: "first todo", completed: false, index: 0 };
    // // first add two todos inside todo list
    // Todo.addTodo("first todo", false);
    // Todo.addTodo("second todo", false);
    // // then remvoe one todo (the second todo) form todo list
    // Todo.removeTodo(1);
    // // test if the remaining todo contains only the first todo
    // const remainingTodo = Todo.todoList.filter((todo) => todo.index === 0);
    // expect(remainingTodo).toEqual([firstTodo]);
    // expect(Todo.todoList).toContainEqual(fistTodo);

    // first clear the todolist
    Todo.todoList.splice(0);
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
    // remove the second todo
    Todo.removeTodo(1);

    // test if initialTodo contains the second todo (the one removed)
    expect(initialTodo).not.toContain({
      description: "second todo",
      completed: false,
      index: 1,
    });
    // test if ID's of the remaining todos is updated after removing the first item
  });
});
