/**
 * This file contains the Property model.
 * It represents a property in monopoly.
 * It keeps track of the property's name, price, rent, and owner.
 */
class Property {
    constructor(name, price, rentTiers, color) {
        this.name = name;
        this.price = price;
        this.rentTiers = rentTiers;
        this.currentRentTier = 0;
        this.owner = null;
        this.mortgaged = false;
        this.color = color;
    }

    getRent() {
        return this.rentTiers[this.currentRentTier];
    }

    build() {
        this.currentRentTier++;
    }
}

export default Property;