// Tüm elementler
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todolist = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // event listener atamaq
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keydown",filterTodos);
    clearButton.addEventListener("click",function(){
        return clearAllTodos();
    });
}
function buttonController(trueorfalse){
    const truebutton = document.createElement("button");
    const falsebutton = document.createElement("button");
    truebutton.className = "btn btn-success";
    truebutton.textContent = "Onayla";
    falsebutton.className = "btn btn-danger";
    falsebutton.textContent = "Onaylama";
    falsebutton.setAttribute("style","margin-left: 10px;")
    secondCardBody.appendChild(truebutton);
    secondCardBody.appendChild(falsebutton);

    truebutton.onclick=function(){
        while(todolist.firstElementChild != null){
            todolist.removeChild(todolist.firstElementChild);
        }
        localStorage.removeItem("todos");
        truebutton.style.display = "none";
        falsebutton.style.display = "none";
        clearButton.style.display = "inline";
        secondCardBody.appendChild(clearButton);
    }
    falsebutton.onclick=function(){
        truebutton.style.display = "none";
        falsebutton.style.display = "none";
        clearButton.style.display = "inline";
        secondCardBody.appendChild(clearButton);
    }

}
function clearAllTodos(e){
    clearButton.remove();
    buttonController();
    
}

function filterTodos(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filtervalue) === -1 ){
            listItem.setAttribute("style","display:none !important ");

        }
        else{
            listItem.setAttribute("style","display : block !important ");
        }

    });

}
function deleteTodo(e){
    if(e.target.className === "fas fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert('warning',"Todo silindi..")
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1); // array'den değeri siliyoruz.
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if(newTodo == ""){
        console.log("Olamaz!! Todo Boş!")
        showAlert("danger","Lütfen bir Todo girin!!");
    }
    else if(getTodosFromStorage().indexOf(newTodo)===-1){
        console.log("Todo Eklendi new todo: " + newTodo);
        addTodoToStorage(newTodo)
        addTodoToUI(newTodo);
        showAlert("success","Todo girişi başarılı!");
    }
    else{
        showAlert("warning","Böyle bir todo var");
    }
    e.preventDefault();
}

function addTodoToUI(newTodo){// string değerini list item olarak ekleyecek
    // List item oluşturma
    const listItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML =  "<i class = 'fas fa-remove'></i>";
    // 
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    // Todo list'e list item ekleme
    todolist.appendChild(listItem);
    listItem.appendChild(link);
    todoInput.value = "";
}

function getTodosFromStorage(){ // Storage Todoları alacakq
    let todos;

    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){

//     <div class="alert alert-danger" role="alert">
//   This is a danger alert—check it out!
// </div>
    const alert = document.createElement("div");
    alert.className =`alert alert-${type}`;
    alert.textContent = message;
    

    firstCardBody.appendChild(alert);

   //settimeout
    setTimeout(function(){
        alert.remove();
    },2000);
}