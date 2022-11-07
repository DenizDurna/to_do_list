const form = document.querySelector("#todo-form");
const invl = document.querySelector("#todo");
const lst = document.querySelector(".list-group");
const alrslc = document.querySelectorAll(".card-body")[0];
const filter = document.querySelector("#filter")
let todo = []

//  
lst.addEventListener("click", tddlt)
filter.addEventListener("keyup", kyfltr)

//todo delete function
function tddlt(e) {
    if (e.target.tagName == "I") {
        let trgt = e.target.parentElement.parentElement;
        trgt.remove()
        todo.splice(todo.indexOf(trgt.textContent.trim()), 1)
        localStorage.setItem("todolist", JSON.stringify(todo))
        alrt("primary", `${trgt.textContent} deleted`)
        
    }
}

//to-do filtering function
function kyfltr(e) {
    tudo = todo.filter(flt => flt.search(e.target.value) >= 0)
    lst.innerHTML = ""
    tudo.map(tdd => {
        crtli(tdd)
    })
}

// add input data
const chngvl = (e) => {
    invl.value = e.target.value
}

//form submission function
const sbmt = (e) => {
    e.preventDefault()
    const nwtd = e.target.todo.value.trim();
    if (nwtd !== "" && !todo.includes(nwtd)) {
        todo.push(nwtd)
        invl.value = ""
        localStorage.setItem("todolist", JSON.stringify(todo))
        crtli(nwtd)
        alrt("success", "Registration successfully added")
    } else if (nwtd == "") {
        alrt("danger", "Blank record cannot be added")
    } else if (todo.includes(nwtd)) {
        alrt("warning", "The task is already in the list")
    } else {
        alrt("denger", "Add task failed")
    }
}


//warning div area
const alrt = (type, message) => {
    if (alrslc.children[2] !== undefined) {
        alrslc.removeChild(alrslc.children[2]);
    }
    const alrtdv = document.createElement("div");
    alrtdv.className = `alert alert-${type}`;
    alrtdv.role = "alert";
    alrtdv.textContent = message;
    alrslc.appendChild(alrtdv)
    setTimeout(() => alrtdv.remove(), 3000)
}

// rendering tasks in the DOM
const crtli = (param) => {
    const cli = document.createElement("li");
    cli.className = "list-group-item d-flex justify-content-between";
    cli.innerHTML = `${param} <a href = "#" class ="delete-item"> <i class = "fa fa-remove"></i> </a>`
    lst.appendChild(cli);
}

//delete all todo
const allclr = () => {
    if(confirm("Are you sure you want to delete?")){
    todo = [];
    invl.value = "";
    localStorage.removeItem("todolist")
    lst.innerHTML = ""
    alrt("primary", "All records deleted")
}
}

//Listing tasks in localstorage //IIFE function
const ldng = (() => {
    const lgntd = JSON.parse(localStorage.getItem("todolist"))
    if (lgntd !== null) {
        todo = lgntd
        todo.map(td => {
            crtli(td)
        })
    }
})();
