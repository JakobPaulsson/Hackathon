//CANVAS
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 1000;

//GAME
const FPS = 60;
const LAPS = 3;
const NUMBER_OF_CHECKPOINTS = 3;

//CAR
const TURNING_SPEED = Math.PI / 32;
const START_X = 40;
const START_Y = 30;
const START_ANGLE = -Math.PI/2;
const ROAD_VELOCITY = 0.2;
const GRASS_VELOCITY = ROAD_VELOCITY/4;

//MAP
const TILE_MAP_WIDTH = 50;
const TILE_WIDTH = 10;
const NUMBER_OF_ROCKS = 200;

//TILES
const GRASS = 0;
const ROAD = 1;
const ROCK = 2;
const HORIZONTAL_WALL = 3;
const VERTICAL_WALL = 4;    
const GOAL = 5;
const CHECKPOINT = 6;

//AI
const TEST_STEPS = 25;
const RIGHT = 0;
const NOOP = 1;
const LEFT = 2;
const START_X_AI = 41;
const START_Y_AI = 30;