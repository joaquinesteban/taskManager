import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

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
                    <span class="delete-button">❌</span> 
                    <span class="edit-btn">✏️</span> 
                </li> 
            </ul> 
        </div> 
    </div> 
   
  </div>
`

setupCounter(document.querySelector('#counter'))
