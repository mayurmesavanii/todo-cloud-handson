let tasks = [];
let currentFilter = 'all';

// 🔁 Load tasks from backend
async function loadTasksFromServer() {
  try {
    const res = await fetch('/api/tasks');
    tasks = await res.json();
    renderTasks();
  } catch (err) {
    console.error('Failed to load tasks:', err);
  }
}

// 🆕 Add new task
async function addTask(title) {
  try {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    await loadTasksFromServer();
  } catch (err) {
    console.error('Failed to add task:', err);
  }
}

// ✅ Toggle completion
async function toggleComplete(id, completed) {
  try {
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    await loadTasksFromServer();
  } catch (err) {
    console.error('Failed to update task:', err);
  }
}

// ❌ Delete task
async function deleteTask(id) {
  try {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    await loadTasksFromServer();
  } catch (err) {
    console.error('Failed to delete task:', err);
  }
}

// 💣 Clear all tasks
async function clearAllTasks() {
  try {
    const deletions = tasks.map(task =>
      fetch(`/api/tasks/${task._id}`, { method: 'DELETE' })
    );
    await Promise.all(deletions);
    await loadTasksFromServer();
  } catch (err) {
    console.error('Failed to clear tasks:', err);
  }
}

// 🎨 Render tasks in UI
function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'active') return !task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
      <div class="action-btns">
        <button onclick="toggleComplete('${task._id}', ${!task.completed})" title="Mark Complete">✅</button>
        <button onclick="deleteTask('${task._id}')" title="Delete">❌</button>
      </div>
    `;
    list.appendChild(li);
  });

  document.getElementById('task-count').innerText =
    `${filteredTasks.length} task${filteredTasks.length !== 1 ? 's' : ''}`;

  document.querySelectorAll('.filters button').forEach(btn =>
    btn.classList.remove('active')
  );
  document.getElementById(`filter-${currentFilter}`).classList.add('active');
}

// 🧠 Handle form submit
document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.getElementById('task-input');
  if (input.value.trim()) {
    addTask(input.value.trim());
    input.value = '';
  }
});

// 🔍 Filter buttons
function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

// 🚀 Initial load
loadTasksFromServer();
