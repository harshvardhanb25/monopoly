import Controller from "../controllers/Controller.js";
import Board from "../models/board/Board.js";

import PropertySquare from "../../src/models/squares/PropertySquare.js"
import TaxSquare from "../../src/models/squares/TaxSquare.js"
import GoSquare from "../../src/models/squares/GoSquare.js"

class HtmlView {
    constructor(controller) {
        this.controller = controller;
    }

    // Update controller
    updateController(controller) {
        this.controller = controller;
    }

    showRoll(roll) {
        // Log the roll to the console
        console.log(`Player rolled ${roll.die1} and ${roll.die2} for a total of ${roll.total}`)
    }

    showMove(oldPosition) {
        // Log the position to the console
        console.log(`Player moved from ${oldPosition} to ${this.controller.board.getCurrentPlayer().getPosition()}`)
    }

    getSquaresHtml() {
        // Return the html for the squares on the board
        let squareHtml = "";
        for (let i = 0; i < this.controller.board.squares.length; i++) {
            
            // Add row element for every 11 squares
            if (i % 10 == 0) {
                squareHtml += "<div class='row'>"
            }

            let square = this.controller.board.squares[i];
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

    getGameInfoHtml() {
        // Return the html for the game info
        let gameInfoHtml = "";
        // Add the player info
        gameInfoHtml += "<div class='players'>"
        for (let i = 0; i < this.controller.board.players.length; i++) {
            let player = this.controller.board.players[i];
            gameInfoHtml += "<div class='player'"
            if (this.controller.board.currentPlayer == player) {
                gameInfoHtml += "style='background-color:LightGreen;'"
            }
            gameInfoHtml += ">"
            gameInfoHtml += "Player: " + player.getName() + "<br>"
            gameInfoHtml += "Position: " + this.controller.board.squares[player.getPosition()].getName() + " (" + player.getPosition() +") <br>"
            gameInfoHtml += "Balance: " + player.getBalance() + "<br>"
            gameInfoHtml += "Properties: " + player.getProperties() + "<br>"
            gameInfoHtml += "</div>"
        }
        gameInfoHtml += "</div>"
        
        // Add card deck info
        gameInfoHtml += "<div class='card-decks'>"
        let chanceDeckHtml = "<div class='card-deck' style='background-color:Coral;' >"
        for (let i = 0; i < this.controller.board.chanceDeck.cards.length; i++) {
            chanceDeckHtml += "<div class='card'>"
            chanceDeckHtml += this.controller.board.chanceDeck.cards[i].getDescription() + "<br>"
            chanceDeckHtml += "</div>"
        }
        chanceDeckHtml += "</div>"
        gameInfoHtml += chanceDeckHtml

        let communityChestDeckHtml = "<div class='card-deck' style='background-color:PowderBlue;'>"
        for (let i = 0; i < this.controller.board.communityChestDeck.cards.length; i++) {
            communityChestDeckHtml += "<div class='card'>"
            communityChestDeckHtml += this.controller.board.communityChestDeck.cards[i].getDescription() + "<br>"
            communityChestDeckHtml += "</div>"
        }
        gameInfoHtml += communityChestDeckHtml


        return gameInfoHtml;
    }
}

export default HtmlView;