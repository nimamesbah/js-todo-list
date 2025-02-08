// DOM nodes
const input = document.getElementById("todo-input");
const btn = document.getElementById("submit-button");
const root = document.getElementById("root");

const todosData = JSON.parse(localStorage.getItem("todos"))



const todos = todosData || [];
let editableitemId = null;

function handleAddTodo() {

    const inputVal = input.value;

    if (inputVal) {
        // let newId = 1;

        // if(todos.length > 0) {
        //     newId = todos.at(-1).id + 1
        // }

        const newTodo = {
            id: todos.length > 0 ? todos.at(-1).id + 1 : 1,
            title: inputVal,
            isDone: false
        }

        todos.push(newTodo)
        input.value = ""
        renderTodos()
    }
}

function renderTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

    const template = todos.map(item => {
        return `
        <div class="${!item.isDone ? `bg-[#F0F8FF]` : `bg-[#C0C0C0]` } w-[550px] duration-200 h-12 flex gap-3 items-center rounded-xl px-2" id="${item.id}">
            <input class="" onchange="handleChangeCheckbox(this,${item.id})" type="checkbox" ${item.isDone ? "checked" : ""} />
            ${item.id === editableitemId ? `<input class="w-[300px] border bg-amber-50 rounded-sm px-1.5" id="editInput" value="${item.title}" maxlength="45" />` : `<span class="grow-[2]">${item.title}</span>`}
            <div onclick="deleteItem(${item.id})"><img class="w-5" src="/delete-svgrepo-com.svg" alt=""></div>
            ${item.id === editableitemId ? `<div onclick="saveEdit()"><img class="w-5" src="/save-svgrepo-com(1).svg" alt="">
            </div>` : `<div onclick="editItem(${item.id})"><img class="w-5" src="/edit-svgrepo-com.svg" alt=""></div>`}
            
        </div>
        `
    })

    const temp = template.join("")

    root.innerHTML = temp
}

renderTodos()

function handleChangeCheckbox(element, id) {
    const foundIndex = todos.findIndex(item => item.id === id);

    todos[foundIndex].isDone = element.checked;
    
    renderTodos();
}

function saveEdit() {
    const editInputValue = document.getElementById("editInput").value;

    if (editInputValue) {
        const foundIndex = todos.findIndex(item => item.id === editableitemId);
        todos[foundIndex].title = editInputValue;
    }

    editableitemId = null;

    renderTodos();

}

function editItem(id) {
    editableitemId = id;
    renderTodos();
}


function deleteItem(itemId) {
    const foundIndex = todos.findIndex(item => item.id === itemId);

    todos.splice(foundIndex, 1);

    renderTodos();

}

function handleKeyPress(evt) {
    if (evt.key === "Enter") {
        handleAddTodo();
    }
}

input.addEventListener("keypress", handleKeyPress)