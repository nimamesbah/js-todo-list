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
        <li id="${item.id}" style="color:red">
            <input onchange="handleChangeCheckbox(this,${item.id})" type="checkbox" ${item.isDone ? "checked" : ""} />
            ${item.id === editableitemId ? `<input id="editInput" value="${item.title}" />` : `<span>${item.title}</span>`}
            <button onclick="deleteItem(${item.id})">delete</button>
            ${item.id === editableitemId ? `<button onclick="saveEdit()">save</button>` : `<button onclick="editItem(${item.id})">edit</button>`}
            
        </li>
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