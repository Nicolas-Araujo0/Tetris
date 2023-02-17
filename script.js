
let pieces = [
    { y: 15, x: 0 },
    { y: 15, x: 1 },
    { y: 15, x: 2 },
    { y: 15, x: 3 },
    { y: 15, x: 4 },
    { y: 15, x: 5 },
    { y: 15, x: 6 },
    { y: 15, x: 7 },
    { y: 15, x: 8 },
    { y: 15, x: 9 },
]

let boardWidth = 10;
let boardHeight = 16;
let board
function createBoard() {

    board = []
    for (let i = 0; i < boardHeight; i++) {
        let boardXLigne = []
        for (let j = 0; j < boardWidth; j++) {
            let boardPiece = 0
            boardXLigne.push(boardPiece)
        }
        board.push(boardXLigne)
    }

//placement block
for(let i = 0; i < pieces.length;i++){
    board[pieces[i].y][pieces[i].x] = 1
}

    const tetrisBoard = document.querySelector("#tetris")
    tetrisBoard.innerHTML = ""
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            let newDiv = document.createElement("div")

            if(board[i][j] == 1 ){
                newDiv.classList.add("blocked")
            }

            newDiv.style.width = (100 / boardWidth) + "%";
            newDiv.style.height = (100 / boardHeight) + "%"
            tetrisBoard.append(newDiv)
        }
    }
}

createBoard()

let rowCompleted = 0;
let checkRow = 0;
function checkCompleteRow() {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            if (board[i][j] != 0) {
                checkRow++
            }
        }
        if (checkRow == 10) {
            // board[i].forEach(element => {
            //     board[i][element] = 0;
            // });
            for(let j = 0; j < boardWidth; j++){
                board[i][j] = 0;
            }
            rowCompleted++
        }
        checkRow = 0;
    }
}
//
