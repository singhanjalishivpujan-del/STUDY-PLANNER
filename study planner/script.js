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

    taskList.innerHTML = localStorage.getItem("tasks") || "";

    totalTasks = taskList.getElementsByTagName("li").length;

    let checkboxes = taskList.querySelectorAll("input[type='checkbox']");
    completedTasks = 0;

    checkboxes.forEach(function(box){
        if(box.checked) completedTasks++;

        box.onchange = function(){
            if(this.checked){
                completedTasks++;
            } else {
                completedTasks--;
            }
            updateProgress();
            saveTasks();
        };
    });

    updateProgress();
}
function clearTasks() {
    localStorage.removeItem("tasks");
    document.getElementById("taskList").innerHTML = "";
    totalTasks = 0;
    completedTasks = 0;
    updateProgress();
}
let time = 1500;

function startTimer(){
    let timer = setInterval(function(){
        let min = Math.floor(time/60);
        let sec = time%60;

        document.getElementById("timer").innerHTML =
        min + ":" + (sec<10?"0":"") + sec;

        time--;

        if(time<0){
            clearInterval(timer);
            alert("Focus Session Completed!");
        }
    },1000);
}