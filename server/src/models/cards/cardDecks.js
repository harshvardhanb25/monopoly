import { Card,  MultiPlayerCard } from "./Card"
import CardDeck from "./CardDeck"

function genCardArrays() {
    chanceCardDeck = []
    communityChestCardDeck = []

    // Common actions and cards

    const advanceToGoAction = (player) => {
        player.setPosition(0)
        // Collect $200
        player.setBalance(player.getBalance() + 200)
    }
    chanceCardDeck.push(
        new Card("Advance to Go (Collect $200)", advanceToGoAction)
    )
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

    chanceCardDeck.push(
        new Card("Get Out of Jail Free", getOutOfJailFreeAction)
    )
    communityChestCardDeck(
        new Card("Get Out of Jail Free", getOutOfJailFreeAction)
    )

    // Chance actions and cards

    const advanceToIllinoisAveAction = (player) => {
        // If you pass go, collect $200
        if (player.getPosition() > 24) {
            player.setBalance(player.getBalance() + 200)
        }
        player.setPosition(24)
    }
    chanceCardDeck.push(
        new Card(
            "Advance to Illinois Avenue. If you pass Go, collect $200",
            advanceToIllinoisAveAction
        )
    )

    const advanceToBoardwalkAction = (player) => {
        player.setPosition(39)
    }
    chanceCardDeck.push(
        new Card("Advance to Boardwalk", advanceToBoardwalkAction)
    )

    const advanceToStCharlesPlaceAction = (player) => {
        // If you pass go, collect $200
        if (player.getPosition() > 11) {
            player.setBalance(player.getBalance() + 200)
        }
        player.setPosition(11)
    }
    chanceCardDeck.push(
        new Card(
            "Advance to St. Charles Place. If you pass Go, collect $200",
            advanceToStCharlesPlaceAction
        )
    )

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
    chanceCardDeck.push(
        new Card(
            "Advance to the nearest Railroad. If unowned, you may buy it from the Bank. If owned, pay wonder twice the rental to which they are otherwise entitled",
            advanceToNearestRailroadAction
        )
    )

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
    chanceCardDeck.push(
        new Card(
            "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times amount thrown.",
            advanceToNearestUtilityAction
        )
    )

    const bankPaysYouDividendAction = (player) => {
        player.setBalance(player.getBalance() + 50)
    }
    chanceCardDeck.push(
        new Card("Bank pays you dividend of $50", bankPaysYouDividendAction)
    )

    const goBackThreeSpacesAction = (player) => {
        player.setPosition(player.getPosition() - 3)
    }
    chanceCardDeck.push(new Card("Go back 3 spaces", goBackThreeSpacesAction))

    const makeGeneralRepairsAction = (player) => {
        // For each house $25, for each hotel $100
        player.getProperties().forEach((p) => {
            if (p.getNumBuildings() === 5) {
                player.setBalance(player.getBalance() - 100)
            } else {
                player.setBalance(
                    player.getBalance() - 25 * p.getNumBuildings()
                )
            }
        })
    }
    chanceCardDeck.push(
        new Card(
            "Make general repairs on all your property. For each house pay $25. For each hotel pay $100",
            makeGeneralRepairsAction
        )
    )

    const speedingFineAction = (player) => {
        player.setBalance(player.getBalance() - 15)
    }
    chanceCardDeck.push(new Card("Speeding fine $15", speedingFineAction))

    const readingRailroadAction = (player) => {
        // If pass go collect $200
        if (player.getPosition() > 5) {
            player.setBalance(player.getBalance() + 200)
        }
        player.setPosition(5)
    }
    chanceCardDeck.push(
        new Card(
            "Take a trip to Reading Railroad. If you pass Go, collect $200",
            readingRailroadAction
        )
    )

    const chairmanOfTheBoardAction = (player, otherplayers) => {
        // Pay $50 to each player
        otherplayers.forEach((p) => {
            if (p !== player) {
                p.setBalance(p.getBalance() + 50)
            }
        })
        player.setBalance(player.getBalance() - 50 * (otherplayers.length - 1))
    }
    chanceCardDeck.push(
        new MultiPlayerCard(
            "You have been elected Chairman of the Board. Pay each player $50",
            chairmanOfTheBoardAction
        )
    )

    const buildingAndLoanMaturesAction = (player) => {
        player.setBalance(player.getBalance() + 150)
    }
    chanceCardDeck.push(
        new Card(
            "Your building loan matures. Collect $150",
            buildingAndLoanMaturesAction
        )
    )

    // Community Chest Actions and cards

    const bankErrorInYourFavorAction = (player) => {
        player.setBalance(player.getBalance() + 200)
    }
    communityChestCardDeck.push(
        new Card(
            "Bank error in your favor. Collect $200",
            bankErrorInYourFavorAction
        )
    )

    const doctorsFeeAction = (player) => {
        player.setBalance(player.getBalance() - 50)
    }
    communityChestCardDeck.push(
        new Card("Doctor's fee. Pay $50", doctorsFeeAction)
    )

    const saleOfStockAction = (player) => {
        player.setBalance(player.getBalance() + 50)
    }
    communityChestCardDeck.push(
        new Card("From sale of stock you get $50", saleOfStockAction)
    )

    const holidayFundMaturesAction = (player) => {
        player.setBalance(player.getBalance() + 100)
    }
    communityChestCardDeck.push(
        new Card("Holiday Fund matures. Receive $100", holidayFundMaturesAction)
    )

    const incomeTaxRefundAction = (player) => {
        player.setBalance(player.getBalance() + 20)
    }
    communityChestCardDeck.push(
        new Card("Income tax refund. Collect $20", incomeTaxRefundAction)
    )

    const itsYourBirthdayAction = (player, otherplayers) => {
        // Collect $10 from each player
        otherplayers.forEach((p) => {
            if (p !== player) {
                p.setBalance(p.getBalance() - 10)
            }
        })
        player.setBalance(player.getBalance() + 10 * (otherplayers.length - 1))
    }
    communityChestCardDeck.push(
        new MultiPlayerCard(
            "It's your birthday. Collect $10 from each player",
            itsYourBirthdayAction
        )
    )

    const lifeInsuranceMaturesAction = (player) => {
        player.setBalance(player.getBalance() + 100)
    }
    communityChestCardDeck.push(
        new Card(
            "Life insurance matures. Collect $100",
            lifeInsuranceMaturesAction
        )
    )

    const hospitalFeesAction = (player) => {
        player.setBalance(player.getBalance() - 100)
    }
    communityChestCardDeck.push(
        new Card("Pay hospital fees of $100", hospitalFeesAction)
    )

    const schoolFeesAction = (player) => {
        player.setBalance(player.getBalance() - 50)
    }
    communityChestCardDeck.push(
        new Card("Pay school fees of $50", schoolFeesAction)
    )

    const receiveConsultancyFeeAction = (player) => {
        player.setBalance(player.getBalance() + 25)
    }
    communityChestCardDeck.push(
        new Card("Receive $25 consultancy fee", receiveConsultancyFeeAction)
    )

    const streetRepairsAction = (player) => {
        // For each house $40, for each hotel $115
        player.getProperties().forEach((p) => {
            if (p.getNumBuildings() === 5) {
                player.setBalance(player.getBalance() - 115)
            } else {
                player.setBalance(
                    player.getBalance() - 40 * p.getNumBuildings()
                )
            }
        })
    }
    communityChestCardDeck.push(
        new Card(
            "You are assessed for street repairs. $40 per house, $115 per hotel",
            streetRepairsAction
        )
    )

    const beautyContestAction = (player) => {
        player.setBalance(player.getBalance() + 10)
    }
    communityChestCardDeck.push(
        new Card(
            "You have won second prize in a beauty contest. Collect $10",
            beautyContestAction
        )
    )

    const inheritAction = (player) => {
        player.setBalance(player.getBalance() + 100)
    }
    communityChestCardDeck.push(new Card("You inherit $100", inheritAction))

    return {
        chanceCardArray: chanceCardDeck,
        communityChestCardArray: communityChestCardDeck,
    }
}

function getActionCardDecks() {
    const { chanceCardArray, communityChestCardArray } = genCardArrays()
    const chanceCardDeck = new CardDeck(chanceCardDeck)
    const communityChestCardDeck = new CardDeck(communityChestCardDeck)
    chanceCardDeck.shuffle()
    communityChestCardDeck.shuffle()
    return { chanceCardDeck, communityChestCardDeck }
}

export { getActionCardDecks }
