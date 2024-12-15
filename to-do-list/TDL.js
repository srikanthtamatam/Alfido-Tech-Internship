
let tasks = [];
let filter = 'all';

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks
        .filter(task => {
            if (filter === 'all') return true;
            if (filter === 'pending') return !task.completed;
            if (filter === 'completed') return task.completed;
        })
        .forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = `task ${task.completed ? 'completed' : ''}`;

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            const taskButtons = document.createElement('div');
            taskButtons.className = 'task-buttons';

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.onclick = () => toggleComplete(index);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit';
            editButton.onclick = () => editTask(index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.onclick = () => deleteTask(index);

            taskButtons.appendChild(completeButton);
            taskButtons.appendChild(editButton);
            taskButtons.appendChild(deleteButton);

            taskItem.appendChild(taskText);
            taskItem.appendChild(taskButtons);

            taskList.appendChild(taskItem);
        });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(type) {
    filter = type;
    renderTasks();
}
