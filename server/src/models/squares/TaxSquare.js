import Square from "./Square"

class TaxSquare extends Square {
  constructor(taxAmount) {
    super("Tax Square")
    this.taxAmount = taxAmount
  }
}

export default TaxSquare
