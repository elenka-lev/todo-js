/*Підключення календаря/connect calendar */
const today = new Date();
const picker = new Pikaday({
  field: document.getElementById("datepicker"),
  format: "DD.MM.YYYY",
  minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
  toString(date, format) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  },
});

/*logout / вихід*/

const logout = document.querySelector(".logout");

logout.addEventListener('click', e => {
  window.location.href = "index.html";
})

/*Add tasks*/

const form = document.querySelector('.form');
const todoList = document.querySelector('.todo-items');
let tasks = [];

loadTasks();
showTasks();

form.addEventListener('submit', e => {
  e.preventDefault();

  const task = Object.fromEntries(new FormData(form));
  addTask(task);
  saveTasks();
  showTasks();
  form.reset();
})

function addTask(task) {
  task.done = false;
  tasks.push(task);
}

function showTasks() {
  let html = '';

  tasks.forEach(task => {
    html += `
      <li class="item">
        <div class="todo-header">
          <h3>${task.category}</h3>
          <a href="edit.html" class="btn-edit">
            <svg widht="40" height="40">
              <use href="icons/edit.svg" />
            </svg>
          </a>
        </div>
        <div class="todo-text">
          <p class="text">${task.title}</p>
        </div>
        <div class="control">
          <div class="check">
            <label>
              <input type="checkbox" ${task.done ? "checked" : ""} hidden />
            </label>
          </div>
          <button type="button" class="delete">
            <svg widht="40" height="40">
              <use href="icons/delete.svg" />
            </svg>
          </button>
        </div>
      </li>
    `;
  });
  todoList.innerHTML = html;
}

function loadTasks() {
  const json = localStorage.tasks;
  if (!json) return;
  const loadedTasks = JSON.parse(json);
  
  tasks = loadedTasks
}

function saveTasks() {
  const json = JSON.stringify(tasks);
  
  localStorage.tasks = json;
}

todoList.addEventListener('change', e => {
  const box = e.target;
  const li = box.closest('.item');
  const i = getIndex(li);
  
  toggleTaskStatus(i, box.checked);
  saveTasks();
})

todoList.addEventListener('click', e => {
  const a = e.target.closest('.btn-edit');
  if (!a) return;
  const li = a.closest('.item');
  const i = getIndex(li);
  
  setTaskToEditIndex(i);
})

function getIndex(element) {
  const siblings = Array.from(element.parentElement.children);
  
  return siblings.indexOf(element);
}

function toggleTaskStatus(i, status) {
  const task = tasks[i];
  
  task.done = status;
}

function setTaskToEditIndex(i) {
  localStorage.taskToEdit = i;
}