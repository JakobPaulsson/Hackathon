class GameState {
  constructor() {
    this.map = new Map();
    this.car = new Car(this.map.getCheckpoints());
    this.aicar = new AICar(this.map.getCheckpoints(), START_X_AI, START_Y_AI);
  }

  handleKeys(window) {
    this.car.handleKeysCar(window);
  }

  update() {
    //AI
    const aiCarVector = new Vector(Math.floor(this.aicar.center.x), Math.floor(this.aicar.center.y))
    const testVectors = this.aicar.testAllMoves();
    const currentCheckpoint = this.aicar.currentCheckpoint;
    const bestMove = this.map.getBestMove(testVectors, aiCarVector, currentCheckpoint);
    const aiTile = this.map.getTile(aiCarVector);
    this.aicar.update(aiTile, bestMove);

    //PLAYER
    const carVector = new Vector(Math.floor(this.car.center.x), Math.floor(this.car.center.y))
    const tile = this.map.getTile(carVector);
    this.car.update(tile);
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
