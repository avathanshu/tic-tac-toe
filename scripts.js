const cells = document.querySelectorAll(".cells");

function createPlayer (name, marker, serial, winner) {
    return { name, marker, serial, winner }
}

const player1 = createPlayer("Jimmy", "X", 1, false);
const player2 = createPlayer("Brenda", "O", 2, false);
let turn = [];
let gameTie = false

//define grid
const gameBoard = (function () {
    const rows = 3;
    const cols = 3;
    const board = []

    const gameGrid = (rows, cols) => {
        for (let i = 0; i < rows; i++) {
            board[i] = []
            for (let j = 0; j < cols; j++) {
                board[i].push(`${[i]},${[j]}`)
            }
        }
    }
    return { rows, cols, gameGrid, board }
})();
gameBoard.gameGrid(3,3)

const screenDisplay = function () {
    for (let i = 0; i < (gameBoard.board.length); i++){
        for (let j = 0; j < gameBoard.board.length; j++) {
           cells[i * gameBoard.board.length + j].value = gameBoard.board[i][j];
        }
    }
}

screenDisplay()

const Update = (rows, cols) => {
    const loc = cells[rows * (gameBoard.board.length) + cols]
    return loc;
}

const posBoard = (player, pos) => {
    let dimRow = 0
    let dimCol = 0 
    moveMade = false
    for (let i = 0; i < pos.length; i++) {
        if (i === 0) {
            dimRow = parseInt(pos[i]);
        }

        if (i === 1) {
            dimCol = parseInt(pos[i])
        }
    }
    
    gameBoard.board[dimRow][dimCol] = []
    gameBoard.board[dimRow][dimCol].push(player.marker)
    Update(dimRow, dimCol).textContent = player.marker
    moveMade = true;
    return player.serial

}


const turnChecker = (pos) => {
    if (turn[turn.length-1] === 1) {
        posBoard(player2, pos)
    }
    
    else if (turn[turn.length-1] === 2) {
        posBoard(player1, pos)
    }
    return turn.length
}

const isGameOver = () => {
    if (((gameBoard.board[0][0].toString() === gameBoard.board[0][1].toString()) && (gameBoard.board[0][0].toString() === gameBoard.board[0][2].toString()) && (gameBoard.board[0][1].toString() === gameBoard.board[0][2].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[0][0][0] === player1.marker) {
            player1.winner = true;
        }
        else if (gameBoard.board[0][0][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }

    else if (((gameBoard.board[1][0].toString() === gameBoard.board[1][1].toString()) && (gameBoard.board[1][0].toString() === gameBoard.board[1][2].toString()) && (gameBoard.board[1][1].toString() === gameBoard.board[1][2].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[1][0][0] === player1.marker) {
            player1.winner = true;
        }
        else if (gameBoard.board[1][0][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }

    else if (((gameBoard.board[2][0].toString() === gameBoard.board[2][1].toString()) && (gameBoard.board[2][0].toString() === gameBoard.board[2][2].toString()) && (gameBoard.board[2][1].toString() === gameBoard.board[2][2].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[2][0][0] === player1.marker) {
            player1.winner = true;
        }
        else if (gameBoard.board[2][0][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }

    else if (((gameBoard.board[0][0].toString() === gameBoard.board[1][0].toString()) && (gameBoard.board[0][0].toString() === gameBoard.board[2][0].toString()) && (gameBoard.board[1][0].toString() === gameBoard.board[2][0].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[0][0][0] === player1.marker) {
            player1.winner = true;
        }
        else if (gameBoard.board[0][0][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }

    else if (((gameBoard.board[0][1].toString() === gameBoard.board[1][1].toString()) && (gameBoard.board[0][1].toString() === gameBoard.board[2][1].toString()) && (gameBoard.board[1][1].toString() === gameBoard.board[2][1].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[0][1][0] === player1.marker) {
            player1.winner = true;
        }
        else if (gameBoard.board[0][1][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }

    else if (((gameBoard.board[0][2].toString() === gameBoard.board[1][2].toString()) && (gameBoard.board[0][2].toString() === gameBoard.board[2][2].toString()) && (gameBoard.board[1][2].toString() === gameBoard.board[2][2].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[0][2][0] === player1.marker) {
            player1.winner = true;
        }

        else if (gameBoard.board[0][2][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }

    else if (((gameBoard.board[0][0].toString() === gameBoard.board[1][1].toString()) && (gameBoard.board[0][0].toString() === gameBoard.board[2][2].toString()) && (gameBoard.board[1][1].toString() === gameBoard.board[2][2].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[0][0][0] === player1.marker) {
            player1.winner = true;
        }
        else if (gameBoard.board[0][0][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }

    else if (((gameBoard.board[0][2].toString() === gameBoard.board[1][1].toString()) && (gameBoard.board[0][2].toString() === gameBoard.board[2][0].toString()) && (gameBoard.board[1][1].toString() === gameBoard.board[2][0].toString())) === true) {
        let gameOver = true
        if (gameBoard.board[0][2][0] === player1.marker) {
            player1.winner = true;
        }
        else if (gameBoard.board[0][2][0] === player2.marker){
            player2.winner = true;
        }
        return gameOver
    }
    
    else if (turn.length === 9){
        let gameOver = true
        gameTie = true
        return gameOver
    }
}

function beginGame () {
    cells.forEach(element => element.addEventListener("click", () => {
        
        let pos = element.value.split(",")
        posBoard(player1, pos)
        let turnLength = turn.length

        if ( (turnLength - 1)%2 === 0) {
            turn.push(player1.serial)
            turnChecker(pos)
        }

        else if ( turnLength%2 === 0) {
            turn.push(player2.serial)
            turnChecker(pos)

        }

        if(isGameOver()) {
            if (player1.winner === true) {
                alert(`Congratulations! ${player1.name} wins!`)
            }

            else if (player2.winner === true) {
                alert(`Congratulations! ${player2.name} wins!`)
            }

            else if ((player1.winner === false) && (player2.winner === false)) {
                alert(`It's a tie!`)
            }
        }
    }))
};
const begin = beginGame
beginGame()

