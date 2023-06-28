class Card {
    constructor(description, action) {
        this.description = description
        this.action = action
    }

    applyAction(player) {
        this.action(player)
    }
}

class MultiPlayerCard extends Card {
    constructor(description, action) {
        super(description, action)
    }

    applyAction(player, otherplayers) {
        this.action(players, otherplayers)
    }
}

export { Card, MultiPlayerCard }
