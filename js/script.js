const cages = document.querySelector('#cages');
const items = Array.from(document.querySelectorAll('.item'));
const addBtn = document.querySelector('#addBtn')
const removeBtn = document.querySelector('#removeBtn')
const removeInput = document.querySelector('#removeInput')
let maxId = 0;

addBtn.addEventListener('click', addItem)
removeBtn.addEventListener('click', (event) => {
    try {
        deleteItem(removeInput.value)
    } catch {
        event.preventDefault()
    }
})

function addItem() {
    for (let cage of cages.querySelectorAll('.cage')) {
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

function initItems() {
    for (let item of items) {
        if (!item.id) {
            item.id = maxId;
            maxId++;
        }
        item.addEventListener('mousedown', (event) => {
            let shiftX = event.clientX - item.getBoundingClientRect().left;
            let shiftY = event.clientY - item.getBoundingClientRect().top;
            item.style.position = 'absolute'
            document.body.append(item);
            function moveItem(x, y) {
                item.style.top = y - shiftY + 'px'
                item.style.left = x - shiftX + 'px'
            }
            function onMove(event) {
                moveItem(event.pageX, event.pageY)
            }
            document.addEventListener('mousemove', onMove)
            item.addEventListener('mouseup', function onUp(event) {
                const coords = cages.getBoundingClientRect();
                const cageNum = ((Math.floor((event.clientY - coords.y) / 100)) * 5 + Math.floor((event.clientX - coords.x) / 100))
                console.log(cageNum);
                const cageHTML = cages.querySelectorAll('.cage')[cageNum]
                console.log(cageHTML);
                cageHTML.append(event.currentTarget)
                event.currentTarget.style.position = 'static'
                document.removeEventListener('mousemove', onMove)
                item.removeEventListener('mouseup', onUp)
            })
        })
    }
}

function deleteItem(id) {
    items.forEach(item => { if (item.id == id) item.remove() })
}

initItems()