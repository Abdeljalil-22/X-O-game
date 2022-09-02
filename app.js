let x_turn ;
const x_class ="x";
const o_class ="o";
const board = document.getElementById('board')
const MessageElement = document.getElementById('Message')
const restartButton = document.getElementById('restartBtn')
const MessageTextElement = document.querySelector('[data-message-txt]')
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]



const cells = document.querySelectorAll("[data-cell]");
cells.forEach(cell => {
    cell.addEventListener('click',handleClick,{once:true})
    
});


restartButton.addEventListener('click',()=>{
    startGame() ;
})
function startGame() {
    x_turn =true;
    cells.forEach(cell => {
      cell.classList.remove(x_class)
      cell.classList.remove(o_class)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
    })

    MessageElement.classList.remove('show')
  }
function handleClick (e){
    const cell =e.target
    const currentClass = x_turn?x_class:o_class; 
    cell.classList.add(currentClass);
    placeMark(cell, currentClass)
    if (checkWin(o_class)) {
      endGame(false)
    } else if (isDraw()) {
      endGame(true)
    } else {
        switchTurn()

    }
    


}

function endGame(draw) {
    if (draw) {
      MessageTextElement.innerText = 'Draw!'
     // console.log("draw")
    } else {
      MessageTextElement.innerText = `${x_turn ? "X's" : "O's"} Wins!`
    //console.log("win xx")
    }
    MessageElement.classList.add('show')
  }
  function isDraw() {
    return [...cells].every(cell => {
      return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
  }
  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
  }

function switchTurn(){
    x_turn=!x_turn;
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return cells[index].classList.contains(currentClass)
      })
    })
  }


