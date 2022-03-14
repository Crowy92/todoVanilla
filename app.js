//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//Functions
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to local storage
    saveLocalTodos(todoInput.value);
    //Check Mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Check Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
    //clear input value
    todoInput.value = "";
}

function deleteCheck(e) {
    console.log(e.target);
    const item = e.target;
    //Delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
    }
    //Check MArk
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        completeLocalTodos(todo);
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        if (todo.style == undefined) {
            ;
        } else {
            switch (e.target.value) {
                case "all":
                    todo.style.display = 'flex';
                    break;
                case "completed":
                    if (todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains('completed')) {
                        todo.style.display = 'flex';
                    } else {
                        todo.style.display = 'none';
                    }
                    break;
            }
        }
    });
}

function saveLocalTodos(todo) {
    //Check is there any already
    let todos;
    let completeds;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        completeds = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        completeds = JSON.parse(localStorage.getItem('completeds'));
    }
    //add new todo too either empty array r array retrieved from storage
    todos.push(todo);
    completeds.push(false);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completeds', JSON.stringify(completeds));
}

function getTodos() {
    let todos;
    let completeds;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        completeds = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        completeds = JSON.parse(localStorage.getItem('completeds'));
    }
    todos.forEach(function (todo, i) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if (completeds[i] == true) {
            todoDiv.classList.toggle("completed");
        }
        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check Mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Check Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        // Append to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    let todos;
    let completeds;
    let index;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        completeds = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        completeds = JSON.parse(localStorage.getItem('completeds'));
    }
    const todoIndex = todo.children[0].innerText;
    index = todos.indexOf(todoIndex);
    todos.splice(index, 1);
    completeds.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completeds', JSON.stringify(completeds));
}

function completeLocalTodos(todo) {
    let todos;
    let completeds;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        completeds = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
        completeds = JSON.parse(localStorage.getItem('completeds'));
    }
    const todoIndex = todo.children[0].innerText;
    completeds[todos.indexOf(todoIndex)] = !completeds[todos.indexOf(todoIndex)];
    localStorage.setItem('completeds', JSON.stringify(completeds));
}