const boxes = document.querySelectorAll('.box');
const currentPlayerBox = document.querySelector('.current-player');
const newGameBtn = document.querySelector('.btn');
const xscore=document.querySelector('.xScore');
const yscore=document.querySelector('.yScore');

let xinitialScore=0;
let yinitialScore=0;
let currentPlayer = 'X';
const winningPosition = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']

];

let gridItem = ['', '', '', '', '', '', '', '', '']

window.onload = () => {
    currentPlayerBox.innerHTML = 'Click on new game to start';
    boxes.forEach((box) => {
        box.style.pointerEvents = 'none';
    })
    xscore.innerHTML=xinitialScore;
    yscore.innerHTML=xinitialScore;
}


function cheakWiner() {

    winningPosition.forEach((position) => {
        if (gridItem[position[0]] != '' && gridItem[position[1]] != '' && gridItem[position[2]] != '' && (gridItem[position[0]] === gridItem[position[1]]) && (gridItem[position[1]] === gridItem[position[2]])) {
            if (currentPlayer === 'X') {
                currentPlayerBox.innerHTML = `Winner - O`;
                yinitialScore+=1;
                yscore.innerHTML=yinitialScore;
            }
            else {
                currentPlayerBox.innerHTML = `Winner - X`;
                xinitialScore+=1;
                xscore.innerHTML=xinitialScore;
            }
            boxes.forEach((box) => {
                box.style.pointerEvents = 'none';
                newGameBtn.classList.remove('active');
            })
            boxes[position[0]].classList.add('gray');
            boxes[position[1]].classList.add('gray');
            boxes[position[2]].classList.add('gray');
            count++;
        }


    })

    let count = 0;


    gridItem.forEach((item) => {
        if (item != '') {
            count++;
        }
    })

    if (count === 9) {
        currentPlayerBox.innerHTML = `Tie`;
        newGameBtn.classList.remove('active');
    }
}




function initialGame() {
    currentPlayer = 'X';
    gridItem = ['', '', '', '', '', '', '', '', '']
    boxes.forEach((box) => {
        box.innerHTML = ''
    })
    newGameBtn.classList.add('active');
    currentPlayerBox.innerHTML = `Current Player - ${currentPlayer}`
    boxes.forEach((box, index) => {
        box.style.pointerEvents = 'all';
        box.classList = `box box${index + 1}`;
    })
}

function changePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    }
    else {
        currentPlayer = 'X';
    }
    currentPlayerBox.innerHTML = `Current Player - ${currentPlayer}`;
}

function handleTurn(e) {
    if (gridItem[e] === '') {
        boxes[e].innerHTML = currentPlayer;
        gridItem[e] = currentPlayer;
        boxes[e].style.pointerEvents = 'none';
        changePlayer();
        cheakWiner();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', (e) => {
        e.preventDefault();
        handleTurn(index);
    })
})
