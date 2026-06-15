let totalTasks = 0;
let completedTasks = 0;

function addTask() {

    let taskInput = document.getElementById("taskInput");

    let task = taskInput.value;

    if (task === "") return;

    totalTasks++;
    saveTasks();

    let li = document.createElement("li");

    let checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.onchange = function() {

        if (this.checked) {
            completedTasks++;
        } else {
            completedTasks--;
        }

        updateProgress();
        saveTasks();
    };

    li.appendChild(checkbox);

    li.append(task);

    document.getElementById("taskList").appendChild(li);
    saveTasks();
    taskInput.value = "";

    updateProgress();
}

function updateProgress() {

    let percent = 0;

    if (totalTasks > 0) {
        percent = Math.round((completedTasks / totalTasks) * 100);
    }

    let bar = document.getElementById("progressBar");

    bar.style.width = percent + "%";
    bar.innerHTML = percent + "%";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    let btn = document.querySelector(".dark-btn");

    if(document.body.classList.contains("dark-mode")){
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }
}
function saveTasks() {
    let taskList = document.getElementById("taskList");
    localStorage.setItem("tasks", taskList.innerHTML);
}
window.onload = function () {
    let taskList = document.getElementById("taskList");

    if (localStorage.getItem("tasks")) {
        taskList.innerHTML = localStorage.getItem("tasks");
    }
}