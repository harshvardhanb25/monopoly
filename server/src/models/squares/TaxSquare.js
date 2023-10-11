import Square from "./Square.js"

class TaxSquare extends Square {
  constructor(taxAmount) {
    super("Tax Square")
    this.taxAmount = taxAmount
  }

  getTaxAmount() {
    return this.taxAmount
  }
}

export default TaxSquare
