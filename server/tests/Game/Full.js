import Board from "../../src/models/board/Board.js"
import HtmlView from "../../src/views/HtmlView.js"
import Controller from "../../src/controllers/Controller.js"

class Full {   
    constructor() {
        // Create a new board and run a game for a single turn
        this.board = null;
        this.controller = null;
        this.view = null;
    }
    createGame(){
        // Create a new board and run a game for a single turn
        this.board = new Board(5);
        this.view = new HtmlView();
        this.controller = new Controller(this.board, this.view);
        this.board.updateController(this.controller);
        this.view.updateController(this.controller);
        
        console.log("Board created");

        this.refreshGame();

        // Provide Game controls
        let gameControlsDiv = document.getElementById("game-controls");
        // We already created an event listener for the new game button
        // So we don't do it again, just create the html for the button again
        gameControlsDiv.innerHTML = "<button id='new-game'>Start a new Game</button>";
        
        gameControlsDiv.innerHTML += "<button id='play-turn'>Play Turn</button>";
        let rollDiceButton = document.getElementById("play-turn");
        rollDiceButton.addEventListener("click", () => {
            this.board.playerTurn();
            this.refreshGame(board);
        });
        

    }

    refreshGame() {
        // Get the board div from the html
        let boardDiv = document.getElementById("board");
        // Set the board div's inner html to the squares html
        let squareHtml = this.view.getSquaresHtml();
        boardDiv.innerHTML = squareHtml;

        // Get the game info div from the html
        let gameInfoDiv = document.getElementById("game-info");
        // Set the game info div's inner html to the game info html
        let gameInfoHtml = this.view.getGameInfoHtml();
        gameInfoDiv.innerHTML = gameInfoHtml;
    }


}


export default Full
