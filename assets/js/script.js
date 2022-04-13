//define ui variables
const form      = document.querySelector("#taskForm");
const taskList  = document.querySelector(".collection");
const clearBtn  = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");
const filter    = document.querySelector("#filter");


//load event listeners
loadEventListeners();


function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getTasksFromLs);
    form.addEventListener("submit", addTask);
    taskList.addEventListener("click", removeTask);
    clearBtn.addEventListener("click", clearTasks);
    filter.addEventListener('keyup', filterTasks);
}


function createList(text){
    
    //create 
    const li = document.createElement("li");
    li.className = 'collection-item';
    //create text node and append
    li.appendChild(document.createTextNode(text));
    
    //create new link element
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i>&times;</i>";
    li.appendChild(link);
    taskList.appendChild(li);
}


function addTask(e){
    e.preventDefault();

    if(taskInput.value == ''){
        alert('Add a task');
    }

    //create list
    createList(taskInput.value);

    storeTaskInLS(taskInput.value);

    taskInput.value = '';
}


function storeTaskInLS(task){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function getTasksFromLs(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task){
        createList(task);
    });
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLS(
                e.target.parentElement.parentElement
                );
        }
    }
}


function removeTaskFromLS(taskItem){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index){
        let string = taskItem.textContent
        string = string.substring(0, string.length - 1);
        if(string === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function clearTasks(){

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLS();

}


function clearTasksFromLS(){
    localStorage.clear();
}



function filterTasks(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
            console.log("failed");
        }
    });

}