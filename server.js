const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [];
let taskId = 1;

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Get a specific task
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');
    res.json(task);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const newTask = {
        id: taskId++,
        title,
        description,
        status,
        dueDate
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found.');

    const { title, description, status, dueDate } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    res.json(task);
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found.');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
