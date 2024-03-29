const cages = document.querySelectorAll('#cages>.cage');
const items = Array.from(document.querySelectorAll('.item'));
const addBtn = document.querySelector('#addBtn')
const removeBtn = document.querySelector('#removeBtn')
const removeInput = document.querySelector('#removeInput')
let maxId = 0;

addBtn.addEventListener('click', addItem)
removeBtn.addEventListener('click', (event)=>{
    try{
        deleteItem(removeInput.value)
    } catch {
        event.preventDefault()
    }
})

function addItem() {
    for (let cage of cages) {
        if (cage.children.length == 0) {
            const newItem = document.createElement('div');
            newItem.classList.add('item');
            cage.append(newItem);
            newItem.id = maxId;
            maxId++;
            newItem.textContent = newItem.id
            items.push(newItem);
            initItems()
            return;
        }
    }
}

function initItems(params) {
    for (let item of items) {
        if (!item.id) {
            item.id = maxId;
            maxId++;
        }
        item.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('id', event.target.id);
        })
    }
}

function deleteItem(id) {
    items.forEach(item => { if (item.id == id) item.remove() })
}

function initCages() {
    for (let cage of cages) {
        cage.addEventListener('dragover', (event) => {
            event.preventDefault();
        })
        cage.addEventListener('drop', (event) => {
            let id = event.dataTransfer.getData('id');
            event.target.append(document.getElementById(id));
        })
    }
}

initCages()
initItems()