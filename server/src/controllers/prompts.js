function promptPurchaseOrAuction(property, player) {
    // Ask the view to handle the auction
    // TODO

    // How do I want to handle the result?
    // Option 1: 
    //     The view handles the auction and returns the winner and winning bid
    //     this function goes all the way back till the board where the auction Prompt call originated
    // Option 2:
    //     The view handles the auction and calls 
    //     the model directly to tell it that someone bought a property for x amount
    // Option 2 is what we will do
}

function promtPlayerActions(player) {
    // Ask the view to handle the player actions
    // TODO

    // How do I want to handle the result?
    // Option 1: 
    //     The view handles the player actions and returns the result
    //     this function goes all the way back till the board where the playerActionsPrompt call originated
    // Option 2:
    //     The view handles the player actions and calls 
    //     the model directly to tell it that the player did x action

    // Leaning towards option 2 in both cases above
}

