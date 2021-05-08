function run() {
  //Constants
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 600;
  const FPS = 60;

  //Playing area
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
 

  let gameState = new GameState(null, null);
  setInterval(function () {
    gameState.clear(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameState.handleKeys(window);
    gameState.update();
    gameState.render(context);
  }, FPS / 1000);
}


