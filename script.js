// Selecting Elements
const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const btn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearItem = document.querySelector(".clear-btn");

//Global Variables
let editFlag = false;
let editElement;
let editId = '';

// EventListeners
window.addEventListener('DOMContentLoaded',setUpItems)
// EventListeners on from
form.addEventListener("submit", addItem);
// Clear th item 
clearItem.addEventListener('click',clearItems);
// functions
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
           <div class="btn-container">
             <!-- edit btn -->
             <button type="button" class="edit-btn">
               <i class="fas fa-edit"></i>
             </button>
             <!-- delete btn -->
             <button type="button" class="delete-btn">
               <i class="fas fa-trash"></i>
             </button>
           </div>
           `;
    // appending the child
    list.appendChild(element);
    // display alert
    displayMessage('Item added successfully','success')
    // show container
    container.classList.add("show-container");
    //  addEventListener to both buttons
    const editBtn = document.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    const deleteBtn = document.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    // add to localStorage
    addToLocalStorage(id,value)
    // clear
    setToBackDefault()
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value
    // edit add to local storage
    editToLocalStorage(editId,value);
    // clear
    setToBackDefault();
  } else {
    displayMessage('Empty please enter a value','danger')
  }
}
// display alert

function displayMessage(message,type){
    alert.innerHTML = message
    alert.classList.add(`alert-${type}`)
    setTimeout(function () {
        alert.innerHTML = '';
        alert.classList.remove(`alert-${type}`);
    },2000)
}

// Add to local storage 
function addToLocalStorage(id,value){
    const grocery = {id,value};
    let item = getLocalStorage();

    item.push(grocery)
    localStorage.setItem('list',JSON.stringify(item))
}

// remove from local storage
function removeFromLocalStorage(id){
    let items = getLocalStorage();
    items = items.filter(function(item){
          if(item.id !== id){
            return item
          }
    })
    localStorage.setItem('list',JSON.stringify(items))
}

// Add edited to local storage
function editToLocalStorage(id , value){
    let items = getLocalStorage();

    items = items.map(function(item){
          if(item.id === id){
            item.value = value
        }
        return item
    })
    localStorage.setItem('list',JSON.stringify(items))
}

// getLoclaStorage
function getLocalStorage() {
    return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) :[];
}

// editing the item 
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    console.log('edited');
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    btn.textContent = 'edit';
}

// delete the item 
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
        console.log('delete');
    const id = element.dataset.id
    list.removeChild(element)
    if(list.children.length === 0){
        container.classList.remove('show-container')
    }
    displayMessage('item removed','danger')
    setToBackDefault();
    removeFromLocalStorage(id);
}

function setToBackDefault(){
   grocery.value = ''
   editFlag = false;
   editElement;
   editId = '';
   btn.textContent = 'Submit'
}

function clearItems(){
 const items = document.querySelector('.grocery-item')
 console.log(items);
 if (items.length > 0) {
  items.forEach(function (item) {
    list.removeChild(item);
  });
}
    container.classList.remove('show-container')
    
    displayMessage('Cleared All Item','danger')
    setToBackDefault();
  localStorage.removeItem("list");
}

// setUpItems

function setUpItems(){
   const items = getLocalStorage();
   if(items.length > 0){
         items.forEach(function(item){
            createListItem(item.id , item.value)
         });
         container.classList.add('show-container')
   }
}

function createListItem(id,value){
    const element = document.createElement("article");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
           <div class="btn-container">
             <!-- edit btn -->
             <button type="button" class="edit-btn">
               <i class="fas fa-edit"></i>
             </button>
             <!-- delete btn -->
             <button type="button" class="delete-btn">
               <i class="fas fa-trash"></i>
             </button>
           </div>
           `;
    // appending the child
    list.appendChild(element);
    //  addEventListener to both buttons
    const editBtn = document.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
    const deleteBtn = document.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
}