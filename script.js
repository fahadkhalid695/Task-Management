document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];
    let taskId = 1;

    const taskModal = document.getElementById('taskModal');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const closeModalBtn = document.getElementsByClassName('close')[0];
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');

    addTaskBtn.onclick = () => openModal();
    closeModalBtn.onclick = () => closeModal();
    window.onclick = (event) => {
        if (event.target == taskModal) {
            closeModal();
        }
    }

    taskForm.onsubmit = (event) => {
        event.preventDefault();
        const id = document.getElementById('taskId').value;
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const status = document.getElementById('taskStatus').value;
        const dueDate = document.getElementById('taskDueDate').value;

        if (id) {
            // Edit existing task
            const task = tasks.find(t => t.id == id);
            task.title = title;
            task.description = description;
            task.status = status;
            task.dueDate = dueDate;
        } else {
            // Add new task
            const newTask = {
                id: taskId++,
                title,
                description,
                status,
                dueDate
            };
            tasks.push(newTask);
        }

        closeModal();
        renderTasks();
    }

    function openModal(task = null) {
        if (task) {
            document.getElementById('modalTitle').textContent = 'Edit Task';
            document.getElementById('taskId').value = task.id;
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskStatus').value = task.status;
            document.getElementById('taskDueDate').value = task.dueDate;
        } else {
            document.getElementById('modalTitle').textContent = 'Add Task';
            document.getElementById('taskId').value = '';
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            document.getElementById('taskStatus').value = 'pending';
            document.getElementById('taskDueDate').value = '';
        }
        taskModal.style.display = 'block';
    }

    function closeModal() {
        taskModal.style.display = 'none';
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'task-card';
            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>Status: ${task.status}</p>
                <p>Due Date: ${task.dueDate}</p>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
            `;
            taskList.appendChild(taskCard);
        });
    }

    window.editTask = (id) => {
        const task = tasks.find(t => t.id == id);
        openModal(task);
    }
});
