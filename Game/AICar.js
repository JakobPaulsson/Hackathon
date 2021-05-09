class AICar {
  constructor(checkPoints, startX, startY) {
    this.center = new Vector(startX, startY);
    this.velocity = ROAD_VELOCITY; //meters/second
    this.angle = START_ANGLE; //radians
    this.turningLeft = false;
    this.turningRight = false;
    this.currentLap = 1;
    this.currentCheckpoint = 0;
    this.checkPoints = checkPoints;
    this.bestMove = NOOP;
  }

  /**
   * @function
   * @summary Rotates the car
   * @param {Float} angle angle in radians
   */
  rotate(angle) {
    this.angle = this.angle + angle;
  }

  testRotate(startAngle, angle) {
    return startAngle + angle;
  }

  testMove(testVector, testAngle, testVelocity) {
    testVector.x += Math.cos(testAngle) * testVelocity;
    testVector.y += Math.sin(testAngle) * testVelocity;
    return testVector;
  }

  testAllMoves() {
    const leftMoveVector = this.testLeft();
    const rightMoveVector = this.testRight();
    const noopMoveVector = this.testNoop();
    const testMoves = [];
    testMoves[LEFT] = leftMoveVector;
    testMoves[RIGHT] = rightMoveVector;
    testMoves[NOOP] = noopMoveVector;
    return testMoves;
  }

  testLeft() {
    var testVector = new Vector(0, 0);
    testVector.x = this.center.x;
    testVector.y = this.center.y;
    var testAngle = this.angle;
    var testVelocity = this.velocity;
    for (var i = 0; i < TEST_STEPS; i++) {
      testAngle = this.testRotate(testAngle, -TURNING_SPEED);
      testVector = this.testMove(testVector, testAngle, testVelocity);
    }
    return testVector;
  }

  testRight() {
    var testVector = new Vector(0, 0);
    testVector.x = this.center.x;
    testVector.y = this.center.y;
    var testAngle = this.angle;
    var testVelocity = this.velocity;
    for (var i = 0; i < TEST_STEPS; i++) {
      testAngle = this.testRotate(testAngle, TURNING_SPEED);
      testVector = this.testMove(testVector, testAngle, testVelocity);
    }
    return testVector;
  }

  testNoop() {
    var testVector = new Vector(0, 0);
    testVector.x = this.center.x;
    testVector.y = this.center.y;
    var testAngle = this.angle;
    var testVelocity = this.velocity;
    for (var i = 0; i < TEST_STEPS; i++) {
      testVector = this.testMove(testVector, testAngle, testVelocity);
    }
    return testVector;
  }

  /**
   * @function
   * @summary Moves the car according to the velocity and angle
   */
  move() {
    this.center.x += Math.cos(this.angle) * this.velocity;
    this.center.y += Math.sin(this.angle) * this.velocity;
  }

  restart() {
    this.center.x = START_X;
    this.center.y = START_Y;
    this.angle = START_ANGLE;
  }

  checkTurn() {
    if (this.turningLeft) this.rotate(-TURNING_SPEED);
    if (this.turningRight) this.rotate(TURNING_SPEED);
  }

  checkGoal() {
    if (this.currentCheckpoint === NUMBER_OF_CHECKPOINTS) {
      this.currentLap++;
      this.currentCheckpoint = 0;
    }
  }

  checkPoint() {
    if(this.currentCheckpoint === NUMBER_OF_CHECKPOINTS) return;
    for (var i = 0; i < this.checkPoints[this.currentCheckpoint].length; i++) {
      if (
        Math.floor(this.center.x) ===
          this.checkPoints[this.currentCheckpoint][i].x &&
        Math.floor(this.center.y) ===
          this.checkPoints[this.currentCheckpoint][i].y
      ) {
        this.currentCheckpoint++;
        return;
      }
    }
  }

  bounceHorizontal() {
    this.angle = 2 * Math.PI - this.angle;
    this.move();
  }

  bounceVertical() {
    this.angle = Math.PI - this.angle;
    this.move();
  }

  checkTile(tile) {
    if (tile === GRASS) this.velocity = GRASS_VELOCITY;
    if (tile === ROAD) this.velocity = ROAD_VELOCITY;
    if (tile === ROCK) this.restart();
    if (tile === HORIZONTAL_WALL) this.bounceHorizontal();
    if (tile === VERTICAL_WALL) this.bounceVertical();
    if (tile === GOAL) this.checkGoal();
    if (tile === CHECKPOINT) this.checkPoint();
  }

  update(tile, bestMove) {
    this.checkTile(tile);
    if (bestMove === -1)
      throw new Error("The calculated best move is undefined!");
    if (bestMove === RIGHT) {
      this.turningLeft = false;
      this.turningRight = true;
    }
    if (bestMove === LEFT) {
      this.turningRight = false;
      this.turningLeft = true;
    }
    this.move();
    this.checkTurn();
    this.bestMove = bestMove;
  }

  nextMoveStringified() {
    const nextMove = this.bestMove;
    var nextMoveString = ";"
    if(nextMove === NOOP) nextMoveString = "NOOP";
    if(nextMove === LEFT) nextMoveString = "LEFT";
    if(nextMove === RIGHT) nextMoveString = "RIGHT";
    return nextMoveString;
  }

  render(context) {
    const rectangleWidth = CANVAS_WIDTH / TILE_MAP_WIDTH;
    context.fillStyle = "#4254f5";
    context.fillRect(
      rectangleWidth * this.center.x,
      rectangleWidth * this.center.y,
      10,
      10
    );
    context.fillStyle = "#ffffff";
    context.font = "30px Arial";
    context.fillText(
      "AI checkpoint: " + this.currentCheckpoint + "/" + NUMBER_OF_CHECKPOINTS,
      40,
      55
    );
    context.fillText(
      "AI lap: " + this.currentLap + "/" + LAPS,
      40,
      90
    );
  }

  carToString() {
    return "x: " + this.center.x.toFixed(2) + " y: " + this.center.y.toFixed(2) + " angle: " + this.angle.toFixed(2) + " nextMove: " + this.nextMoveStringified();
  }
}
