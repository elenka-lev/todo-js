const form = document.querySelector('.form');
let tasks = [];

loadTasks();

const task = getTaskToEdit();

fillForm(task);

function loadTasks() {
    const json = localStorage.tasks;
    if (!json) return;
    tasks = JSON.parse(json);
}

function getTaskToEdit() {
    const index = localStorage.taskToEdit;
    // const task = structuredClone(tasks[i]);
    const task = Object.assign({index}, tasks[index])

    return task;
}

function fillForm(task) {
    for (const key in task) {
        if (!form[key]) continue;
        
        const value = task[key];
        
        form[key].value = value;
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const task = Object.fromEntries(new FormData(form));

    if (!task.title) {
        alert("Title shouldn't be empty!");
        return
    }

    updateTask(task);
    saveTasks();
    location.href = 'profile.html';
})

function updateTask(task) {
    const { index, ...props } = task;
    Object.assign(tasks[index], props);
}

function saveTasks() {
    const json = JSON.stringify(tasks);

    localStorage.tasks = json;
}