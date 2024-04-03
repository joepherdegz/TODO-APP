import { getTodos, addTodo, deleteTodo, updateTodo } from "./api.js";

const addBtnEl = document.getElementById("addBtn");
const myUL = document.getElementById("myUL");
const myInput = document.getElementById("myInput");
let currentId = 1;

 
function addCloseBtn(li) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
}

function createLi(text, isDone = false, id = currentId) {
    let li = document.createElement("li"); //<li></li>
    li.innerText = text;
    li.dataset.id = id;
    myUL.appendChild(li);
    if (isDone) li.className = "checked";
    addCloseBtn(li);
}

function fillTodoList() {
    getTodos().then((todos) => {
        todos.forEach(({ text, isDone, id }) => createLi(text, isDone, id));
        return todos;
    })
        .then(todos => {
            currentId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
    });
}

addBtnEl.addEventListener('click', () => {
    let todo = myInput.value.trim();
    if (todo === "") {
        alert("Type a todo");
        return; 
    }
    createLi(todo);

    let todoObj = {
        text: todo,
        isDone: false,
        id: currentId,
    };
    addTodo(todoObj);
})
//event listener
// document.addEventListener("click", (e) => {
//     if (e.target.tagName === 'SPAN' && e.target.getAttribute('class') === 'close') {
//         let todoId = e.target.parentElement.getAttribute('data-id');
//         deleteTodo(todoId);
//     }
// });
myUL.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        updateTodo(e.target.dataset.id, e.target.classList.contains("checked"));
        e.target.classList.toggle("checked");
    }
    if (e.target.getAttribute("class") === "close") {
        if(confirm("Are you sure you want to delete this todo?"))
        e.target.parentNode.remove();
        deleteTodo(e.target.parentElement.getAttribute("data-id"))
    }
    return; 
})

window.addEventListener('DOMContentLoaded', fillTodoList) 