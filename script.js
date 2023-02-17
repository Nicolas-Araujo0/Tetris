
let pieces = [
]

let boardWidth = 10;
let boardHeight = 16;
let board
function showBoard() {

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
    for (let i = 0; i < pieces.length; i++) {
        if (pieces[i].color == "cyan") {
            board[pieces[i].y][pieces[i].x] = 1;
        } else if (pieces[i].color == "yellow") {
            board[pieces[i].y][pieces[i].x] = 2;
        } else if (pieces[i].color == "purple") {
            board[pieces[i].y][pieces[i].x] = 3;
        } else if (pieces[i].color == "orange") {
            board[pieces[i].y][pieces[i].x] = 4;
        } else if (pieces[i].color == "bleu") {
            board[pieces[i].y][pieces[i].x] = 5;
        } else if (pieces[i].color == "red") {
            board[pieces[i].y][pieces[i].x] = 6;
        } else if (pieces[i].color == "green") {
            board[pieces[i].y][pieces[i].x] = 7;
        }
    }

    const tetrisBoard = document.querySelector("#tetris")
    tetrisBoard.innerHTML = ""
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            let newDiv = document.createElement("div")

            if (board[i][j] == 1) {
                newDiv.classList.add("cyan")
            } else if (board[i][j] == 2) {
                newDiv.classList.add("yellow")
            } else if (board[i][j] == 3) {
                newDiv.classList.add("purple")
            } else if (board[i][j] == 4) {
                newDiv.classList.add("orange");
            } else if (board[i][j] == 5) {
                newDiv.classList.add("blue")
            } else if (board[i][j] == 6) {
                newDiv.classList.add("red")
            } else if (board[i][j] == 7) {
                newDiv.classList.add("green")
            }

            newDiv.style.width = (100 / boardWidth) + "%";
            newDiv.style.height = (100 / boardHeight) + "%"
            tetrisBoard.append(newDiv)
        }
    }
}

let nextPieceSpawn = false;

function createPieces() {
    // STICK
    if (differentPieces == 0) {
        for (let i = 0; i < 4; i++) {
            let I = {
                y: i,
                x: 5,
                color: "cyan"
            }
            pieces.push(I)

        }
        differentPieces++
    }
    // BLOC
    else if (differentPieces == 1) {
        for (let i = 0; i < 2; i++) {
            let bottom = {
                y: 1,
                x: 4 + i,
                color: "yellow"
            }
            pieces.push(bottom)
        }
        for (let i = 0; i < 2; i++) {
            let top = {
                y: 0,
                x: 4 + i,
                color: "yellow"
            }
            pieces.push(top)
        }
        differentPieces++
    }
    // T
    else if (differentPieces == 2) {
        let bottom = {
            y: 1,
            x: 5,
            color: "purple"
        }
        pieces.push(bottom)
        for (let i = 0; i < 3; i++) {
            let top = {
                y: 0,
                x: 4 + i,
                color: "purple"
            }
            pieces.push(top)
        }

        differentPieces++
    }
    // L
    else if (differentPieces == 3) {
        let bottom = {
            y: 1,
            x: 4,
            color: "orange"
        }
        pieces.push(bottom)
        for (let i = 0; i < 3; i++) {
            let top = {
                y: 0,
                x: 4 + i,
                color: "orange"
            }
            pieces.push(top)
        }
        differentPieces++
    }
    // J
    else if (differentPieces == 4) {
        let bottom = {
            y: 1,
            x: 6,
            color: "bleu"
        }
        pieces.push(bottom)
        for (let i = 0; i < 3; i++) {
            let top = {
                y: 0,
                x: 4 + i,
                color: "bleu"
            }
            pieces.push(top)
        }

        differentPieces++
    }
    // Z
    else if (differentPieces == 5) {
        for (let i = 0; i < 2; i++) {
            let bottom = {
                y: 1,
                x: 5 + i,
                color: "red"
            }
            pieces.push(bottom)

        }

        for (let i = 0; i < 2; i++) {
            let top = {
                y: 0,
                x: 4 + i,
                color: "red"
            }
            pieces.push(top)
        }
        differentPieces++
    }
    // S
    else {
        for (let i = 0; i < 2; i++) {
            let bottom = {
                y: 1,
                x: 4 + i,
                color: "green"
            }
            pieces.push(bottom)

        }
        for (let i = 0; i < 2; i++) {
            let top = {
                y: 0,
                x: 5 + i,
                color: "green"
            }
            pieces.push(top)
        }
        differentPieces = 0;
    }
}


