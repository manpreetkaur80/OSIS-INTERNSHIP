
let addTaskBtn = document.getElementById("add-task-btn");
let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");
let completedTaskList = document.getElementById("completed-task-list");

let pendingCount = document.getElementById("pending-count");
let completedCount = document.getElementById("completed-count");
let pendingEmpty = document.getElementById("pending-empty");
let completedEmpty = document.getElementById("completed-empty");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounts() {
    let pending = tasks.filter(task => !task.completed).length;
    let completed = tasks.filter(task => task.completed).length;

    pendingCount.textContent = `${pending} pending`;
    completedCount.textContent = `${completed} completed`;

    pendingEmpty.style.display = pending === 0 ? "block" : "none";
    completedEmpty.style.display = completed === 0 ? "block" : "none";
}

function renderTasks() {
    taskList.innerHTML = "";
    completedTaskList.innerHTML = "";

    tasks.forEach(function (task) {
        let taskItem = document.createElement("li");

        let taskText = document.createElement("span");
        taskText.textContent = task.text;

        let timestamp = document.createElement("small");
        timestamp.textContent = "Added: " + task.addedAt;

        let completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Mark Pending" : "Mark Complete";

        completeBtn.addEventListener("click", function () {
            task.completed = !task.completed;
            task.completedAt = task.completed ? new Date().toLocaleString() : null;
            saveTasks();
            renderTasks();
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", function () {
            let editInput = document.createElement("input");
            editInput.type = "text";
            editInput.value = task.text;

            let saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";

            let cancelBtn = document.createElement("button");
            cancelBtn.textContent = "Cancel";

            taskItem.replaceChildren(editInput, saveBtn, cancelBtn);

            saveBtn.addEventListener("click", function () {
                let updatedText = editInput.value.trim();

                if (updatedText !== "") {
                    task.text = updatedText;
                    saveTasks();
                    renderTasks();
                }
            });

            cancelBtn.addEventListener("click", renderTasks);

            editInput.focus();
        });

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        taskItem.append(taskText, timestamp);

        if (task.completed && task.completedAt) {
            let completedTimestamp = document.createElement("small");
            completedTimestamp.textContent = "Completed: " + task.completedAt;
            taskItem.appendChild(completedTimestamp);
        }

        taskItem.append(completeBtn, editBtn, deleteBtn);

        if (task.completed) {
            completedTaskList.appendChild(taskItem);
        } else {
            taskList.appendChild(taskItem);
        }
    });

    updateCounts();
}

function addTask() {
    let text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now() + Math.random(),
        text: text,
        completed: false,
        addedAt: new Date().toLocaleString(),
        completedAt: null
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
    taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

renderTasks();
