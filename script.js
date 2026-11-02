const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const xpBar = document.getElementById('xp-bar');
const healthBar = document.getElementById('health-bar');
const pixelPet = document.getElementById('pixel-pet');

let xp = parseInt (localStorage.getItem('pet_xp')) || 20;
let health = parseInt(localStorage.getItem('pet_health')) || 80;
let tasks = JSON.parse(localStorage.getItem('pet_tasks')) || [];

function updateDOM() {
    xpBar.style.width = xp + '%';
    healthBar.style.width = health + '%';

    if (health < 40) {
        pixelPet.classList.remove('happy');
        pixelPet.classList.add('sad');
    }  else {
        pixelPet.classList.remove('sad');
    }

    localStorage.setItem('pet_xp',xp);
    localStorage.setItem('pet_health', health);
    localStorage.setItem('pet_tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = '';
    tasks.forEach((task,index) => {
        const li = document.createElement('li');
        li.innerHTML = 
         '<span> '+ task.text + '</span><button onclick="completeTask('+ index +')" style= "background:#00e676;border:none;padding:5px 10px; booder-radius:5px;cursor:pointerfont-weight:bold; style="position:relative;z-index:9999">Done</button>';
 
        taskList.appendChild(li);
    });
    updateDOM();
}

addBtn.addEventListener('click' , () => {

   console.log("1. Click trigger ho gya");
  
   const directInput = document.querySelector('#task-input');
   console.log("Direct Input Value:" , directInput.value)

    const text = taskInput.value.trim();
    console.log("2. Input text hai:" ,text);

    if (text !== '') {
        console.log("3.If condition ke andr  enter");
        tasks.push ({text: text});
        directInputInput.value = '';
        renderTasks();
    } else {
        console.log("4.input khali tha iss liay aagy nhi gya ");
    }
})

window.addTask = function () {
    const text = taskInput.value.trim();
    if (text !== '') {
         tasks.push ({text: text});
        taskInput.value = '';
        renderTasks();
    }
}

window.completeTask = function (index) {
    tasks.splice(index,1);

    xp += 20 ;
    if (xp >= 100) {
        xp = 0 ; 
        alert("\u{1F389} \u{1F973} Your Pixel Pet Leveled Up! \u{2728}");
    }
    if (health < 100) health += 100; 

    pixelPet.classList.remove('sad');
    pixelPet.classList.add('happy');

    setTimeout(() => {
        pixelPet.classList.remove('happy');
    }, 2000);
        
renderTasks();
};

renderTasks();

setInterval(function() {
    health = health -5 ;
    if (health < 0) {
        health =0;
    }
    updateDOM();
}, 4000);

 
