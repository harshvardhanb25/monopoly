import Square from './Square.js';

class GoSquare extends Square {
  constructor(payAmount) {
    super("Go");
    this.payAmount = payAmount;
  }

  getPayAmount() {
    return this.payAmount;
  }
}

export default GoSquare;