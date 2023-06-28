/**
 * This class represents a board in monopoly.
 * It keeps track of properties, ownership, mortgaged properties,
 * and manages the current state of the board
 */
import Property from "./Property"
import Player from "./Player"
import properties from "./properties"
import { roll, roll } from "../middlewares/dice-roll"
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

class Board {
    constructor(numPlayers) {
        this.squares = initSquares()
        this.players = this.initPlayers(numPlayers)
        this.currentPlayer = selectRandomPlayer(this.players)
    }

    initSquares() {
        // Initialize squares
        // Initialize the state of the board
        // Start with the go square and we go clockwise on the board
        // We cover all the squares on the board and store them in an array
        const squares = []
        squares.push(new GoSquare()) // 0
        squares.push(new PropertySquare(this.properties[0])) // 1
        squares.push(new CommunityChestSquare()) // 2
        squares.push(new PropertySquare(this.properties[1])) // 3
        squares.push(new TaxSquare(200)) // 4
        squares.push(new RailroadSquare(this.properties[22])) // 5
        squares.push(new PropertySquare(this.properties[2])) // 6
        squares.push(new ChanceSquare()) // 7
        squares.push(new PropertySquare(this.properties[3])) // 8
        squares.push(new PropertySquare(this.properties[4])) // 9
        squares.push(new JailSquare()) // 10
        squares.push(new PropertySquare(this.properties[5])) // 11
        squares.push(new UtilitySquare(this.properties[26])) // 12
        squares.push(new PropertySquare(this.properties[6])) // 13
        squares.push(new PropertySquare(this.properties[7])) // 14
        squares.push(new RailroadSquare(this.properties[23])) // 15
        squares.push(new PropertySquare(this.properties[8])) // 16
        squares.push(new CommunityChestSquare()) // 17
        squares.push(new PropertySquare(this.properties[9])) // 18
        squares.push(new PropertySquare(this.properties[10])) // 19
        squares.push(new FreeParkingSquare()) // 20
        squares.push(new PropertySquare(this.properties[11])) // 21
        squares.push(new ChanceSquare()) // 22
        squares.push(new PropertySquare(this.properties[12])) // 23
        squares.push(new PropertySquare(this.properties[13])) // 24
        squares.push(new RailroadSquare(this.properties[24])) // 25
        squares.push(new PropertySquare(this.properties[14])) // 26
        squares.push(new PropertySquare(this.properties[15])) // 27
        squares.push(new UtilitySquare(this.properties[27])) // 28
        squares.push(new PropertySquare(this.properties[16])) // 29
        squares.push(new GoToJailSquare()) // 30
        squares.push(new PropertySquare(this.properties[17])) // 31
        squares.push(new PropertySquare(this.properties[18])) // 32
        squares.push(new CommunityChestSquare()) // 33
        squares.push(new PropertySquare(this.properties[19])) // 34
        squares.push(new RailroadSquare(this.properties[25])) // 35
        squares.push(new ChanceSquare()) // 36
        squares.push(new PropertySquare(this.properties[20])) // 37
        squares.push(new TaxSquare(100)) // 38
        squares.push(new PropertySquare(this.properties[21])) // 39

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
        const roll = roll()

        this.movePlayer(roll["total"])
        const square = this.squares[this.currentPlayer.getPosition()]

        // DO Appropriate actions for the square the player is on
        // TODO

        // Check if the player rolled doubles
        // If the player rolled doubles, we need to roll again
        // If the player rolled doubles 3 times, we need to send the player to jail
        if (roll["die1"] === roll["die2"]) {
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
}
