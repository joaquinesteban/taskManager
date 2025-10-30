import './style.css'


document.querySelector('#app').innerHTML = `
  <div>
    <div class="container"> 
        <div class="theme-toggle"> 
            <button class="btn liquid" id="toggle-theme-btn">Toggle-theme</button> 
        </div> 
        <div class="task-manager"> 
            <h1>Task Manager</h1> 
            <form id="task-form"> 
                <input type="text" id="task-input" placeholder="Enter new task" required> 
                <button class='button-press' type="submit">Add Task</button> 
            </form> 
            <ul id="task-list"> 
                <li>Task Content 
                    <span class="delete-btn">❌</span> 
                    <span class="edit-btn">✏️</span> 
                </li> 
            </ul> 
        </div> 
    </div> 
   
  </div>
`

// const taskForm = document.getElementById('task-form');
// const taskList = document.getElementById('task-list');


// taskForm.addEventListener('submit',(event)=>{
//     event.preventDefault()
     

//     const taskInput = document.getElementById('task-input');

//     const task = taskInput.value;
//     console.log(task);

//     taskList.innerHTML.task

//     if(task){
//         taskList.append(createTaskElement(task));
//         storeTaskInLocalStorage(task);
//         taskInput.value = " ";
//     }

//     function createTaskElement(task){
//         const li = document.createElement('li');
//         li.textContent = task;
//         li.append(createButton('❌', 'delete-btn'), createButton('✏️','edit-btn'));
//         return li;
//     }

//     function createButton(text, className){
//         const btn = document.createElement('span');
//         btn.textContent = text;
//         btn.className = className;
//         return btn;
//     }
// })



//     //Boton de borrar lista
// taskList.addEventListener('click', (event)=>{
//     if(event.target.classList.contains('delete-btn')) {
//         deleteTask(event.target.parentElement)
//     }else if( event.target.classList.contains('edit-btn')){
//         editTask(event.target.parentElement);
//     }
// })


// function deleteTask(taskitem) {
//     if(confirm('Estas segura/seguro de borrar este recordatorio?')){
//         taskitem.remove();
//     }
// }

// // boton de editar lista

// function editTask(taskItem){
//     const newTask = prompt('Edita la Tarea', taskItem.firstChild.textContent);
//     if(newTask != null){
//         taskItem.firstChild.textContent = newTask;

//     }
// }


// //LocalStorage para que las tareas persistan en la pagina web
// function storeTaskInLocalStorage(task){
//     const tasks = JSON.parse(localStorage.getItem('task') || "[]");

//     tasks.push(task);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }



// function loadTasks() {
//   const tasks = JSON.parse(localStorage.getItem('tasks') || '[ ]');
//   tasks.forEach((task) => {
//     taskList.appendChild(createTaskElement(task));
//   })
// }


const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// --- Helpers (declaradas en scope global) ---
function createButton(text, className) {
  const btn = document.createElement('span');
  btn.textContent = text;
  btn.className = className;
  return btn;
}

function createTaskElement(task) {
  const li = document.createElement('li');
  // Usamos textContent para no inyectar HTML por accidente
  li.textContent = task;
  // agregamos botones
  li.append(createButton('❌', 'delete-btn'), createButton('✏️', 'edit-btn'));
  return li;
}

function storeTaskInLocalStorage(task) {
  // clave 'tasks' consistente, y JSON.parse correcto
  const tasks = JSON.parse(localStorage.getItem('tasks') || "[]");
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach((task) => {
    taskList.appendChild(createTaskElement(task));
  });
}

function deleteTask(taskItem) {
  if (confirm('¿Estás seguro/a de borrar este recordatorio?')) {
    // remover del DOM
    const text = taskItem.firstChild.textContent;
    taskItem.remove();
    // también lo removemos del localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks = tasks.filter(t => t !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function editTask(taskItem) {
  const currentText = taskItem.firstChild.textContent;
  const newTask = prompt('Edita la Tarea', currentText);
  if (newTask !== null) {
    // actualizar en el DOM
    taskItem.firstChild.textContent = newTask;
    // actualizar en localStorage (reemplazando la primera coincidencia)
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tasks.indexOf(currentText);
    if (index !== -1) {
      tasks[index] = newTask;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      
    }
    updateLocalStorage()
  }
}

// --- Eventos ---
loadTasks(); // ahora las funciones ya están definidas

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskInput = document.getElementById('task-input');
  const task = taskInput.value.trim();

  if (task) {
    taskList.appendChild(createTaskElement(task));
    storeTaskInLocalStorage(task);
    taskInput.value = ''; // limpiar input
    taskInput.focus();
  }
});

// Delegación para borrar/editar
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    deleteTask(event.target.parentElement);
  } else if (event.target.classList.contains('edit-btn')) {
    editTask(event.target.parentElement);
  }
});


function updateLocalStorage(){
   const tasks = Array.from(taskList.querySelectorAll('li')).map((li) => li.firstChild.textContent);
   localStorage.setItem('task',JSON.stringify(tasks));
    console.log(tasks)
}

const  themeToggleButton = document.getElementById('toggle-theme-btn');

const currentTheme = localStorage.getItem('theme');

themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  const theme = document.body.classList.contains('dark-theme') 
  ? 'dark' : 'light';
  
  localStorage.setItem('theme', theme);
  console.log(themeToggleButton)
})

if(currentTheme === 'dark'){
  document.body.classList.add('dark-theme');
}