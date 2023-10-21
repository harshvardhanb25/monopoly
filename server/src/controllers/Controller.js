import Board from '../models/board/Board.js';
import HtmlView from '../views/HtmlView.js';

class Controller {
    constructor(board, view) {
        this.board = board;
        this.view = view;
    }

    // Method to update the view with the current state of the board
    // This method is called by the board when the state of the board changes
    updateView() {
        const boardState = this.board.getState();
        this.view.render(boardState);
    }

    // ****************
    // NOTIFY METHODS
    // ****************

    notifyRoll(roll){
        // Inform the view of the roll
        this.view.showRoll(roll)
    }
    
    notifyPosition(oldPosition){
        // Inform the view that the current players has 
        // moved so it should update
        // We need to tell the view the old position so it can
        // remove the player from the old position and/or animate the players as it wants
        this.view.showMove(oldPosition);
        // We only tell it the old position
        // Because the view can get the current position and the current player from the board

        // Optional function for moving animation
        // TODO as needed
    }
    
    notifyPayment(amount, fromPlayer, toPlayer){
        // Inform the view of the rent paid
        // TODO
        // If toPlayer == null , payment made to bank
        // If fromPLayer == null, payment made from bank
    }
    
    notifyCardDrawn(card){
        // Inform the view of the card drawn
        // TODO
    }


    // ****************
    // PROMPT METHODS
    // ****************

    promptPurchaseOrAuction(property, player) {
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
    
    promtPlayerActions(player) {
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
    
}

export default Controller;