import Square from "./Square"

class PropertySquare extends Square {
  constructor(property) {
    super(property.getName())
    this.property = property
  }

  getProperty() {
    return this.property
  }
}

export default PropertySquare
