import Square from './Square';

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