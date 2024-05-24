var gameState = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
var cellElements = []
var nextItem = "X"
var winState = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
var isGameopen = true

function checkWin() {
    for (let i = 0; i <= 7; i += 1) {
        if (gameState[winState[i][0] - 1] !== -1 &&
            gameState[winState[i][0] - 1] === gameState[winState[i][1] - 1] &&
            gameState[winState[i][1] - 1] === gameState[winState[i][2] - 1]) {
            isGameopen = false
            var winner = document.getElementById("winner")
            winner.innerHTML = gameState[winState[i][1] - 1] === 0 ? "\"O\" Won" : "\"X\" won"
            winner.style.color = (gameState[winState[i][1] - 1] === 1 ? "red" : "blue");
            winner.style.display = "block"
            var reload = document.getElementById("reload")
            reload.style.display = "block"
        }
    }
    if (!gameState.find((element) => element === -1)) {
        var winner = document.getElementById("winner")
        winner.innerHTML = "Draw"
        winner.style.color = "purple";
        winner.style.display = "block"
        var reload = document.getElementById("reload")
        reload.style.display = "block"
    }
}

function updateCell(index) {
    var cell = document.getElementById(`c${index}`);
    cell.addEventListener("click", async function (e) {
        if (gameState[index - 1] === -1 && isGameopen) {
            gameState[index - 1] = (nextItem === "O" ? 0 : 1);
            cell.innerHTML = nextItem;
            nextItem = (nextItem === "O" ? "X" : "O");
            cell.style.color = (cell.innerHTML === "X" ? "red" : "blue");
            console.log(cellElements, gameState, nextItem, cell.innerHTML);
            setTimeout(checkWin, 500)

            if (nextItem === "O") {
                setTimeout(
                    () => {
                        for (let i = 0; i < gameState.length; i += 1) {
                            if (gameState[i] === -1) {
                                console.log("computerCell")
                                var computerCell = document.getElementById(`c${i + 1}`);
                                if (gameState[i] === -1 && isGameopen) {
                                    gameState[i] = (nextItem === "O" ? 0 : 1);
                                    computerCell.innerHTML = nextItem;
                                    nextItem = (nextItem === "O" ? "X" : "O");
                                    computerCell.style.color = (computerCell.innerHTML === "X" ? "red" : "blue");
                                    console.log(cellElements, gameState, nextItem, cell.innerHTML);
                                    setTimeout(checkWin, 500);
                                    break;

                                }
                            }
                        }
                }, 1000)

            }

        }
    }, false);
    cellElements.push(cell);
}

function reloadPage() {
    location.reload()
}

for (let i = 1; i < 10; i += 1) {
    updateCell(i);
}

