/**
 * This class represents a board in monopoly.
 * It keeps track of properties, ownership, mortgaged properties,
 * and manages the current state of the board
 */
import Player from "../players/Player.js"
import { genSquares } from "../../middlewares/genSquares.js"
import { roll } from "../../middlewares/diceRoll.js"
import {
    ActionSquare,
    ChanceSquare,
    CommunityChestSquare,
} from "../squares/ActionSquare.js"
import FreeParkingSquare from "../squares/FreeParkingSquare.js"
import GoSquare from "../squares/GoSquare.js"
import GoToJailSquare from "../squares/GoToJailSquare.js"
import JailSquare from "../squares/JailSquare.js"
import PropertySquare from "../squares/PropertySquare.js"
import TaxSquare from "../squares/TaxSquare.js"
import { getActionCardDecks } from "../../middlewares/cardDecks.js"
import { Card, MultiPlayerCard } from "../cards/Card.js"
import Controller from "../../controllers/Controller.js"
class Board {
    constructor(numPlayers) {
        this.squares = genSquares()
        this.players = this.initPlayers(numPlayers)
        this.currentPlayer = this.selectRandomPlayer(this.players)
        let [ chanceDeck, communityChestDeck ] = getActionCardDecks()
        this.chanceDeck = chanceDeck
        this.communityChestDeck = communityChestDeck

        this.controller = null;
    }

    // Update controller
    updateController(controller) {
        this.controller = controller;
    }

    initPlayers(numPlayers) {
        // Initialize players
        // We store players in an array
        const players = []
        for (let i = 0; i < numPlayers; i++) {
            players.push(new Player(`Player ${i + 1}`))
        }
        return players
    }

    selectRandomPlayer(players) {
        // Select a random player to start the game
        return players[Math.floor(Math.random() * players.length)]
    }

    playerTurn() {
        // This function is called when the player takes a turn
        // We roll the dice and move the player
        // We then check the square the player landed on
        // and perform the appropriate action
        const playerRoll = roll()
        // Synchrously call the controller so it can inform the view of the roll
        this.controller.notifyRoll(playerRoll)
        // console.log(playerRoll)

        this.movePlayer(playerRoll)
        const square = this.squares[this.currentPlayer.getPosition()]

        // Appropriate actions for the square the player is on
        this.handlePlayerLanding(square)

        // Handle interactive events such as mortgaging, building, trading, etc.
        this.controller.promtPlayerActions()

        // Check if the player rolled doubles
        // If the player rolled doubles, we need to roll again
        // If the player rolled doubles 3 times, we need to send the player to jail
        if (playerRoll["die1"] === playerRoll["die2"]) {
            this.currentPlayer.consecutiveDoubles++
            if (this.currentPlayer.consecutiveDoubles === 3) {
                this.currentPlayer.setPosition(10)
                this.currentPlayer.setJailStatus(true)
                this.currentPlayer.setJailTurns(0)
            }
        }
    }

    movePlayer(roll) {
        // Move the player by the number of spaces rolled
        // We need to check if the player passed go
        // If the player passed go, we need to give the player $200
        const oldPosition = this.currentPlayer.getPosition()
        const newPosition = oldPosition + roll.total
        if (newPosition >= this.squares.length) {
            this.currentPlayer.setBalance(this.currentPlayer.getBalance() + 200)
        }
        this.currentPlayer.setPosition(newPosition % this.squares.length)

        // Notify the view of the player's new position
        this.controller.notifyPosition(oldPosition)
    }

    handlePlayerLanding(square) {
        // Handle the player landing on a square
        // We need to check the type of square the player landed on
        // and perform the appropriate action
        if (square instanceof PropertySquare) {
            this.handlePropertySquare(square)
        } else if (square instanceof ActionSquare) {
            this.handleActionSquare(square)
        } else if (square instanceof TaxSquare) {
            this.handleTaxSquare(square)
        } else if (square instanceof GoToJailSquare) {
            this.handleGoToJailSquare(square)
        } else if (square instanceof JailSquare) {
            this.handleJailSquare(square)
        } else if (square instanceof FreeParkingSquare) {
            this.handleFreeParkingSquare(square)
        } else {
            throw new Error("Invalid square type")
        }
    }

