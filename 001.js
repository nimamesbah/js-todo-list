
const input = document.getElementById("todo-input");
const btn = document.getElementById("submit-button");
const root = document.getElementById("root");
let count=0;

const todos = []
btn.addEventListener("click",handleAddTodo)

function handleAddTodo() {
    const inputVal = input.value
    if(inputVal!==""){
        todos.push(inputVal)

    }
    input.value=""

    return renderTodos() 


}


function renderTodos() {
    count=0
    const template = todos.map(item => {
        return `
        <li id="${item}" style="color:red">
            <span>
            ${item}
            </span>
            <button  onclick="deleteItem(this)">delete</button>
            <button  onclick="editItem(this)">edit</button>
        </li>
        `
    })

    const temp = template.join("")

    root.innerHTML = temp
}


function deleteItem(clickedElement) {
    count=0
    unFreezAddTodo()
    // debugger
    clickedElement.parentElement.remove()
    console.log(clickedElement.parentElement)
    for (let i=0;i<todos.length;i++) {
        if(todos[i]===clickedElement.parentElement.id){
            todos.splice(i,1)
    }
        }
}
function editItem(clickedElement){
    count++
    freezAddTodo()
    
    if(count===1){
        let submitBtn=document.createElement("button")
        let editInput=document.createElement("input")
        editInput.getAttribute("type","text")
        editInput.getAttribute("value")
        editInput.id="editInput"
        submitBtn.innerText="change"
        submitBtn.id="editBtn"
        editInput.placeholder="press change if refuse!"
        clickedElement.parentElement.appendChild(editInput)
        clickedElement.parentElement.appendChild(submitBtn)
        submitBtn.addEventListener("click",()=>{
            if(editInput.value===""){
                editInput.remove()
                submitBtn.remove()
                count=0

            }
            if(editInput.value!==""){
                // debugger
                for (let i=0;i<todos.length;i++){
                    if(todos[i]===clickedElement.parentElement.id){
                        todos.splice(i,1,editInput.value)
                        editInput.remove()
                        submitBtn.remove()
                        renderTodos()
                        count=0
                    }
                }
            }
        
   unFreezAddTodo()
 })
    
}


}

function freezAddTodo(){
    btn.classList.add("disabled")
}

function unFreezAddTodo(){
    btn.classList.remove("disabled")
}


