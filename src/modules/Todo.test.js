const Todo = require('./Todo.js');

describe('AddTodos', () => {
  test('should add todo (object) into todo list (array)', () => {
    // create a single todo object
    const newTodo = {
      description: 'first todo',
      completed: false,
      index: 0,
    };
    // add the todo object insite todos
    Todo.addTodo('first todo', false);
    // test if the todo lists contains the newly added todo
    expect(Todo.todoList).toContainEqual(newTodo);
  });
});

describe('RemoveTodo', () => {
  test('should remove a todos from todo list and ids must be updated', () => {
    // clear all todo's from todoList for new test
    Todo.todoList.splice(0);
    // define 3 new todo items
    const initialTodo = [
      {
        description: 'first todo',
        completed: false,
        index: 0,
      },
      {
        description: 'second todo',
        completed: false,
        index: 1,
      },
      {
        description: 'third todo',
        completed: false,
        index: 2,
      },
    ];
    // todo list to expect after removing the second to do item
    // note: the ids are updating
    const expectedOutPut = [
      {
        description: 'first todo',
        completed: false,
        index: 0,
      },
      {
        description: 'third todo',
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

describe('editTodo function', () => {
  let input;
  let todos;
  beforeEach(() => {
    // set initial mock todo
    todos = {
      description: 'Finish Projects',
      completed: false,
    };
    // Set up the HTML to mock the fileds to update todos
    document.body.innerHTML = `<section class='lists lists-0'>
    <input id='todo-input'>
      <div class='list'>
        <label id='checkbox-0' for='single-list-0'>
          <input class='list-input' id='task-0' value='${todos.description}' />
        </label>
      </div>
      <i id='selection' class='ptr select-0'></i>
    </section>`;
    // get the field where todo is to be edited
    input = document.getElementById('task-0');
    // set todo of the local storage with current value
    localStorage.setItem('todo', JSON.stringify([todos]));
  });

  test("should update the todo's description when Enter key is pressed", () => {
    // type a new todo on the input field
    input.value = 'Take the quiz.';
    // Call the edit function
    Todo.editTodo(todos, 0);
    // trigger the enter key press to save the edited value
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    // check that the todo's description was updated in the todoList array
    let updatedTodoList = Todo.todoList;
    // test if the Todo.todoList has been updated
    expect(updatedTodoList && updatedTodoList[0].description).toBe(
      'Take the quiz.',
    );
    // now get the updated todo list from local storage
    updatedTodoList = JSON.parse(localStorage.getItem('todo'));
    // check if the todo's was also updated in the local storage
    expect(updatedTodoList && updatedTodoList[0].description).toBe(
      'Take the quiz.',
    );
  });
});

describe('updateCompletedTodoStatus', () => {
  let todos;
  beforeEach(() => {
    // set initial mock todo
    todos = [
      {
        description: 'Finish Projects',
        completed: false,
        index: 0,
      },
    ];
    // Set up the HTML to mock the fileds to update todos
    document.body.innerHTML = `<section class='lists lists-0'>
    <input id='todo-input'>
      <div class='list'>
      <label id='checkbox-0' for='single-list-0'>
        <input class='single-todo' type='checkbox' id='todo-checkbox-0' />
      </label>
      </div>
      <i id='selection' class='ptr select-0'></i>
      </section>`;
    // get the checkbox field for the todo
  });
  test('should update checked todos as completed', () => {
    // set todo list to hold the mock todo list
    Todo.todoList = todos;
    // now get the checkbox
    const todoCheckbox = document.getElementById('todo-checkbox-0');
    // check the checkbox
    // todoCheckbox.checked = true;
    // call the update completed function
    Todo.updateCompletedTodoStatus(Todo.todoList);
    todoCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    // check if the Todo.todolist is updated
    expect(Todo.todoList[0].completed).toBe(true);
    // check if the status for the mock todo is updated
    Todo.updateCompletedTodoStatus(todos);
    expect(todos[0].completed).toBe(true);
  });
});

describe('clearCompletedLists', () => {
  let todos;
  beforeEach(() => {
    // set initial mock todo
    todos = [
      {
        description: 'Finish Projects',
        completed: false,
        index: 0,
      },
    ];
    // Set up the HTML to mock the fileds to update todos
    document.body.innerHTML = `<section class='lists lists-0'>
    <input id='todo-input'>
      <div class='list'>
      <label id='checkbox-0' for='single-list-0'>
        <input class='single-todo' type='checkbox' id='todo-checkbox-0' />
      </label>
      </div>
      <i id='selection' class='ptr select-0'></i>
      </section>
      <div class='clear-all'>Clear All Todos</div>
      `;
    // get the checkbox field for the todo
  });
  test('should update checked todos as completed', () => {
    const clearAll = document.querySelector('.clear-all');
    // set todo list to hold the mock todo list
    Todo.todoList = todos;
    // now get the checkbox
    const todoCheckbox = document.getElementById('todo-checkbox-0');
    // check the checkbox
    // todoCheckbox.checked = true;
    // call the update completed function
    Todo.updateCompletedTodoStatus(Todo.todoList);
    todoCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    // check if the Todo.todolist completed status is updated
    expect(Todo.todoList[0].completed).toBe(true);
    // call clearCompletedTodos function
    Todo.clearCompletedLists();
    // click the clear all button
    clearAll.dispatchEvent(new Event('click', { bubbles: true }));
    // check if the todo is removed from todos
    expect(Todo.todoList).toEqual([]);
  });
});