let rowCompleted = 0;
let rowReload = 0;
let checkRow = 0;

function checkCompleteRow() {
    for (let i = 0; i < boardHeight; i++) {
        for (let j = 0; j < boardWidth; j++) {
            if (board[i][j] != 0) {
                checkRow++
            }
        }
        if (checkRow == 10) {
            for (let j = pieces.length - 1; j >= 0; j--) {
                if (pieces[j].y == i) {
                    let selectAll = document.querySelectorAll("div div")
                    selectAll[(pieces[j].y * 10) + pieces[j].x].classList.add("removed")
                    pieces.splice(j, 1)
                }

            }
            rowCompleted++
            for (let a = 0; a < pieces.length; a++) {
                if (pieces[a].y < i) {
                    pieces[a].y += 1;
                }
            }

        }
        checkRow = 0;
    }

    if (rowReload != rowCompleted) {
        setTimeout(() => {
            showBoard();
            rowReload++
        }, 500);

    }
}

let arret = false
function moveDownPiece() {
    if (!gameEnded) {
        for (let i = 0; i < pieces.length - 4; i++) {
            for (let j = 0; j < 4; j++) {
                if ((pieces[i].y == (pieces[(pieces.length - (1 + j))].y + 1)) &&
                    (pieces[i].x == pieces[(pieces.length - (1 + j))].x)) {
                    arret = true;
                    nextPieceSpawn = true;
                }
            }
        }
        if (!arret) {
            for (let i = 0; i < 4; i++) {
                pieces[(pieces.length - (1 + i))].y += 1;

                if (pieces[(pieces.length - (1 + i))].y == 15) {
                    nextPieceSpawn = true;
                }
            }
        }

        showBoard()
        if (nextPieceSpawn) {
            tourPurple = 0;
            horizon = false;
            checkCompleteRow()
            arret = false;
            createPieces();
            nextPieceSpawn = false;
        }
        aside()
        checkGameEnded()
        setTimeout(() => {
            moveDownPiece()
        }, 300);
    }
}

let gameEnded = false;
function checkGameEnded() {
    for (let i = 0; i < pieces.length - 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (pieces[i].y < 1 && (pieces[i].y == pieces[(pieces.length - (1 + j))].y)) {
                gameEnded = true;

            }
        }
    }
    if (gameEnded) {
        setTimeout(() => {
            alert("Game ended you let pieces reach the top")
        }, 600);

    }
}

//

