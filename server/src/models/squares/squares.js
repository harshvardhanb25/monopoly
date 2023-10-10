// Create all the squares for the board in monopoly
import {
    ChanceSquare,
    CommunityChestSquare,
} from "../models/squares/ActionSquare"
import FreeParkingSquare from "../models/squares/FreeParkingSquare"
import GoSquare from "../models/squares/GoSquare"
import GoToJailSquare from "./squares/GoToJailSquare"
import JailSquare from "../models/squares/JailSquare"
import PropertySquare from "../models/squares/PropertySquare"
import TaxSquare from "../models/squares/TaxSquare"
import { genProperties } from "../models/properties/properties"


export function genSquares() {
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