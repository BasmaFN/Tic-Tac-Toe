let currentPlayer = 'X'
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true

function handlePlayerTurn(clickedCellIndex) {
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const cells = document.querySelectorAll('.cell');
cells.forEach(cell => {
    cell.addEventListener('click', cellClicked, false);
});


function cellClicked(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    handlePlayerTurn(clickedCellIndex);
    updateUI();
    checkForWinOrDraw(); // Call checkForWinOrDraw after updating the UI
}

function updateUI() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
}

const winConditions = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // left diagonal
    [2, 4, 6] // right diagonal

];

function checkForWinOrDraw() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;

        }
    }

    if (roundWon) {
        const winningPlayer = currentPlayer === 'X' ? 'O' : 'X';
        announceWinner(winningPlayer);
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return
    }
}

function announceWinner(player) {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins!`;
  }
  
  function announceDraw() {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'It\'s a Draw!';
  }

// Define the resetGame function to reset the game state
function resetGame() {
    // Reset gameBoard, gameActive, and currentPlayer variables
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    
    // Update the UI by clearing cell contents and game message
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
}

// Add event listener to the reset button to call resetGame function when clicked
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);