const toDoList = document.getElementById("todo-list");
const toDoForm = document.getElementById("todo-form");
const formInput = document.getElementById("title");

const createToDoDiv = (text, completed) => {
  const div = document.createElement("div");
  div.innerHTML = text;
  completed && div.classList.add("done");
  return div;
};
const fillList = (toDos) => {
  toDos.forEach((toDo) => {
    newToDoDiv = createToDoDiv(toDo.title, toDo.completed);
    toDoList.appendChild(newToDoDiv);
  });
};

const getToDos = () => {
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => res.json())
    .then((data) => fillList(data));
};

const toggleToDo = (e) => {
  e.target.classList.toggle("done");
};

const addToDo = (e) => {
  e.preventDefault();
  const toDoText = formInput.value;
  console.log(toDoText);
  if (toDoText === "") {
    alert("Please write a Todo");
    return;
  }
  newToDoDiv = createToDoDiv(toDoText, false);
  toDoList.appendChild(newToDoDiv);
};

toDoList.addEventListener("click", toggleToDo);
toDoForm.addEventListener("submit", addToDo);

getToDos();
