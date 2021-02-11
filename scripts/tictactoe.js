"use strict";
//initialize array of the game board, for easier reset later
//decide on game board size (here it is a 3x3 board)
//initialize the first player (X) and the player message (colour will change based on player)
var board = [];
var size = 3;
var player = 1;
var infoLine = document.getElementById("gameinfo");
infoLine.style.color = "limegreen";
infoLine.innerText = "Player " + player + ", it's your turn to play!";

//GAMEBOARD functionality
function drawTable() {
    //create game table
    var table = document.createElement("table");
    table.setAttribute("id", "gameTable");

    //create table rows
    for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");
        row.setAttribute("id", "tableRow" + i);
        table.appendChild(row);

        //create table cells, add cells to the game board array and add event listener for clicks
        for (var j = 0; j < size; j++) {
            var cell = document.createElement("td");
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
                //update the message
                //reset the game
                if (checkWin()) {
                    infoLine.style.color = "limegreen";
                    infoLine.innerText = "Player " + player + " has won the game!";
                    resetGame();
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
                    infoLine.innerText = "Player " + player + " has won the game!";
                    resetGame();
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
        resetGame();
    };
}

//CHECKING WIN CONDITIONS
//check win by row
function checkWinRow() {
    for (var i = 0; i < 3; i++) {
        var winArray = [];
        for (var j = 0; j < 3; j++) {
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
    for (var i = 0; i < 3; i++) {
        var winArray = [];
        for (var j = 0; j < 3; j++) {
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
    var winArray = [];
    for (var i = 0; i < 3; i++) {
        winArray.push(document.getElementById("tableRow" + i).cells[i].innerText);
    }
    if (winArray.every(field => field == "X") || winArray.every(field => field == "O")) {
        return true;
    }
    return false;
}

//check win by diagonal (2)
function checkWinDiag2() {
    var winArray = [];
    for (var i = 0; i < 3; i++) {
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
}

//initialize game board
drawTable();
