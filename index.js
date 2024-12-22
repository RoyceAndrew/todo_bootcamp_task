let lists = [];

function listUpdate() {
lists.forEach((list) => {
    const element = document.getElementById("list")
    element.innerHTML += `<div class="row"><input class="check" type="checkbox">
    <div class="task"><p class="list">${list.item}</p><p class="priority">${list.priority}</p><p class="deadline">${list.deadline}</p></div>
    </div>`
})
}


let over = [] 


let doneList = []

const dlist = document.getElementsByClassName("dlist");
const done = document.getElementsByClassName("check");
const task = document.getElementsByClassName("task");

function addBeh() {
for (let i = 0; i < done.length; i++) {
   done[i].addEventListener("change", (event) => {
   if (event.target.checked) {
     task[i].classList.add("finish")
     doneList.push(lists[i])
     
     
   } else {
    task[i].classList.remove("finish")
    const check = doneList.findIndex((e) => e.id === lists[i].id)
    doneList.splice(check, 1)
    
   }
   document.getElementById("done-list").innerHTML = ""
   doneList.forEach((e) => {
    const element = document.getElementById("done-list");
    element.innerHTML += `<div class="row">
    <div class="task"><p class="list">${e.item}</p><p class="priority">${e.priority}</p><p class="deadline">${e.deadline}</p></div>
    </div>`
  })
   })
}
}

function handleSubmit(e) {
  e.preventDefault()

  const item = document.getElementsByName("item")[0].value;
  const priority = document.getElementsByName("priority")[0].value;
  const deadline = document.getElementsByName("deadline")[0].value;
  const id = new Date().getTime();
  
  document.getElementById("list").innerHTML = ""
  lists.push({ id: id, item: item, deadline: deadline, priority: priority });
  doneList = []
  over = []
  listUpdate()
  addBeh()
  handleOver()
  
}


document.getElementById("delete").addEventListener("click", () => {
    const confirm = prompt(`apakah anda yakin ingin DELETE ALL semua tugas ? ketik "iya" untuk konfirmasi`)
    if (confirm === "iya") {
    lists = []
    over = []
    doneList = []
    handleOver()
    addBeh()
    document.getElementById("done-list").innerHTML = "";
    document.getElementById("list").innerHTML = ""
    } else {
      alert("Perintah DELETE ALL dibatalkan")
}})
     

let currentDate;

function updateTime() {
  const now = new Date();

  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  const jam = `${hour}:${minute}:${second}`;

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  currentDate = `${year}-${month}-${day}`;

  document.getElementById("date").innerText = currentDate;
  document.getElementById("jam").innerText = jam;
}

setInterval(updateTime, 1000);

updateTime();

document.getElementsByName("todaytask")[0].addEventListener("change", (e) => {
  const date = e.target.value
  const nowTask = lists.filter((list) => {
    return list.deadline == date
  })
  document.getElementById("list").innerHTML = ""
  nowTask.forEach((e) => {
    const element = document.getElementById("list")
    element.innerHTML += `<div class="row"><input class="check" type="checkbox">
    <div class="task"><p class="list">${e.item}</p><p class="priority">${e.priority}</p><p class="deadline">${e.deadline}</p></div>
    </div>`
  })
  doneList = []
  document.getElementById("done-list").innerHTML = ""
  addBeh()
})

listUpdate()

function handleOver() {
  lists.forEach((list) => {
    if (list.deadline < currentDate) {
      over.push(list)
    }
  })
  const element = document.getElementById("over-list")
  element.innerHTML = ""
  over.forEach((o) => {
    element.innerHTML += `<div class="row">
    <div class="task"><p class="list">${o.item}</p><p class="priority">${o.priority}</p><p class="deadline">${o.deadline}</p></div>
    </div>`
  })
  
}

setInterval(handleOver(), 1000 * 60 * 5)