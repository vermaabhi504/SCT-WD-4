const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const taskList = document.getElementById('task-list');

let tasks = []; // This array will store all the tasks.

function renderTasks() {
  taskList.innerHTML = ''; // Clear the list before re-rendering.

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');
    if (task.completed) taskDiv.classList.add('completed');

    taskDiv.innerHTML = `
      <span>
        <strong>${task.text}</strong><br>
        <small>Due: ${task.dueDate}</small>
      </span>
      <div>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
        <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

// Add new task
addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    dueDate: dueDate || 'No due date',
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  dueDateInput.value = '';

  renderTasks();
});

// Toggle task completion
function toggleComplete(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Edit task
function editTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    const newText = prompt('Edit task:', task.text);
    if (newText) {
      task.text = newText;
      renderTasks();
    }
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Initial render of tasks
renderTasks();