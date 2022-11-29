
const todoInput = document.querySelector(".todo-input");
const todoAddBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const icon = document.querySelector(".fa-square-plus");
const todoFilter = document.querySelector(".todo-filter");
const clearBtn = document.querySelector(".clearAll");



todoAddBtn.addEventListener("click" , addTodo);
window.addEventListener("keyup" , trunOnOff ) ; 
todoList.addEventListener("click" , deleteAndCheckTodo) ;
todoFilter.addEventListener("click" , filterTodo);
document.addEventListener("DOMContentLoaded" , getTodo);
clearBtn.addEventListener("click" , btnClear);




function addTodo (event) {

    event.preventDefault();

    if (todoInput.value === ""){
        alert("کاری که باید انجام شود را وارد کنید");
        return;
    }

    const newDiv = document.createElement("div");
    newDiv.classList.add("used");

    todoList.appendChild(newDiv);

    const input = document.createElement("input");
    input.value = todoInput.value ;
    input.readOnly = true ;
    

    newDiv.appendChild(input);


    const newDiv2 = document.createElement("div");
    newDiv2.classList.add("btns");

    newDiv.appendChild(newDiv2);

    const complateBtn = document.createElement("button");
    complateBtn.classList.add("complated-btn");
    complateBtn.classList.add("before");
    complateBtn.innerHTML = "<i class='fas fa-check'></i>" ;

    newDiv2.appendChild(complateBtn);

    const editeBtn = document.createElement("button");
    editeBtn.classList.add("edite-btn");
    editeBtn.classList.add("before");
    editeBtn.innerHTML = "<i class='fa-solid fa-pen-clip'></i>" ;

    newDiv2.appendChild(editeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.classList.add("before");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>" ;

    newDiv2.appendChild(trashBtn);

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("save");
    saveBtn.innerText = "Save" ;

    newDiv2.appendChild(saveBtn);
    saveBtn.style.display = "none" ;


    saveTodos(todoInput.value);
    todoInput.value = "" ;

    trunOnOff();
    todoInput.focus();

}


function trunOnOff (){

    if (todoInput.value !== ""){

        todoAddBtn.style.backgroundColor = "#ffd000" ;
        icon.style.transform = "rotateZ(-10deg)"; 
    } 
    else{
        
        todoAddBtn.style.backgroundColor = "#ffd0004a" ;
        icon.style.transform = "rotateZ(0deg)";
        
    } 

}




function deleteAndCheckTodo(event){

   const item = event.target ;

   if (item.classList.contains("trash-btn")){

        const todo = item.parentElement.parentElement ;
        todo.remove();

        removeTodos(todo);
   }
   else if (item.classList.contains("complated-btn")) {
        
        const todo = item.parentElement.parentElement ;

        if (todo.classList.contains("complated")) {

            todo.classList.remove("complated");
            todo.childNodes[1].childNodes[0].innerHTML = "<i class='fas fa-check'></i>" ;
            removeClass(todo.childNodes[0].value);
        }
        else{

            todo.classList.add("complated");
            todo.childNodes[1].childNodes[0].innerHTML = "<i class='fa-solid fa-rotate-left'></i>" ;
            saveClass(todo.childNodes[0].value);
        }

   }
   else if (item.classList.contains("edite-btn")) {

    const todo = item.parentElement.parentElement ;
    editeEvent(todo.childNodes[0]);


   }

}



function editeEvent(tag){

    const textin = tag.value;

    tag.readOnly = false;
    tag.style.backgroundColor = "rgba(255, 255, 255, 0.600)";
    tag.style.padding = "5px 0" ;
    tag.style.borderRadius = "8px" ;
    tag.focus();

    const x = tag.parentElement ;
    const x2 = x.childNodes[1];

    const dokme = x2.querySelectorAll(".before");
    for (let i of dokme){

        i.style.display = "none";
    }


    const saveDokme =  x2.querySelector(".save");
    saveDokme.style.display = "block";

    saveDokme.addEventListener("click" , function(){

        if (tag.value === ""){

            alert("فیلد شما خالی است لطفا چیزی بنویسید.");
            tag.focus();
            return;
        }

        let todos ;
        if (localStorage.getItem("todos") === null) todos=[];
        else todos = JSON.parse(localStorage.getItem("todos"));

        let clasi ;
        if(localStorage.getItem("className") === null) clasi = [];
        else clasi = JSON.parse(localStorage.getItem("className"));

        const count1 = todos.indexOf(textin); 
        const count2 = clasi.indexOf(textin); 

        todos[count1] = tag.value ;
        clasi[count2] = tag.value ;

        localStorage.setItem("todos" , JSON.stringify(todos));
        localStorage.setItem("className" , JSON.stringify(clasi));



        tag.readOnly = true;
        tag.style.backgroundColor = "rgba(255, 255, 255, 0)";
        tag.style.padding = "0" ;
        tag.style.borderRadius = "0" ;

        saveDokme.style.display = "none";

        for (let i of dokme){

            i.style.display = "inline-block";
        }

        todoInput.focus();
        
        
    })
    


}













// do tabe baraye save va delete kardan todo haee ke kelase complated darand
function saveClass(clas) {

        let classs ;
        if (localStorage.getItem("className") === null) classs = [];
        else classs = JSON.parse(localStorage.getItem("className"));

        classs.push(clas);
        localStorage.setItem("className" , JSON.stringify(classs));
}

function removeClass(clas) {

        let classs ;
        if (localStorage.getItem("className") === null) classs = [];
        else classs = JSON.parse(localStorage.getItem("className"));

        const x = classs.indexOf(clas);
        classs.splice(x , 1);

        localStorage.setItem("className" ,JSON.stringify(classs));

}










function filterTodo(event){

    const todos = todoList.childNodes;
    todos.forEach(function(item){

       
        switch(event.target.value){

            case "all" : 

                         item.style.display = "flex";
                         break ;

            case "complated" :

                        if(item.classList.contains("complated")) item.style.display = "flex" ;
                        else item.style.display = "none";
                        break;

            case "uncomplated" :

                        if(item.classList.contains("complated")) item.style.display = "none";
                        else item.style.display = "flex";
                        break;

        }

        

    })

   
}


function saveTodos(todo){

    let todos ;

    if (localStorage.getItem("todos")=== null) todos = [];
    else todos = JSON.parse( localStorage.getItem("todos"));

    todos.push(todo) ;
    localStorage.setItem("todos" , JSON.stringify(todos));
}


function removeTodos(todo){

    let todos;
    if(localStorage.getItem("todos") === null) todos = [];
    else todos = JSON.parse(localStorage.getItem("todos"));

    const index = todo.childNodes[0].innerText;
    const index2 = todos.indexOf(index);
    todos.splice(index2 , 1);

    localStorage.setItem("todos" ,JSON.stringify(todos));
}



function btnClear (event) {
    
    let todos ;
    if (localStorage.getItem("todos") === null) todos = []; 
    else todos = JSON.parse(localStorage.getItem("todos"));

    if (todos.length === 0){

        alert("چیزی در لیست برای پاک شدن وجود ندارد.");
        return;
    } 

    const res = confirm("میخواهید کل لیست را پاک کنید ؟") ;

    if(res === true) {

        for (let i = todoList.children.length-1 ; i >= 0 ; i--){

            todoList.children[i].remove();

        }

        localStorage.removeItem("todos");
        localStorage.removeItem("className");

       
    }

    todoInput.focus();

    
}







function getTodo(){

    todoInput.focus();

    let todos ;
    if (localStorage.getItem("todos") === null) todos = [];
    else todos = JSON.parse(localStorage.getItem("todos"));

    todos.forEach(function(item){
       
    const newDiv = document.createElement("div");
    newDiv.classList.add("used");

    todoList.appendChild(newDiv);

    const input = document.createElement("input");
    input.value = item ;
    input.readOnly = true ;
    

    newDiv.appendChild(input);

    const complateBtn = document.createElement("button");
    complateBtn.innerHTML = "<i class='fas fa-check'></i>" ;
    //baraye barresi complated shodan yek todo bad az reload page
    let classcheck ;
    if (localStorage.getItem("className") === null) classcheck =[];
    else  classcheck =  JSON.parse(localStorage.getItem("className")) ;


    for (let i of classcheck) {

        if (item === i){

            newDiv.classList.add("complated");
            complateBtn.innerHTML = "<i class='fa-solid fa-rotate-left'></i>" ;
            
        }
    }

    //ta inja



    const newDiv2 = document.createElement("div");
    newDiv2.classList.add("btns");

    newDiv.appendChild(newDiv2);

   
    complateBtn.classList.add("complated-btn");
    complateBtn.classList.add("before");
   

    newDiv2.appendChild(complateBtn);

    const editeBtn = document.createElement("button");
    editeBtn.classList.add("edite-btn");
    editeBtn.classList.add("before");

    editeBtn.innerHTML = "<i class='fa-solid fa-pen-clip'></i>" ;

    newDiv2.appendChild(editeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.classList.add("before");

    trashBtn.innerHTML = "<i class='fas fa-trash'></i>" ;

    const saveBtn = document.createElement("button");
    saveBtn.classList.add("save");
    saveBtn.innerText = "Save" ;

    newDiv2.appendChild(saveBtn);
    saveBtn.style.display = "none" ;

    newDiv2.appendChild(trashBtn);

    

    })

}
