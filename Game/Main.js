function run() {
  //Playing area
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  let gameState = new GameState(window);
  const interval = startingScreen(gameState, context);
  setTimeout(function () {
    runGame(gameState, context, window);
    clearInterval(interval);
  }
  , 4000);
}

function runGame(gameState, context, window) {
  setInterval(function () {
    gameState.clear(context, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameState.handleKeys(window);
    gameState.update();
    gameState.render(context);
  }, 1000/FPS);
}

function startingScreen(gameState, context) {
  var timeUntilStart = 3;
  gameState.render(context);
  const interval = setInterval(function () {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameState.render(context);
    context.fillStyle = "#ffffff";
    context.font = "90px Arial";
    context.fillText(
      timeUntilStart,
      CANVAS_WIDTH/2,
      CANVAS_HEIGHT/2
    );
    timeUntilStart--;
  }, 1000);
  return interval;
}



