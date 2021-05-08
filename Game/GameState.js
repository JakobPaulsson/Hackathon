class GameState {
  constructor() {
    this.map = new Map();
    this.car = new Car(new Vector(START_X, START_Y));
  }

  handleKeys(window) {
    this.car.handleKeysCar(window);
  }

  update() {
    this.car.update();
  }

  render(context) {
    this.map.render(context);
    this.car.render(context);
  }

  clear(context, width, height) {
    context.clearRect(0, 0, width, height);
  }

  gameStateToString() {
    return "Car: " + this.car.carToString() + "\nMap:\n" + this.map.mapToString() 
  }
}
