class GameState {
  constructor() {
    this.map = new Map();
    this.car = new Car(this.map.getCheckpoints());
    this.aicar = new AICar(this.map.getCheckpoints());
  }

  handleKeys(window) {
    this.car.handleKeysCar(window);
  }

  update() {
    const carVector = new Vector(Math.floor(this.car.center.x), Math.floor(this.car.center.y))
    const aiCarVector = new Vector(Math.floor(this.aicar.center.x), Math.floor(this.aicar.center.y))
    const tile = this.map.getTile(carVector);
    const aiTile = this.map.getTile(aiCarVector);
    this.car.update(tile);
    this.aicar.update(aiTile);
  }

  render(context) {
    this.map.render(context);
    this.car.render(context);
    this.aicar.render(context);
  }

  clear(context, width, height) {
    context.clearRect(0, 0, width, height);
  }

  gameStateToString() {
    return "Car: " + this.car.carToString() + "\nMap:\n" + this.map.mapToString() 
  }
}
