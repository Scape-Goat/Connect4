var gameOver = document.getElementById("end");
var message = document.getElementById("message")
var turnDisplay= document.getElementById("turn");
var map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]
for (var col = 0; col < 7; col++) {
    var currentButton = document.createElement("td");
    currentButton.setAttribute("id", "btn" + col);
    currentButton.setAttribute("class", "btn");
    currentButton.textContent = "Click to Drop Piece"
    document.getElementById("buttons").appendChild(currentButton);
}

var id = 0;
for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 7; col++) {
        var currentCell = document.createElement("td");
        currentCell.setAttribute("id", id);
        id++;
        document.getElementById("row" + row).appendChild(currentCell)
    }
}



var turn = 0;
handleClick = function (event) {
    var cell = event.target;
    var col = parseInt(cell.id.replace("btn", ""));
    for (var row = 5; row >= 0; row--) {
        if (map[row][col] == 0) {
            map[row][col] = turn + 1;
            document.getElementById(row * 7 + col).setAttribute("class", "player" + (turn + 1));


            if (checkWin()) {
                gameOver.removeAttribute("class");
                message.textContent = "Player " + (turn + 1) + " Wins!";
            }
            else if(checkDraw()){
                gameOver.removeAttribute("class");
                message.textContent = "Draw!"
            }
            turn++;
            
            turn = turn % 2;
            turnDisplay.textContent = "Player "+(turn+1)+"'s Turn";
            break;
        }
    }


}

buttons = document.getElementsByClassName("btn")
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', handleClick)
}

function checkWin() {
    var value = turn % 2 + 1;
    //Horizontal
    for (var row = 0; row < map.length; row++) {
        matches = 0;
        for (var col = 0; col < map[row].length; col++) {
            if (map[row][col] == value) {
                matches++;
            }
            else {
                matches = 0;
            }
            if (matches == 4) {
                return true;
            }
        }
    }

    //Vertical
    for (var col = 0; col < map[0].length; col++) {
        matches = 0;
        for (var row = 0; row < map.length; row++) {
            if (map[row][col] == value) {
                matches++;
            }
            else {
                matches = 0;
            }
            if (matches == 4) {
                return true;
            }
        }
    }


    //diagonal - down and right
    for (var row = 0; row < map.length - 3; row++) {
        for (var col = 0; col < map[row].length - 3; col++) {
            matches = 0;
            for (var i = 0; i < 4; i++) {
                if (map[row + i][col + i] == value) {
                    matches++;
                }
                else {
                    matches = 0;
                }
                if (matches == 4) {
                    return true;
                }
            }
        }
    }



    //diagonal - up and right
    for (var row = 0; row < map.length - 3; row++) {
        for (var col = map[row].length; col > 2; col--) {
            matches = 0;
            for (var i = 0; i < 4; i++) {
                if (map[row + i][col - i] == value) {
                    matches++;
                }
                else {
                    matches = 0;
                }
                if (matches == 4) {
                    return true;
                }
            }
        }
    }


    return false;
}

function checkDraw() {

    for (var row = 0; row < 6; row++) {
        for (var col = 0; col < 7; col++) {
            if (map[row][col] == 0) {
                return false;
            }
        }
    }
    return true;
}


gameOver.addEventListener("click", () => location.reload());