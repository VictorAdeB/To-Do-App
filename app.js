//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);


//Functions

function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();
  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create list
  // const newTodo = document.createElement("li");
  // newTodo.innerText = todoInput.value;
const newTodo = document.createElement("li");
newTodo.innerText = todoInput.value;

// Add the new todo to the list (assuming you have a todoList element)
todoList.appendChild(newTodo);

// Create and play the bounce animation using gsap animations
function bounceNewTodo(element) {
  gsap.from(element, {
    y: -50, // Start 50 pixels above its final position
    duration: 0.3,
    ease: "bounce.out", // Use a bounce easing for a bouncy effect
    onComplete: () => {
      gsap.to(element, {
        scale: 0.8,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }
  });
}
// Call the bounce animation on the new todo
bounceNewTodo(newTodo);
// Clear the input field
todoInput.value = ""; //gsap animations end here

  //Save to local - do this last
  //Save to local
  saveLocalTodos(todoInput.value);
  //
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";
  //Create Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //Create trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //attach final Todo
  todoList.appendChild(todoDiv);
}

function deleteTodo(e) {
  const item = e.target;

if (item.classList[0] === "trash-btn") {
  const todo = item.parentElement;
  
  // Create and play the slide-right animation using Gsap
  gsap.to(todo, {
    x: '100%', // Slide to the right
    duration: 1, // Animation duration in seconds
    ease: 'power2.in', // Easing function
    onComplete: () => {
      removeLocalTodos(todo);
      todo.remove();
    }
  });
}

if (item.classList[0] === "complete-btn") {
  const todo = item.parentElement;
  todo.classList.toggle("completed");
  
  //gsap animations
  gsap.from(todo, {
    scale: 1.9,
    duration: 0.5,
    ease: 'power2.out'
  });
  
  console.log(todo);
}
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

// Standalone todos variable
let todos = localStorage.getItem("todos") === null
  ? []
  : JSON.parse(localStorage.getItem("todos"));

// Function to update localStorage
function updateLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// saveLocalTodos function
function saveLocalTodos(todo) {
  todos.push(todo);
  updateLocalStorage();
}

// removeLocalTodos function
function removeLocalTodos(todo) {
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  updateLocalStorage();
}


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
