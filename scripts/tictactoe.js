"use strict";
//initialize array of the game board, for easier reset later
//decide on game board size (here it is a 3x3 board)
//initialize the first player (X) and player scores
const board = [];
const size = 3;
let player = 1;
let playerWin1 = 0;
let playerWin2 = 0;

//set up the score keeping areas and info message (the info message colour will change based on the player)
let scoreLine1 = document.getElementById("scorePlayer1");
scoreLine1.style.color = "limegreen";
let scoreLine2 = document.getElementById("scorePlayer2");
scoreLine2.style.color = "yellow";
let infoLine = document.getElementById("gameinfo");
infoLine.style.color = "limegreen";
infoLine.innerText = "Player " + player + ", it's your turn to play!";

//set up the reset button
let resetButton = document.createElement("button");
resetButton.innerText = "Play again?"
resetButton.style.display = "none";
document.getElementById("resetButton").appendChild(resetButton);
resetButton.addEventListener("click", resetGame);

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
}

//PLAY functionality
function playCell() {

    //check if play is possible
    if (this.innerHTML === "") {
        //play based on the current player (game always starts with play 1, which is X)
        switch (player) {
            case 1:
                this.innerText = "X";
                //check if the user has won on their move
                //update the message and the win score
                //reset the game (button)
                if (checkWin()) {
                    infoLine.style.color = "limegreen";
                    playerWin1++;
                    infoLine.innerText = "Player " + player + " has won the game!";
                    scoreLine1.innerText = "Player 1 Score: " + playerWin1;
                    resetButton.style.display = "block";
                    break;
                    //otherwise switch to player 2
                } else {
                    player = 2;
                    infoLine.style.color = "yellow";
                    infoLine.innerText = "Player " + player + ", it's your turn to play!";
                    break;
                }
            case 2:
                this.innerText = "O";
                if (checkWin()) {
                    infoLine.style.color = "yellow";
                    playerWin2++;
                    infoLine.innerText = "Player " + player + " has won the game!";
                    scoreLine2.innerText = "Player 2 Score: " + playerWin2;
                    resetButton.style.display = "block";
                    break;
                } else {
                    player = 1;
                    infoLine.style.color = "limegreen";
                    infoLine.innerText = "Player " + player + ", it's your turn to play!";
                    break;
                }
        }
        //check if cell was already played - can add an alert to notify the user if desired    
    } else {
        //alert("Cell already played!");
    }

    //check if any empty spaces remain on the board
    //if no empty spaces remain and no user won declare a draw and reset the game
    if (board.every(cell => cell.innerHTML !== "")) {
        infoLine.style.color = "white";
        infoLine.innerText = "Game ended in a draw";
        resetButton.style.display = "block";
    };
}

//CHECKING WIN CONDITIONS
//check win by row
function checkWinRow() {
    for (let i = 0; i < 3; i++) {
        const winArray = [];
        for (let j = 0; j < 3; j++) {
            winArray.push(document.getElementById("tableRow" + i).cells[j].innerText);
        }
        if (winArray.every(field => field == "X") || winArray.every(field => field == "O")) {
            return true;
        }
    }
    return false;
}

//check win by column
function checkWinCol() {
    for (let i = 0; i < 3; i++) {
        const winArray = [];
        for (let j = 0; j < 3; j++) {
            winArray.push(document.getElementById("tableRow" + j).cells[i].innerText);
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
    for (let i = 0; i < 3; i++) {
        winArray.push(document.getElementById("tableRow" + i).cells[i].innerText);
    }
    if (winArray.every(field => field == "X") || winArray.every(field => field == "O")) {
        return true;
    }
    return false;
}

//check win by diagonal (2)
function checkWinDiag2() {
    const winArray = [];
    for (let i = 0; i < 3; i++) {
        winArray.push(document.getElementById("tableRow" + i).cells[3 - i - 1].innerText);
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
    board.forEach(cell => cell.innerHTML = "");
    resetButton.style.display = "none";
}

//initialize game board
drawTable();
