document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api/tasks';

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

    taskForm.onsubmit = async (event) => {
        event.preventDefault();
        const id = document.getElementById('taskId').value;
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const status = document.getElementById('taskStatus').value;
        const dueDate = document.getElementById('taskDueDate').value;

        const taskData = { title, description, status, dueDate };

        if (id) {
            // Edit existing task
            await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
        } else {
            // Add new task
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskData)
            });
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

    async function renderTasks() {
        taskList.innerHTML = '';
        const response = await fetch(apiUrl);
        const tasks = await response.json();

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
        fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(task => openModal(task));
    }

    renderTasks();
});
