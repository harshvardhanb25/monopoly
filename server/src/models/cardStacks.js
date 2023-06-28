import Card from "./Card"

chanceCardDeck = []
communityChestCardDeck = []

// Common actions and cards

const advanceToGoAction = (player) => {
    player.setPosition(0)
    // Collect $200
    player.setBalance(player.getBalance() + 200)
}
chanceCardDeck.push(new Card("Advance to Go (Collect $200)", advanceToGoAction))
communityChestCardDeck.push(
    new Card("Advance to Go (Collect $200)", advanceToGoAction)
)

const goToJailAction = (player) => {
    player.setPosition(10)
    player.setJailStatus(true)
}

chanceCardDeck.push(
    new Card(
        "Go to Jail. Go directly to Jail, do not pass Go, do not collect £200",
        goToJailAction
    )
)
communityChestCardDeck.push(
    new Card(
        "Go to Jail. Go directly to Jail, do not pass Go, do not collect £200",
        goToJailAction
    )
)

const getOutOfJailFreeAction = (player) => {
    player.addGetOutOfJailCard()
}

chanceCardDeck.push(new Card("Get Out of Jail Free", getOutOfJailFreeAction))
communityChestCardDeck(new Card("Get Out of Jail Free", getOutOfJailFreeAction))

// Chance actions and cards

const advanceToIllinoisAveAction = (player) => {
    // If you pass go, collect $200
    if (player.getPosition() > 24) {
        player.setBalance(player.getBalance() + 200)
    }
    player.setPosition(24)
}



const advanceToBoardwalkAction = (player) => {
    player.setPosition(39)
}

const advanceToStCharlesPlaceAction = (player) => {
    // If you pass go, collect $200
    if (player.getPosition() > 11) {
        player.setBalance(player.getBalance() + 200)
    }
    player.setPosition(11)
}

const advanceToNearestRailroadAction = (player) => {
    if (player.getPosition() < 5) {
        player.setPosition(5)
    } else if (player.getPosition() < 15) {
        player.setPosition(15)
    } else if (player.getPosition() < 25) {
        player.setPosition(25)
    } else if (player.getPosition() < 35) {
        player.setPosition(35)
    } else {
        player.setPosition(5)
        // Passing go
        player.setBalance(player.getBalance() + 200)
    }
    // TODO: Pay double rent if owned
    // Add rent modifier to double rent
}

const advanceToNearestUtilityAction = (player) => {
    if (player.getPosition() < 12) {
        player.setPosition(12)
    } else if (player.getPosition() < 28) {
        player.setPosition(28)
    } else {
        player.setPosition(12)
        // Passing go
        player.setBalance(player.getBalance() + 200)
    }
    // TODO: Pay double rent if owned
    // Add rent modifier to double rent
}

const bankPaysYouDividendAction = (player) => {
    player.setBalance(player.getBalance() + 50)
}

const goBackThreeSpacesAction = (player) => {
    player.setPosition(player.getPosition() - 3)
}

const makeGeneralRepairsAction = (player) => {
    // For each house $25, for each hotel $100
    // TODO
}

const speedingFineAction = (player) => {
    player.setBalance(player.getBalance() - 15)
}

const readingRailroadAction = (player) => {
    // If pass go collect $200
    if (player.getPosition() > 5) {
        player.setBalance(player.getBalance() + 200)
    }
    player.setPosition(5)
}

const chairmanOfTheBoardAction = (player, otherplayers) => {
    // Pay $50 to each player
    otherplayers.forEach((p) => {
        if (p !== player) {
            p.setBalance(p.getBalance() + 50)
        }
    })
    player.setBalance(player.getBalance() - 50 * (otherplayers.length - 1))
}

const buildingAndLoanMaturesAction = (player) => {
    player.setBalance(player.getBalance() + 150)
}

// Community Chest Actions and cards
