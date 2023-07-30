function createGrid() {
    const container = document.querySelector('.container')
    for (let i = 0; i < 32; i++) {
        const div = document.createElement('div');
        div.classList.add('div-parent')
        container.appendChild(div)
        for (let i = 0; i < 32; i++) {
            const divChild = document.createElement('div');
            divChild.classList.add('div-child')
            div.appendChild(divChild)
        }
    }
}

function draw(e) {
    const div = e.target
    const currentColor = document.querySelector('#color').value;
    div.style.backgroundColor = currentColor
}

let drawing = false;
let erasing = false;

function toggleDraw(e) {
    const divChildren = document.querySelectorAll('.div-child')
    if (drawing === true) {
        drawing = false
        divChildren.forEach(div => {
            div.removeEventListener('mouseover', draw)
        })
    }
    else {
        drawing = true
        divChildren.forEach(div => {
            div.addEventListener('mouseover', draw)
        })
    }
}

function erase(e) {
    const div = e.target;
    div.style.backgroundColor = 'white'
}

function toggleErase(e) {
    const divChildren = document.querySelectorAll('.div-child')
    if (erasing === true) {
        erasing = false
        divChildren.forEach(div => {
            div.removeEventListener('mouseover', erase)
        })
    }
    else {
        erasing = true
        divChildren.forEach(div => {
            div.addEventListener('mouseover', erase)
        })
    }
}

let mode = 'draw'

function changeModeErase() {
    mode = 'erase'
    drawing = false
    const divChildren = document.querySelectorAll('.div-child');
    divChildren.forEach(div => {
        div.removeEventListener('mouseover', draw)
    })
    const container = document.querySelector('.container')
    container.removeEventListener('click', toggleDraw)
    container.addEventListener('click', toggleErase)
}

function changeModeDraw() {
    mode = 'draw'
    erasing = false
    const divChildren = document.querySelectorAll('.div-child');
    divChildren.forEach(div => {
        div.removeEventListener('mouseover', erase)
    })
    const container = document.querySelector('.container')
    container.removeEventListener('click', toggleErase)
    container.addEventListener('click', toggleDraw)
}

function clearAll() {
    drawing = false 
    erasing = false
    if (mode === 'erase') {
        const container = document.querySelector('.container');
        container.removeEventListener('click', toggleErase)
        container.addEventListener('click', toggleDraw)
    }
    const divChildren = document.querySelectorAll('.div-child');
    divChildren.forEach(div => {
        div.removeEventListener('mouseover', draw)
        div.style.backgroundColor = 'white'
    })
    divChildren.forEach(div => {
        div.removeEventListener('mouseover', erase)
    })
}

const container = document.querySelector('.container');
container.addEventListener('click', toggleDraw)

const eraser = document.querySelector('#erase');
eraser.addEventListener('click', changeModeErase)

const drawer = document.querySelector('#draw');
drawer.addEventListener('click', changeModeDraw)

const clear = document.querySelector('#clear');
clear.addEventListener('click', clearAll)

createGrid()