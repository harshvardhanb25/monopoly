import Board from "../../src/controllers/Board"

class Full {   

    singleTurnGame(){
        // Create a new board and run a game for a single turn
        let board = new Board(4);
        

        let squareHtml = getSquaresHtml(board);
        // Get the board div from the html
        let boardDiv = document.getElementById("board");
        // Set the board div's inner html to the squares html
        boardDiv.innerHTML = squareHtml;

    }

    squareHtml(board) {
        // Return the html for the squares on the board
        let squareHtml = "";
        for (let i = 0; i < board.squares.length; i++) {
            let square = board.squares[i];
            // Get the html for the square

            // Start with the name of the square formatted as html
            squareHtml += "<div class='square'>"
            squareHtml += square.getName() + "<br>"
            
            // Add all the property info if it is a property square as html
            if (square instanceof PropertySquare) {
                const property = square.getProperty()
                squareHtml += property.getName() + "<br>"
                squareHtml += "Price: " + property.getPrice() + "<br>"
                squareHtml += "Rent: " + property.getRent() + "<br>"
                // owner
                squareHtml += "Owner: " + property.getOwner() + "<br>"
                // houses
                squareHtml += "Houses: " + property.getNumBuildings() + "<br>"
                // upgrade cost
                squareHtml += "Upgrade Cost: " + property.getUpgradeCost() + "<br>"
                // mortgaged
                squareHtml += "Mortgaged: " + property.isMortgaged() + "<br>"
            }
            // If it is a tax square, add the tax amount as html
            if (square instanceof TaxSquare) {
                squareHtml += "Tax: " + square.getTaxAmount() + "<br>"
            }
            // If it is a go square, add the go amount as html
            if (square instanceof GoSquare) {
                squareHtml += "Go: " + square.getPayAmount() + "<br>"
            }
            squareHtml += "</div>"
        }
    }

}


export default Full
