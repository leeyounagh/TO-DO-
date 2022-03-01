let taskInput =document.getElementById("task-input");
let addButton=document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");


let taskList =[];
let mode ="all";
let filterList = [];
addButton.addEventListener("mousedown",addTask);
taskInput.addEventListener("keyup",function(e) {
    if (e.keyCode === 13) {
        addTask(e);
    }
});

for(let i=1;i<tabs.length;i++){
       tabs[i].addEventListener("click",function(e){filter(e)})
       filter();
};
console.log(tabs);

function addTask() {
    let _taskContent = taskInput.value;
    let task ={
     id:randomIdGenerate(),
     taskContent:_taskContent,
     isComplete:false

    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render(){
    let list =[];
    if(mode == "all"){
        list =taskList;
    }else{
       list =filterList;
    }
    let resultHtml ="";
       for(let i = 0; i <list.length;i++){

        if(list[i].isComplete ==true){
            resultHtml+=
            `<div class="task">
            <div class="task-done" id= "${list[i].id}">${list[i].taskContent}</div>
            
            <div>
            <button onclick="toggleComplete('${list[i].id}')"  class="button-impact"><i class="fa-solid fa-check button-color"></i></button>
              <button onclick="deleteTask('${list[i].id}')"  class="trash-impact"></button>
            </div>
          </div>`
        }
        else{
            resultHtml +=
            `<div class="task" id= "${list[i].id}">
            <div>${list[i].taskContent}</div>
        
            <div>
              <button onclick="toggleComplete('${list[i].id}')" class="button-impact"><i class="fa-solid fa-check "></i></button>
              <button onclick="deleteTask('${list[i].id}')" class="trash-impact"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>`;
        }
          
       }
       
         

      document.getElementById("task-board").innerHTML = resultHtml;
}

function toggleComplete(id){
  
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete =!taskList[i].isComplete;
            break;
        }
    }
    filter();
    console.log(taskList);
}

function deleteTask(id){
    for(let i=0; i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1)
            break;
        }
    }
    filter();
}

function filter(e){
        
        mode=e.target.id;
   
        underLine.style.left = e.currentTarget.offsetLeft+ "px";
        underLine.style.width = e.currentTarget.offsetWidth+ "px";
        underLine.style.top = e.offsetTop+e.currentTarget.offsetHeight+ "px";
        filterList = [];
    
        if(mode == "all"){
           
        }else if(mode =="ongoing"){
            for(let i =0; i<taskList.length;i++){
                if(taskList[i].isComplete == false){
                    filterList.push(taskList[i]);
                }
               
            }
           
        } else if (mode == "done"){
            for(let i =0; i <taskList.length;i++){
                if(taskList[i].isComplete ==true){
                    filterList.push(taskList[i]);
                }
            }
            
           
        }
        else{
            console.log("as");
        }
        render();

   
    }
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
