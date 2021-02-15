"use strict";

//initialize array of the game board
//decide on game board size (here it is a 3x3 board)
//set up player colours
const board = [];
const size = 3;
const colorClass = ["draw", "player1", "player2"]

//initialize the first player (X) and player scores
let player = 1;
let playerWin1 = 0;
let playerWin2 = 0;

//create variables for score keeping, info messages and reset button 
let scoreLine1 = document.getElementById("scorePlayer1");
let scoreLine2 = document.getElementById("scorePlayer2");
let infoLine = document.getElementById("gameinfo");
let resetButton = document.getElementById("resetButton");

//GAMEBOARD functionality
function drawTable() {
    //create game table
    let table = document.createElement("table");
    table.setAttribute("id", "gameTable");

    //create table rows
    for (let i = 0; i < size; i++) {
        let row = document.createElement("tr");
        row.setAttribute("id", "tableRow" + i);
        table.appendChild(row);

        //create table cells, add cells to the game board array and add event listener for clicks
        for (let j = 0; j < size; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", "tableCell" + j);
            row.appendChild(cell);
            board.push(cell);
            cell.addEventListener("click", playCell);
        }
    }
    //add the table to the page
    document.getElementById("gameboard").appendChild(table);

    //set starting variables
    infoLine.className = colorClass[1];
    infoLine.textContent = "Player " + player + ", it's your turn to play!";
    resetButton.addEventListener("click", resetGame);
}

//PLAY functionality
function playCell() {
    //check if play is possible
    if (this.textContent === "") {
        //play based on the current player (game always starts with play 1, which is X)
        switch (player) {
            case 1:
                this.textContent = "X";
                //check if the user has won on their move
                //update the message and the win score
                //reset the game (button)
                if (checkWin()) {
                    infoLine.className = colorClass[1];
                    playerWin1++;
                    infoLine.textContent = "Player " + player + " has won the game!";
                    scoreLine1.textContent = playerWin1;
                    resetButton.classList.toggle("buttonDisplay");
                    break;
                    //otherwise switch to player 2
                } else {
                    player = 2;
                    infoLine.className = colorClass[2];
                    infoLine.textContent = "Player " + player + ", it's your turn to play!";
                    break;
                }
            case 2:
                this.textContent = "O";
                if (checkWin()) {
                    infoLine.className = colorClass[2];
                    playerWin2++;
                    infoLine.textContent = "Player " + player + " has won the game!";
                    scoreLine2.textContent = playerWin2;
                    resetButton.classList.toggle("buttonDisplay");
                    break;
                } else {
                    player = 1;
                    infoLine.className = colorClass[1];
                    infoLine.textContent = "Player " + player + ", it's your turn to play!";
                    break;
                }
        }
        //check if cell was already played - can add an alert to notify the user if desired    
    } else {
        //alert("Cell already played!");
    }

    //check if any empty spaces remain on the board
    //if no empty spaces remain and no user won declare a draw and reset the game
    if (board.every(cell => cell.textContent !== "")) {
        if (!checkWin()) {
            infoLine.className = colorClass[0];
            infoLine.textContent = "Game ended in a draw";
            resetButton.classList.toggle("buttonDisplay");
        }
    }
}

//CHECKING WIN CONDITIONS
//check win by row
function checkWinRow() {
    for (let i = 0; i < size; i++) {
        const winArray = [];
        for (let j = 0; j < size; j++) {
            winArray.push(document.getElementById("tableRow" + i).cells[j].textContent);
        }
        if (winArray.every(field => field == "X") || winArray.every(field => field == "O")) {
            return true;
        }
    }
    return false;
}

//check win by column
function checkWinCol() {
    for (let i = 0; i < size; i++) {
        const winArray = [];
        for (let j = 0; j < size; j++) {
            winArray.push(document.getElementById("tableRow" + j).cells[i].textContent);
        }
        if (winArray.every(field => field == "X") || winArray.every(field => field == "O")) {
            return true;
        }
    }
    return false;
}

//check win by diagonal (1)
function checkWinDiag1() {
    const winArray = [];
    for (let i = 0; i < size; i++) {
        winArray.push(document.getElementById("tableRow" + i).cells[i].textContent);
    }
    if (winArray.every(field => field == "X") || winArray.every(field => field == "O")) {
        return true;
    }
    return false;
}

//check win by diagonal (2)
function checkWinDiag2() {
    const winArray = [];
    for (let i = 0; i < size; i++) {
        winArray.push(document.getElementById("tableRow" + i).cells[3 - i - 1].textContent);
    }
    if (winArray.every(field => field == "X") || winArray.every(field => field == "O")) {
        return true;
    }
    return false;
}

//check if player any winning combinations
function checkWin() {
    if (checkWinRow() || checkWinCol() || checkWinDiag1() || checkWinDiag2()) {
        return true;
    }
    return false;
}

//reset the game
function resetGame() {
    player = 1;
    board.forEach(cell => cell.textContent = "");
    resetButton.classList.toggle("buttonDisplay");
}

//initialize game board
drawTable();