let horizon = false
let tourPurple = 0;
let canTurn = true;
let nearbyPieces = 0;
let noWall = true;
document.addEventListener("keydown", function (event) {
    let code = event.code
    console.log(code)
    if (code == "ArrowLeft") {
        for (let j = 0; j < 4; j++) {
            if ((pieces[(pieces.length - (1 + j))].x > 0)) {
                nearbyPieces++
            }

            for (let x = 0; x < pieces.length - 4; x++) {
                if ((pieces[(pieces.length - (1 + j))].x - 1 == pieces[x].x) && (pieces[(pieces.length - (1 + j))].y == pieces[x].y)) {
                    canTurn = false;
                }
            }
        }
        if (nearbyPieces == 4) {
            noWall = true;
            nearbyPieces = 0
        } else {
            noWall = false;
            nearbyPieces = 0
        }
        if (canTurn && noWall) {
            for (let a = 0; a < 4; a++) {
                pieces[(pieces.length - (1 + a))].x -= 1;
            }
        }

        canTurn = true;
    }
    if (code == "ArrowRight") {
        for (let j = 0; j < 4; j++) {
            if ((pieces[(pieces.length - (1 + j))].x < boardWidth - 1)) {
                nearbyPieces++
            }

            for (let x = 0; x < pieces.length - 4; x++) {
                if ((pieces[(pieces.length - (1 + j))].x + 1 == pieces[x].x) && (pieces[(pieces.length - (1 + j))].y == pieces[x].y)) {
                    canTurn = false;
                }
            }
        }
        if (nearbyPieces == 4) {
            noWall = true;
            nearbyPieces = 0
        } else {
            noWall = false;
            nearbyPieces = 0
        }
        if (canTurn && noWall) {
            for (let a = 0; a < 4; a++) {
                pieces[(pieces.length - (1 + a))].x += 1;
            }
        }
        canTurn = true;
    }


    if (code == "ArrowUp") {







        if (pieces[pieces.length - 1].color == "cyan") {

            for (let j = 0; j < 4; j++) {
                if (!horizon) {
                    pieces[(pieces.length - (1 + j))].y = pieces[pieces.length - 4].y

                    pieces[(pieces.length - (1 + j))].x =
                        pieces[(pieces.length - (1 + j))].x + (-2 + j)

                }
                else {
                    pieces[(pieces.length - (1 + j))].x = pieces[pieces.length - 3].x

                    pieces[(pieces.length - (4 - j))].y = pieces[pieces.length - 4].y + j
                }
            }
            !horizon ? horizon = true : horizon = false




        }

        if (pieces[pieces.length - 1].color == "purple") {
            if (tourPurple == 0) {
                pieces[pieces.length - 1].x = pieces[pieces.length - 2].x;
                pieces[pieces.length - 1].y = pieces[pieces.length - 2].y - 1
                tourPurple++
            }
            else if (tourPurple == 1) {
                pieces[pieces.length - 1].x = pieces[pieces.length - 2].x + 1;
                pieces[pieces.length - 1].y = pieces[pieces.length - 2].y
                pieces[pieces.length - 4].x = pieces[pieces.length - 2].x;
                pieces[pieces.length - 4].y = pieces[pieces.length - 2].y - 1
                tourPurple++
            }
            else if (tourPurple == 2) {
                pieces[pieces.length - 4].y = pieces[pieces.length - 2].y + 1
                pieces[pieces.length - 3].y = pieces[pieces.length - 2].y - 1
                pieces[pieces.length - 3].x = pieces[pieces.length - 2].x
                tourPurple++
            }
            else {
                pieces[pieces.length - 3].y = pieces[pieces.length - 2].y
                pieces[pieces.length - 3].x = pieces[pieces.length - 2].x - 1
                tourPurple = 0;
            }
        }
        if (pieces[pieces.length - 1].color == "orange") {

            if (tourPurple == 0) {
                pieces[pieces.length - 4].y -= 2

                pieces[pieces.length - 3].y -= 1;
                pieces[pieces.length - 3].x += 1;

                pieces[pieces.length - 1].y += 1;
                pieces[pieces.length - 1].x -= 1;
                tourPurple++;

            } else if (tourPurple == 1) {
                pieces[pieces.length - 4].x += 2;

                pieces[pieces.length - 3].y += 1;
                pieces[pieces.length - 3].x -= 1;

                pieces[pieces.length - 1].y -= 1;
                pieces[pieces.length - 1].x += 1;
                tourPurple++;

            }
            else if (tourPurple == 2) {
                pieces[pieces.length - 4].y += 2;

                pieces[pieces.length - 3].y -= 1;
                pieces[pieces.length - 3].x += 1;

                pieces[pieces.length - 1].y += 1;
                pieces[pieces.length - 1].x -= 1;
                tourPurple++;
            }
            else {
                pieces[pieces.length - 4].x -= 2;

                pieces[pieces.length - 3].y += 1;
                pieces[pieces.length - 3].x -= 1;

                pieces[pieces.length - 1].y -= 1;
                pieces[pieces.length - 1].x += 1;
                tourPurple = 0;
            }


        }

        if (pieces[pieces.length - 1].color == "bleu") {
            if (tourPurple == 0) {
                pieces[pieces.length - 4].x -= 2

                pieces[pieces.length - 3].y -= 1;
                pieces[pieces.length - 3].x += 1;

                pieces[pieces.length - 1].y += 1;
                pieces[pieces.length - 1].x -= 1;
                tourPurple++;

            } else if (tourPurple == 1) {
                pieces[pieces.length - 4].y -= 2;

                pieces[pieces.length - 3].y += 1;
                pieces[pieces.length - 3].x += 1;

                pieces[pieces.length - 1].y -= 1;
                pieces[pieces.length - 1].x -= 1;
                tourPurple++;

            }
            else if (tourPurple == 2) {
                pieces[pieces.length - 4].x += 2;

                pieces[pieces.length - 3].y += 1;
                pieces[pieces.length - 3].x -= 1;

                pieces[pieces.length - 1].y -= 1;
                pieces[pieces.length - 1].x += 1;
                tourPurple++;
            }
            else {
                pieces[pieces.length - 4].y += 2;

                pieces[pieces.length - 3].y -= 1;
                pieces[pieces.length - 3].x -= 1;

                pieces[pieces.length - 1].y += 1;
                pieces[pieces.length - 1].x += 1;
                tourPurple = 0;
            }
        }


        if (pieces[pieces.length - 1].color == "red") {
            if (!horizon) {
                pieces[pieces.length - 3].y += 1
                pieces[pieces.length - 3].x -= 1

                pieces[pieces.length - 2].x += 2
                pieces[pieces.length - 1].x += 1
                pieces[pieces.length - 1].y += 1
            }
            else {
                pieces[pieces.length - 4].y += 1

                pieces[pieces.length - 3].x += 1

                pieces[pieces.length - 2].x -= 2
                pieces[pieces.length - 2].y += 1

                pieces[pieces.length - 1].x -= 1
            }
            !horizon ? horizon = true : horizon = false;
        }

        if (pieces[pieces.length - 1].color == "green") {
            if (!horizon) {
                pieces[pieces.length - 4].y += 1
                pieces[pieces.length - 4].x += 1

                pieces[pieces.length - 2].x -= 1
                pieces[pieces.length - 2].y += 1
                pieces[pieces.length - 1].x -= 2

            }
            else {
                pieces[pieces.length - 4].y -= 1
                pieces[pieces.length - 4].x -= 1

                pieces[pieces.length - 2].x += 1
                pieces[pieces.length - 2].y -= 1
                pieces[pieces.length - 1].x += 2
            }
            !horizon ? horizon = true : horizon = false;
        }
    }
    needPush()
    showBoard()
})

