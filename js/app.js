/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
]

/*---------------------------- Variables (state) ----------------------------*/
let board = [null, null, null, null, null, null, null, null, null]
let turn = 1
let winner = false
let tie = false

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll(".sqr")
const messageEl = document.getElementById("message")
const resetBtnEl = document.getElementById("reset-button")

/*-------------------------------- Functions --------------------------------*/

window.onload = init()

function init() {
  render()
  checkForWinner()
  attachingListeners()
}

function render() {
    updateBoard()
    updateMessage()
}

function attachingListeners() {
  for (i = 0; i < 9; i++) {
    squareEls[i].addEventListener('click', handleClick)
  }   
}

function updateBoard() {
    board.forEach((element, index) => {
      if (element === 1) {   
        squareEls[index].textContent = "X"
      } else if (element === -1) {
        squareEls[index].textContent = "O"
      } else if (element === null) {
        squareEls[index].textContent = ""
      }
      }
    )       
}

function updateMessage() {
  
  let PlayerSelected
  let PlayerOne = "Player One"
  let PlayerTwo = "Player Two"
 
  if (turn === 1) {
    PlayerSelected = PlayerOne
  } else if (turn === -1) {
    PlayerSelected = PlayerTwo
  }
  if (winner === false && tie === false) {
    messageEl.textContent = `It is the turn of ${PlayerSelected}`
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It is a tie"
  } else if (winner === true && tie === false) {
    messageEl.textContent = `The winner is ${PlayerSelected}`
  }
}

function handleClick(evt) {
  const sqIdx = evt.target.id.replace("sq", "")
  if (board[Number(sqIdx)] !== null) {
    return
  } 
  else if (winner === true){
    return
  } else {
  placePiece(sqIdx)
  checkForTie ()
  checkForWinner ()
  switchPlayerTurn ()
  render()
  }
}

function placePiece(index) {
  board[index] = turn
}

function checkForTie() {
  if (board.includes(null)) {
    return
  } else {
    tie = true
  }
}

function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    let sum = 0
    for (let c = 0; c < 3; c++) {
      sum += board[winningCombos[i][c]]
      if (Math.abs(sum) === 3)  {
        winner = true
      }
    }   
  }
}

function switchPlayerTurn() {
  if (winner === true) {
    return
  } else {
  turn = turn * -1
}
}

resetBtnEl.addEventListener('click', init)

