function run() {
  //Playing area
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  let gameState = new GameState(window);
  setInterval(function () {
    gameState.clear(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameState.handleKeys(window);
    gameState.update();
    gameState.render(context);
  }, 1000/FPS);
  console.log(gameState.gameStateToString());
}


