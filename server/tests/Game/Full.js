import Board from "../../src/controllers/Board.js"
import PropertySquare from "../../src/models/squares/PropertySquare.js"
import TaxSquare from "../../src/models/squares/TaxSquare.js"
import GoSquare from "../../src/models/squares/GoSquare.js"

class Full {   

    createGame(){
        // Create a new board and run a game for a single turn
        let board = new Board(5);
        
        console.log("Board created");

        // Get the board div from the html
        let boardDiv = document.getElementById("board");
        // Set the board div's inner html to the squares html
        let squareHtml = this.getSquaresHtml(board);
        boardDiv.innerHTML = squareHtml;

        // Get the game info div from the html
        let gameInfoDiv = document.getElementById("game-info");
        // Set the game info div's inner html to the game info html
        let gameInfoHtml = this.getGameInfoHtml(board);
        gameInfoDiv.innerHTML = gameInfoHtml;

        // Provide Game controls
        let gameControlsDiv = document.getElementById("game-controls");
        // We already created an event listener for the new game button
        // So we don't do it again, just create the html for the button again
        gameControlsDiv.innerHTML = "<button id='new-game'>Start a new Game</button>";
        
        gameControlsDiv.innerHTML += "<button id='play-turn'>Play Turn</button>";
        let rollDiceButton = document.getElementById("play-turn");
        rollDiceButton.addEventListener("click", () => {
            board.playerTurn();
        });

    }

    getSquaresHtml(board) {
        // Return the html for the squares on the board
        let squareHtml = "";
        for (let i = 0; i < board.squares.length; i++) {
            
            // Add row element for every 11 squares
            if (i % 10 == 0) {
                squareHtml += "<div class='row'>"
            }

            let square = board.squares[i];
            // Get the html for the square

            // Start with the name of the square formatted as html
            squareHtml += "<div class='square'"
            if (square instanceof PropertySquare) {
                let color = square.getProperty().getColor()
                if (color == "brown") {
                    color = "BlanchedAlmond"
                } else if (color == "black") {
                    color = "LightGrey"
                } else if (color == "blue") {
                    color = "RoyalBlue"
                }
                squareHtml += "style='background-color:" + color + ";'"

            }
            squareHtml += ">"
            squareHtml += square.getName() + "<br>"
            
            // Add all the property info if it is a property square as html
            if (square instanceof PropertySquare) {
                const property = square.getProperty()
                squareHtml += "Color: " + property.getColor() + "<br>"
                squareHtml += "Price: " + property.getPrice() + "<br>"
                squareHtml += "Rent: " + property.getRent() + "<br>"
                // owner
                squareHtml += "Owner: " + property.getOwner() + "<br>"
                // houses
                squareHtml += "Houses: " + property.getNumBuildings() + "<br>"
                // upgrade cost
                squareHtml += "Upgrade Cost: " + property.getUpgradeCost() + "<br>"
                // mortgaged
                squareHtml += "Mortgaged: " + property.isMortgaged() + "<br>"
            }
            // If it is a tax square, add the tax amount as html
            if (square instanceof TaxSquare) {
                squareHtml += "Tax: " + square.getTaxAmount() + "<br>"
            }
            // If it is a go square, add the go amount as html
            if (square instanceof GoSquare) {
                squareHtml += "Collect: " + square.getPayAmount() + "<br>"
            }
            squareHtml += "<hr></div>"

            // Close row element
            if (i % 10 == 9) { // Close row
                squareHtml += "</div>"
            }
        }
        return squareHtml;
    }

    getGameInfoHtml(board) {
        // Return the html for the game info
        let gameInfoHtml = "";
        // Add the player info
        gameInfoHtml += "<div class='players'>"
        for (let i = 0; i < board.players.length; i++) {
            let player = board.players[i];
            gameInfoHtml += "<div class='player'"
            if (board.currentPlayer == player) {
                gameInfoHtml += "style='background-color:LightGreen;'"
            }
            gameInfoHtml += ">"
            gameInfoHtml += "Player: " + player.getName() + "<br>"
            gameInfoHtml += "Position: " + board.squares[player.getPosition()].getName() + " (" + player.getPosition() +") <br>"
            gameInfoHtml += "Balance: " + player.getBalance() + "<br>"
            gameInfoHtml += "Properties: " + player.getProperties() + "<br>"
            gameInfoHtml += "</div>"
        }
        gameInfoHtml += "</div>"
        
        // Add card deck info
        gameInfoHtml += "<div class='card-decks'>"
        let chanceDeckHtml = "<div class='card-deck' style='background-color:Coral;' >"
        for (let i = 0; i < board.chanceDeck.cards.length; i++) {
            chanceDeckHtml += "<div class='card'>"
            chanceDeckHtml += board.chanceDeck.cards[i].getDescription() + "<br>"
            chanceDeckHtml += "</div>"
        }
        chanceDeckHtml += "</div>"
        gameInfoHtml += chanceDeckHtml

        let communityChestDeckHtml = "<div class='card-deck' style='background-color:PowderBlue;'>"
        for (let i = 0; i < board.communityChestDeck.cards.length; i++) {
            communityChestDeckHtml += "<div class='card'>"
            communityChestDeckHtml += board.communityChestDeck.cards[i].getDescription() + "<br>"
            communityChestDeckHtml += "</div>"
        }
        gameInfoHtml += communityChestDeckHtml


        return gameInfoHtml;
    }

}


export default Full
