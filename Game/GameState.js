class GameState {
  constructor(map, car /*, AICar*/) {
    this.map = map;
    this.car = car;
  }

  handleKeys(window) {
    window.addEventListener("keydown", this.handleKeysDown, false);
    window.addEventListener("keyup", this.handleKeysUp, false);
  }

  handleKeysDown(event) {
    const key = event.keyCode;
    switch (key) {
      //a=65 or left-arrow=37
      case 65:
      case 37:
        break;

      //d=68 or right-arrow=39
      case 68:
      case 39:
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
        break;
      //d=68 or right-arrow=39
      case 68:
      case 39:
        break;
      default:
        console.log("unhandled key: " + event.keyCode);
        break;
    }
  }

  update() {
    //update car
    //
  }

  render(context) {
    context.fillRect(100, 100, 100, 100);
  }

  clear(context, width, height) {
    context.clearRect(0, 0, width, height);
  }
}
