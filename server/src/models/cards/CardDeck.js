class CardDeck {
    constructor(cards) {
        this.cards = cards
        this.currentCardIndex = 0
    }

    shuffle() {
        // Fisher-Yates shuffle
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = this.cards[i]
            this.cards[i] = this.cards[j]
            this.cards[j] = temp
        }
    }

    drawCard() {
        // We draw a card from the top of the pile and reinsert it at the bottom
        // We also return the card so that it may be acted upon
        const card = this.cards[this.currentCardIndex]
        this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length
        return card
    }

}

export default CardDeck