class GameState {
  constructor(window) {
    this.window = window;
    this.map = new Map();
    this.car = new Car(new Vector(START_X, START_Y), window);
  }

  initialize() {}

  handleKeys() {
    this.car.handleKeysCar();
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
    return `Car: ${this.car.carToString()}`;
  }
}
