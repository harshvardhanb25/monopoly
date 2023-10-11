/**
 * This file contains the Property model.
 * It represents a property in monopoly.
 * It keeps track of the property's name, price, rent, and owner.
 */
import { Color } from "./colors.js"

class Property {
    constructor(name, price, rentTiers, color) {
        this.name = name
        this.price = price
        this.rentTiers = rentTiers
        this.currentRentTier = 0
        this.owner = null
        this.mortgaged = false
        this.color = color
    }

    getRent() {
        return this.rentTiers[this.currentRentTier]
    }

    build() {
        if (this.color === Color.RAILROAD || this.color === Color.UTILITY) {
            return
        }
        if (this.currentRentTier === 5) {
            return
        }
        this.currentRentTier++
    }

    demolish() {
        if (this.color === Color.RAILROAD || this.color === Color.UTILITY) {
            return
        }
        if (this.currentRentTier === 0) {
            return
        }
        this.currentRentTier--
    }

    getUpgradeCost() {
        if (this.color === Color.RAILROAD) {
            return 0
        }
        if (this.color === Color.UTILITY) {
            return 0
        }
        if (this.currentRentTier === 5) {
            return 0
        }
        if (this.color === Color.BROWN || this.color === Color.LIGHTBLUE) {
            return 50
        }
        if (this.color === Color.PINK || this.color === Color.ORANGE) {
            return 100
        }
        if (this.color === Color.RED || this.color === Color.YELLOW) {
            return 150
        }
        if (this.color === Color.GREEN || this.color === Color.BLUE) {
            return 200
        }
    }

    getNumBuildings() {
        if (this.color === Color.RAILROAD || this.color === Color.UTILITY) {
            return 0
        }
        return this.currentRentTier
    }

    mortgage() {
        this.mortgaged = true
    }

    unmortgage() {
        this.mortgaged = false
    }

    isMortgaged() {
        return this.mortgaged
    }

    getName() {
        return this.name
    }

    getPrice() {
        return this.price
    }

    getOwner() {
        return this.owner
    }

    setOwner(owner) {
        this.owner = owner
    }

    getColor() {
        return this.color
    }

}

export default Property