    handlePropertySquare(square) {
        // Handle the player landing on a property square
        // We need to check if the property is owned
        // If the property is owned, we need to pay rent
        // If the property is not owned, we need to give the player the option to buy the property
        const property = square.getProperty()
        if (property.getOwner() === null) {
            this.controller.promptPurchaseOrAuction(property, this.currentPlayer) // View will call model back 
                                                        // with who bought it and at what amount
        } else if (property.getOwner() === this.currentPlayer) {
            // Do nothing
        } else if (property.isMortgaged()) {
            // Do nothing
        } else {
            // Someone else owns the property
            // So we pay rent
            const rent = property.getRent()
            this.currentPlayer.setBalance(
                this.currentPlayer.getBalance() - rent
            )
            property.getOwner().setBalance(property.getOwner().getBalance() + rent)
            this.controller.notifyPayment(rent, this.currentPlayer, property.getOwner())
        }
    }

    handleActionSquare(square) {
        // Handle the player landing on an action square
        // We need to check the type of action square
        // and perform the appropriate action
        if (square instanceof ChanceSquare) {
            let drawnCard = this.chanceDeck.drawCard()
            this.controller.notifyCardDrawn(drawnCard)
            this.applyCardAction(drawnCard)
        } else if (square instanceof CommunityChestSquare) {
            let drawnCard = this.communityChestDeck.drawCard()
            this.controller.notifyCardDrawn(drawnCard)
            this.applyCardAction(drawnCard)
        } else {
            throw new Error("Invalid action square type")
        }
    }
    
    applyCardAction(drawnCard) {
        // Apply the action of the card
        if (drawnCard instanceof MultiPlayerCard) {
            // Filter out this player 
            const otherPlayers = this.players.filter((player) => player !== this.currentPlayer)
            drawnCard.applyAction(this.currentPlayer, otherPlayers)
        } else {
            drawnCard.applyAction(this.currentPlayer)
        }
    }

    handleTaxSquare(square) {
        // Handle the player landing on a tax square
        // We check the tax amount and deduct that from the player
        const tax = square.getTaxAmount()
        this.currentPlayer.setBalance(this.currentPlayer.getBalance() - tax)

        // TODO Handle insufficient funds
    }

    handleGoToJailSquare(square) {
        // Handle the player landing on the go to jail square
        // We send the player to jail
        this.currentPlayer.setPosition(10)
        this.currentPlayer.setJailStatus(true)
        this.currentPlayer.setJailTurns(0)
    }

    handleJailSquare(square) {
        // Handle the player landing on the jail square
        // Nothing Just visiting
    }

    handleFreeParkingSquare(square) {
        // Handle the player landing on the free parking square
        // Free parking
        // Room for house rules
    }

    getPlayers() {
        return this.players
    }

    getCurrentPlayer() {
        return this.currentPlayer
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player
    }

    getSquares() {
        return this.squares
    }

    setSquares(squares) {
        this.squares = squares
    }

    getSquare(position) {
        return this.squares[position]
    }


    prettyPrintCompleteState() {
        // Pretty print the complete state of the board like a proper monopoly board
        // We need to print the players, properties, houses, hotels, etc.
        
        // Start with the board tiles
        // We need to print the players on each tile
        // We need to print the houses and hotels on each tile
        // We need to print the properties on each tile
        // We need to print the mortgaged properties on each tile
        // We need to print the owner of each property on each tile
        // We need to print the rent of each property on each tile
        
        for (let i = 0; i < this.squares.length; i++) {
            const square = this.squares[i]
            console.log(square)
            if (square instanceof PropertySquare) {
                const property = square.getProperty()
                console.log(property)
            }
        }

        // Print the players
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i]
            console.log(player)
        }

        // Print the properties
        for (let i = 0; i < this.squares.length; i++) {
            const square = this.squares[i]
            
        }

        // Print the card deck
        console.log(this.chanceDeck)
        console.log(this.communityChestDeck)


    }

}

export default Board;