class Car {
  /**
   *
   * @param {Vector} center vector for the middle point of the car
   */
  constructor(center, window) {
    this.center = center;
    this.velocity = 3; //meters/second
    this.angle = 0; //radians
    this.turningLeft = false;
    this.turningRight = false;
    this.window = window;
  }

  handleKeysCar() {
    this.window.addEventListener("keydown", (event) => {
        this.handleKeysDown(event);
    });
    this.window.addEventListener("keyup", (event) => {
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
        console.log("unhandled key: " + event.keyCode);
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
        console.log("unhandled key: " + event.keyCode);
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

  update() {
    this.move();
    console.log(this.turningLeft);
    if (this.turningLeft) this.rotate(-TURNING_SPEED);
    if (this.turningRight) this.rotate(TURNING_SPEED);
  }

  render(context) {
    context.fillRect(this.center.x, this.center.y, 10, 10);
  }

  carToString() {
    return `x: ${this.center.x.toFixed(2)} y: ${this.center.y.toFixed(
      2
    )} angle: ${this.angle.toFixed(2)}`;
  }
}
