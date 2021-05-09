class Car {
  constructor(checkPoints) {
    this.center = new Vector(START_X, START_Y);
    this.velocity = ROAD_VELOCITY; //meters/second
    this.angle = START_ANGLE; //radians
    this.turningLeft = false;
    this.turningRight = false;
    this.currentLap = 1;
    this.currentCheckpoint = 0;
    this.checkPoints = checkPoints;
  }

  handleKeysCar(window) {
    window.addEventListener("keydown", (event) => {
      this.handleKeysDown(event);
    });
    window.addEventListener("keyup", (event) => {
      this.handleKeysUp(event);
    });
  }

  handleKeysDown(event) {
    const key = event.keyCode;
    switch (key) {
      //a=65 or left-arrow=37
      case 65:
      case 37:
        this.turningLeft = true;
        break;

      //d=68 or right-arrow=39
      case 68:
      case 39:
        this.turningRight = true;
        break;

      //s=83 or down-arrow=40
      case 83:
      case 40:
        break;

      //w=87 or up-arrow=38
      case 87:
      case 38:
        break;
      default:
        //console.log("unhandled key: " + event.keyCode);
        break;
    }
  }

  handleKeysUp(event) {
    const key = event.keyCode;
    switch (key) {
      //a=65 or left-arrow=37
      case 65:
      case 37:
        this.turningLeft = false;
        break;
      //d=68 or right-arrow=39
      case 68:
      case 39:
        this.turningRight = false;
        break;
      default:
        //console.log("unhandled key: " + event.keyCode);
        break;
    }
  }

  /**
   * @function
   * @summary Rotates the car
   * @param {Float} angle angle in radians
   */
  rotate(angle) {
    this.angle = this.angle + angle;
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
    if(this.currentCheckpoint === NUMBER_OF_CHECKPOINTS) {
      this.currentCheckpoint = 0;
      this.currentLap++;
    }
  }

  checkPoint() {
    if(this.currentCheckpoint === NUMBER_OF_CHECKPOINTS) return;
    for(var i = 0; i < this.checkPoints[this.currentCheckpoint].length; i++) {
      if (
        Math.floor(this.center.x) === this.checkPoints[this.currentCheckpoint][i].x &&
        Math.floor(this.center.y) === this.checkPoints[this.currentCheckpoint][i].y
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

  update(tile) {
    this.checkTile(tile);
    this.move();
    this.checkTurn();
  }

  render(context) {
    const rectangleWidth = CANVAS_WIDTH / TILE_MAP_WIDTH;
    context.fillStyle = "#ffff00";
    context.fillRect(
      rectangleWidth * this.center.x,
      rectangleWidth * this.center.y,
      10,
      10
    );
    context.fillStyle = "#ffffff";
    context.font = "30px Arial";
    context.fillText(
      "Current lap: " + this.currentLap + "/" + LAPS,
      CANVAS_WIDTH - 250,
      55
    );
  }

  carToString() {
    return `x: ${this.center.x.toFixed(2)} y: ${this.center.y.toFixed(
      2
    )} angle: ${this.angle.toFixed(2)}`;
  }
}
