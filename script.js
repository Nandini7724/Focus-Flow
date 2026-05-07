const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");

// Load tasks
window.onload = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task.text, task.completed));
};

function saveTasks() {
    const tasks = [];

    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") return;

    createTask(text, false);
    saveTasks();

    taskInput.value = "";
}

function createTask(text, completed) {
    const li = document.createElement("li");
    li.textContent = text;

    if (completed) {
        li.classList.add("completed");
    }

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";

    delBtn.onclick = (e) => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// Dark Mode
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Pomodoro Timer
let time = 25 * 60;
let timerInterval;

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    document.getElementById("timer").textContent =
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimer();
        } else {
            clearInterval(timerInterval);
            alert("Pomodoro Complete!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    time = 25 * 60;
    updateTimer();
}

updateTimer();