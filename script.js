const toDoList = document.getElementById("todo-list");
const toDoForm = document.getElementById("todo-form");
const formInput = document.getElementById("title");

const url = "https://jsonplaceholder.typicode.com";

const createToDoDiv = (toDo) => {
  const div = document.createElement("div");
  div.innerHTML = toDo.title;
  toDo.completed && div.classList.add("done");
  div.classList.add("todo");
  div.setAttribute("data-id", toDo.id);
  return div;
};
const fillList = (toDos) => {
  toDos.forEach((toDo) => {
    newToDoDiv = createToDoDiv(toDo);
    toDoList.appendChild(newToDoDiv);
  });
};

const getToDos = () => {
  fetch(url + "/todos?_limit=5")
    .then((res) => res.json())
    .then((data) => fillList(data));
};

const toggleToDo = (e) => {
  e.target.classList.contains("todo") && e.target.classList.toggle("done");
};

const addToDo = (e) => {
  e.preventDefault();
  const toDoText = formInput.value;
  if (toDoText === "") {
    alert("Please write a Todo");
    return;
  }
  newToDo = {
    title: toDoText,
    completed: false,
  };

  fetch(url + "/todos", {
    method: "POST",
    body: JSON.stringify(newToDo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const newToDoDiv = createToDoDiv(data);
      toDoList.appendChild(newToDoDiv);
    });
};

const deleteToDo = (e) => {
  fetch(url + "/todos/" + e.target.getAttribute("data-id"), {
    method: "DELETE",
  });
  e.target.remove();
};

toDoList.addEventListener("click", toggleToDo);
toDoList.addEventListener("dblclick", deleteToDo);
toDoForm.addEventListener("submit", addToDo);
document.addEventListener("DOMContentLoaded", getToDos);
