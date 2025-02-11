// DOM nodes
const input = document.getElementById("todo-input");
const btn = document.getElementById("submit-button");
const root = document.getElementById("root");
const delAllBtn = document.getElementById("delAllBtn")

const todosData = JSON.parse(localStorage.getItem("todos"))



const todos = todosData || [];
let editableitemId = null;

function handleAddTodo(element) {
    element.classList.add("scale-110")
    setTimeout(()=> element.classList.remove("scale-110"),50)
// debugger
    const inputVal = input.value;

    if (inputVal.match(/[A-Za-z]/g) !== null) {
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
    input.value = ""
}

function renderTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

    const template = todos.map(item => {
        return `
        <div class="${!item.isDone ? `bg-[#F0F8FF]` : `bg-[#C0C0C0]` } w-[550px] duration-100 min-h-12 relative hover:border flex gap-3 items-center rounded-xl px-2" id="${item.id}">
            <input class="" onchange="handleChangeCheckbox(this,${item.id})" type="checkbox" ${item.isDone ? "checked" : ""} />
            ${item.id === editableitemId ? `<input class="w-[300px] border bg-amber-50 rounded-sm px-1.5 grow-[2]" id="editInput" value="${item.title}" maxlength="45" />` : `<span class="grow-[2]">${item.title}</span>`}
            <div onclick="deleteItem(${item.id})"><img class="w-5 cursor-pointer" src="/delete-svgrepo-com.svg" alt=""></div>
            ${item.id === editableitemId ? `<div onclick="saveEdit()"><img class="w-5 cursor-pointer" src="/save-svgrepo-com(1).svg" alt="">
            </div>` : `<div onclick="editItem(${item.id})"><img class="w-5 cursor-pointer" src="/edit-svgrepo-com.svg" alt=""></div>`}
            <div id="confirm${item.id}" class="bg-transparent opacity-0 duration-300 absolute right-5 -z-10 flex gap-2.5">
                <img onclick="delDecline(this)" class="cursor-pointer rounded-full w-5 bg-red-400" src="/no-svgrepo-com.svg" alt="">
                <img onclick="deleteItemConfirm(${item.id})" class="cursor-pointer rounded-full bg-green-300 w-5" src="/tick-svgrepo-com.svg" alt="">
            </div>
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
function deleteAll(element){
    
    element.classList.add("scale-110")
    setTimeout(()=> element.classList.remove("scale-110"),50)
    if(todos.length!==0)
    document.getElementById("toast").classList.toggle("translate-x-50")
    if(!document.getElementById("toast").classList.contains("translate-x-50"))
    setTimeout(()=> document.getElementById("toast").classList.add("translate-x-50") ,5000)
    
}
function deleteAllConfirm(){
    const nodes =document.querySelectorAll("#root > div")
    document.getElementById("toast").classList.toggle("translate-x-50")

    console.log("nodes",nodes)
    if(nodes !== null){
        for (const node of nodes) {
            node.classList.add("opacity-0")
            
        }

    }
    todos.splice(0,todos.length)
    setTimeout(renderTodos,150) 
}
function delDecline(element){
    element.parentElement.classList.toggle("translate-x-20")
    element.parentElement.classList.toggle("-z-10")
    element.parentElement.classList.toggle("opacity-0")

}


function deleteItem(itemId) {
    document.getElementById(`confirm${itemId}`).classList.toggle("translate-x-20")
    document.getElementById(`confirm${itemId}`).classList.toggle("-z-10")
    document.getElementById(`confirm${itemId}`).classList.toggle("opacity-0")


}
function deleteItemConfirm(itemId){
    document.getElementById(`${itemId}`).classList.add("translate-x-[-600px]")
    console.log(document.getElementById(`${itemId}`))
    const foundIndex = todos.findIndex(item => item.id === itemId);

    todos.splice(foundIndex, 1);

    setTimeout(renderTodos,200);
}

function handleKeyPress(evt) {
    if (evt.key === "Enter") {
        handleAddTodo();
    }
}

input.addEventListener("keypress", handleKeyPress)