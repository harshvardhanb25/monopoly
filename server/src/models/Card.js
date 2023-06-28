class Card {
    constructor(description, action) {
        this.description = description
        this.action = action
    }

    applyAction(player) {
        this.action(player)
    }
}

export default Card
