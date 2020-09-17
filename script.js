// GLOBAL VARIABLES
const map = [[
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
],
[
    "WWWWWWWWWWWWWWWWWWWWW",
    "W                 W W",
    "WW WWWWWWWWWW WWW   W",
    "W  W        W W  WW W",
    "F W  WWWWWW WW  W W W",
    "WWW W   W      W  W W",
    "W W WWW W W WWW  WW W",
    "W W W   W W     W   W",
    "W W W WWW WWWWWW  W W",
    "W   W     W      WW W",
    "WWW WWWWW W WWWW W WW",
    "S W   W   W  W  W  WW",
    "W WWW W WWWW W WW W W",
    "W     W             W",
    "WWWWWWWWWWWWWWWWWWWWW",
],
[
    "WWWWWWWWWWWWWWWWWWWWW",
    "S WWWWW            WW",
    "W       WWWWWWWWWW  W",
    "WWWWWWW W        WW W",
    "W       W WWWW W  W W",
    "W WWWWWWW W    W WW W",
    "W W       W WWWW   WW",
    "W W WWWWWWW W  W W WW",
    "W   W     W W W  W WW",
    "W WWW WWW W    WW   W",
    "W W   W   WWWWW WWW W",
    "W W WW  W         W W",
    "W W  WWWWWWWWWWWW W W",
    "W  W            W   W",
    "WWWWWWWWWWWWWWWFWWWWW",
]]
let characterPosition = []
let mazeEnd = []
let mazeStart = []
const character = document.createElement('div')
const message = document.createElement('p')


// MAZE CONSTRUCTION
function createMaze(num) {
    for(let i = 0; i < map[num].length; i++) {
        const line = document.createElement('div')
        line.id = 'line'
        for(let j = 0; j < map[num][0].length; j++) {
            const div = document.createElement('div')
            div.id = 'cell'
            if(map[num][i][j] === 'W') {
                div.classList = `wall`
            } else {
                div.classList = `void${i}-${j}`
            }
            if(map[num][i][j] === "S") {
                mazeStart[0] = i
                mazeStart[1] = j
            }
            if(map[num][i][j] === 'F') {
                mazeEnd[0] = i
                mazeEnd[1] = j
            }
            line.appendChild(div)
        }
        document.getElementById('maze').appendChild(line)
    }
}

function deleteMaze() {
    if(document.querySelector('div#maze').childNodes.length > 0) {
        document.querySelector('div#maze').innerHTML = ''
    }
}


// CHARACTER MOVIMENTATION
function insertCharacter(character) {
    document.querySelector(`.void${characterPosition[0]}-${characterPosition[1]}`).appendChild(character)
}

function changeCharacterPosition(num1, num2, animation) {
    if(document.querySelector(`.void${characterPosition[0] + num1}-${characterPosition[1] + num2}`) !== null ) {
        characterPosition[0]+= num1
        characterPosition[1]+= num2
        character.classList.add(animation)
        setTimeout(removeClass, 200)
    }
}


// WIN CONDITION
function isWinner() {
    if(mazeEnd[0] === characterPosition[0] && mazeEnd[1] === characterPosition[1]) {
        return true
    }
    return false
}

// EVENTS
document.getElementById('start').addEventListener('click', startGame)

// BUBBLING
function keyInput(event) {
    const keyName = event.key.toLowerCase()
    switch (keyName) {
        case 'ArrowUp':
        case 'w':
            changeCharacterPosition(-1, 0, 'slideUp') 
            break
        case 'ArrowDown':
        case 's':
            changeCharacterPosition(1, 0, 'slideDown')
            break
        case 'ArrowLeft':
        case 'a':
            changeCharacterPosition(0, -1, 'slideLeft')
            break
        case 'ArrowRight':
        case 'd':
            changeCharacterPosition(0, 1, 'slideRight')
            break
    }
    insertCharacter(character)
}

function removeClass() {
    character.classList = ""
    if(isWinner()) {
        message.innerText = 'Parabéns!! Você conseguiu achar a saída e escapar do labirinto.'
        message.id = 'winMessage'
        document.removeEventListener('keydown', keyInput)
        document.querySelector('body').appendChild(message)
        character.setAttribute('class', 'characterComemoration')
        return
    }
}

function startGame() {
    document.addEventListener('keydown', keyInput)

    document.querySelectorAll('input[type="radio"].dificulty').forEach(el => {
        if(el.checked === true) {
            deleteMaze()
            createMaze(el.id)
            document.querySelector('div#backgroundTexture').classList = ''
        }
    })
    
    if(message.parentNode === document.querySelector('body')) {
        document.querySelector('body').removeChild(message)
    }

    characterPosition[0] = mazeStart[0]
    characterPosition[1] = mazeStart[1]
    document.querySelectorAll('input[type="radio"].radioCharacter').forEach(el => {
        if(el.checked === true) {
            character.id = el.id
        }
    })

    character.classList = ""
    insertCharacter(character)

    event.target.id = 'restart'
    event.target.innerText = 'Recomeçar'
    document.querySelector('h1').classList = 'restart'
    document.querySelector('div#userInput').classList = 'restart'
}