/**
 * This class represents a board in monopoly.
 * It keeps track of properties, ownership, mortgaged properties,
 * and manages the current state of the board
 */
import Property from "./properties/Property"
import Player from "./players/Player"
import { genProperties } from "./properties/properties"
import { roll } from "../middlewares/dice-roll"
import {
    ActionSquare,
    ChanceSquare,
    CommunityChestSquare,
} from "./squares/ActionSquare"
import FreeParkingSquare from "./squares/FreeParkingSquare"
import GoSquare from "./squares/GoSquare"
import GoToJailSquare from "./squares/GoToJailSquare"
import JailSquare from "./squares/JailSquare"
import PropertySquare from "./squares/PropertySquare"
import TaxSquare from "./squares/TaxSquare"
import { getActionCardDecks } from "./cards/cardDecks"

class Board {
    constructor(numPlayers) {
        this.squares = initSquares()
        this.players = this.initPlayers(numPlayers)
        this.currentPlayer = selectRandomPlayer(this.players)
        const { chanceDeck, communityChestDeck } = getActionCardDecks()
        this.chanceDeck = chanceDeck
        this.communityChestDeck = communityChestDeck
    }

    initSquares() {
        // Initialize squares
        // Initialize the state of the board
        // Start with the go square and we go clockwise on the board
        // We cover all the squares on the board and store them in an array
        const squares = []
        const properties = genProperties()
        squares.push(new GoSquare()) // 0
        squares.push(new PropertySquare(properties[0])) // 1
        squares.push(new CommunityChestSquare()) // 2
        squares.push(new PropertySquare(properties[1])) // 3
        squares.push(new TaxSquare(200)) // 4
        squares.push(new RailroadSquare(properties[22])) // 5
        squares.push(new PropertySquare(properties[2])) // 6
        squares.push(new ChanceSquare()) // 7
        squares.push(new PropertySquare(properties[3])) // 8
        squares.push(new PropertySquare(properties[4])) // 9
        squares.push(new JailSquare()) // 10
        squares.push(new PropertySquare(properties[5])) // 11
        squares.push(new UtilitySquare(properties[26])) // 12
        squares.push(new PropertySquare(properties[6])) // 13
        squares.push(new PropertySquare(properties[7])) // 14
        squares.push(new RailroadSquare(properties[23])) // 15
        squares.push(new PropertySquare(properties[8])) // 16
        squares.push(new CommunityChestSquare()) // 17
        squares.push(new PropertySquare(properties[9])) // 18
        squares.push(new PropertySquare(properties[10])) // 19
        squares.push(new FreeParkingSquare()) // 20
        squares.push(new PropertySquare(properties[11])) // 21
        squares.push(new ChanceSquare()) // 22
        squares.push(new PropertySquare(properties[12])) // 23
        squares.push(new PropertySquare(properties[13])) // 24
        squares.push(new RailroadSquare(properties[24])) // 25
        squares.push(new PropertySquare(properties[14])) // 26
        squares.push(new PropertySquare(properties[15])) // 27
        squares.push(new UtilitySquare(properties[27])) // 28
        squares.push(new PropertySquare(properties[16])) // 29
        squares.push(new GoToJailSquare()) // 30
        squares.push(new PropertySquare(properties[17])) // 31
        squares.push(new PropertySquare(properties[18])) // 32
        squares.push(new CommunityChestSquare()) // 33
        squares.push(new PropertySquare(properties[19])) // 34
        squares.push(new RailroadSquare(properties[25])) // 35
        squares.push(new ChanceSquare()) // 36
        squares.push(new PropertySquare(properties[20])) // 37
        squares.push(new TaxSquare(100)) // 38
        squares.push(new PropertySquare(properties[21])) // 39

        return squares
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

        this.movePlayer(playerRoll["total"])
        const square = this.squares[this.currentPlayer.getPosition()]

        // Appropriate actions for the square the player is on
        this.handlePlayerLanding(square)

        // Handle interactive events such as mortgaging, building, trading, etc.
        // TODO

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
        const newPosition = this.currentPlayer.getPosition() + roll.total
        if (newPosition >= this.squares.length) {
            this.currentPlayer.setBalance(this.currentPlayer.getBalance() + 200)
        }
        this.currentPlayer.setPosition(newPosition % this.squares.length)
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
            // TODO: Implement buy property
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
        }
    }

    handleActionSquare(square) {
        // Handle the player landing on an action square
        // We need to check the type of action square
        // and perform the appropriate action
        if (square instanceof ChanceSquare) {
            applyCardAction(this.communityChestDeck.drawCard())
        } else if (square instanceof CommunityChestSquare) {
            applyCardAction(this.communityChestDeck.drawCard())
        } else {
            throw new Error("Invalid action square type")
        }
    }
    
    applyCardAction(card) {
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

}
