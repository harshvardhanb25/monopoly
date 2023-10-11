import Square from "./Square.js"

class ActionSquare extends Square {
  constructor(name) {
    super(name)
  }
}

class ChanceSquare extends ActionSquare {
  constructor() {
    super("Chance Square")
  }
}

class CommunityChestSquare extends ActionSquare {
  constructor() {
    super("Community Chest Square")
  }
}

export {ActionSquare, ChanceSquare, CommunityChestSquare}