let push = 0;
function needPush() {
    for (let j = 0; j < 4; j++) {
        if (pieces[pieces.length - (1 + j)].x < 0) {
            push = -1;
            break;
        } else if (pieces[pieces.length - (1 + j)].x > boardWidth - 1) {
            push = 1;
            break;
        } else {
            push = 0
        }
    }
    if (push == -1) {
        for (let i = 0; i < 4; i++) {
            pieces[pieces.length - (1 + i)].x += 1

        }
        needPush()
    } else if (push == +1) {
        for (let i = 0; i < 4; i++) {
            pieces[pieces.length - (1 + i)].x -= 1
        }
        needPush()
    }
}


let differentPieces = 0;
createPieces()
showBoard()

setTimeout(() => {
    moveDownPiece()
}, 500);

function aside() {
    let score = document.querySelector("h3")
    score.textContent = "Row completed : " + rowCompleted;

    let commande = document.querySelector(".commande")
    commande.innerHTML = " Use ↑ to rotate pieces <br> Use ← and → to move"

    let nextForm = document.querySelector(".form div img")
    let nextForm1 = document.querySelector(".form div #second")
    let text = document.querySelector(".form p")
    text.innerHTML = "Thanks for playing a bugged tetris 😎 <br> Next pieces will be :"


    if (differentPieces == 1) {
        nextForm.src = "assets/cube.PNG"
        nextForm1.src = "assets/T.PNG"
    } else if (differentPieces == 2) {
        nextForm.src = "assets/T.PNG"
        nextForm1.src = "assets/L.PNG"
    } else if (differentPieces == 3) {
        nextForm.src = "assets/L.PNG"
        nextForm1.src = "assets/J.PNG"
    } else if (differentPieces == 4) {
        nextForm.src = "assets/J.PNG"
        nextForm1.src = "assets/Z.PNG"
    } else if (differentPieces == 5) {
        nextForm.src = "assets/Z.PNG"
        nextForm1.src = "assets/S.PNG"
    } else if (differentPieces == 6) {
        nextForm.src = "assets/S.PNG"
        nextForm1.src = "assets/Bar.PNG"
    } else {
        nextForm.src = "assets/Bar.PNG"
        nextForm1.src = "assets/cube.PNG"
    }

}