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

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit',(event)=>{
    event.preventDefault()
     
    const taskInput = document.getElementById('task-input');

    const task = taskInput.value;
    console.log(task);

    taskList.innerHTML.task

    if(task){
        taskList.append(createTaskElement(task));
        taskInput.value = " ";
    }

    function createTaskElement(task){
        const li = document.createElement('li');
        li.textContent = task;
        li.append(createButton('❌', 'delete-btn'), createButton('✏️','edit-btn'));
        return li;
    }

    function createButton(text, className){
        const btn = document.createElement('span');
        btn.textContent = text;
        btn.className = className;
        return btn;
    }
})
    
taskList.addEventListener('click', (event)=>{
    if(event.target.classList.contains('delete-btn')) {
        deleteTask(event.target.parentElement)
    }
})


function deleteTask(taskitem) {
    if(confirm('Estas segura/seguro de borrar este recordatorio?')){
        taskitem.remove();
    }
}
