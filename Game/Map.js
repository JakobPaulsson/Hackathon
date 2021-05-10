class Map {
    constructor() {
        this.width = TILE_MAP_WIDTH;
        this.height = TILE_MAP_WIDTH;
        this.map = [];
        this.checkPoints = [];
        this.goal = [];
        this.initializeMap();
        this.createMap();
        this.generateRocks();
        this.generateWalls();
        this.chosenMove = -1;
    }

    initializeMap() {
        var array = new Array()
        for(var i = 0; i < TILE_MAP_WIDTH; i++) {
            array[i] = new Array();
            for(var j = 0; j < TILE_MAP_WIDTH; j++) {
                array[i][j] = 0;
            }
        }
        this.map = array;
    }

    addRoad(startVector, endVector) {
        if(startVector.x === endVector.x) {
            for(var i = startVector.y; i <= endVector.y; i++) {
                this.map[startVector.x+1][i] = ROAD;
                this.map[startVector.x][i] = ROAD;
                this.map[startVector.x-1][i] = ROAD;
            }
        } else if(startVector.y === endVector.y) {
            for(var i = startVector.x; i <= endVector.x; i++) {
                this.map[i][startVector.y+1] = ROAD;
                this.map[i][startVector.y] = ROAD;
                this.map[i][startVector.y-1] = ROAD;
            }
        } else {
            throw new Error('Invalid goal');
        }
    }

    addGoal(startVector, endVector) {
        if(startVector.x === endVector.x) {
            for(var i = startVector.y; i <= endVector.y; i++) {
                this.map[startVector.x][i] = GOAL;
            }
        } else if(startVector.y === endVector.y) {
            for(var i = startVector.x; i <= endVector.x; i++) {
                this.map[i][startVector.y] = GOAL;
            }
        } else {
            throw new Error('Invalid goal');
        }
        this.goal = [startVector, endVector];
    }

    addCheckPoint(startVector, endVector) {
        var checkPointTiles = [];
        if(startVector.x === endVector.x) {
            for(var i = startVector.y; i <= endVector.y; i++) {
                this.map[startVector.x][i] = CHECKPOINT;
                checkPointTiles.push(new Vector(startVector.x, i));
            }
        } else if(startVector.y === endVector.y) {
            for(var i = startVector.x; i <= endVector.x; i++) {
                this.map[i][startVector.y] = CHECKPOINT;
                checkPointTiles.push(new Vector(i, startVector.y));
            }
        } else {
            throw new Error('Invalid goal');
        }
        this.checkPoints.push(checkPointTiles);
    }
    
    addRock(vector) {
        this.map[vector.x][vector.y] = ROCK;
    }

    createMap() {
        this.addRoad(new Vector(10, 5), new Vector(40, 5));
        this.addRoad(new Vector(40, 5), new Vector(40, 40));
        this.addRoad(new Vector(20, 40), new Vector(40, 40));
        this.addRoad(new Vector(20, 15), new Vector(20, 40));
        this.addRoad(new Vector(10, 15), new Vector(20, 15));
        this.addRoad(new Vector(10, 5), new Vector(10, 15));
        this.addGoal(new Vector(39, 30), new Vector(41, 30));
        this.addCheckPoint(new Vector(39, 10), new Vector(41, 10));
        this.addCheckPoint(new Vector(15, 4), new Vector(15, 6));
        this.addCheckPoint(new Vector(19, 30), new Vector(21, 30));
    }

    generateRocks() {
        for(var i = 0; i < NUMBER_OF_ROCKS; i++) {
            var randomRock;
            do {
                var random1 =  Math.floor(Math.random() * 48) + 1
                var random2 = Math.floor(Math.random() * 48) + 1
                randomRock = new Vector(random1, random2);
            } while(this.map[randomRock.x][randomRock.y] === ROAD || 
                    this.map[randomRock.x+1][randomRock.y] === ROAD || 
                    this.map[randomRock.x-1][randomRock.y] === ROAD || 
                    this.map[randomRock.x][randomRock.y+1] === ROAD || 
                    this.map[randomRock.x][randomRock.y-1] === ROAD)
            this.map[randomRock.x][randomRock.y] = ROCK;
        }
    }

    generateWalls() {
        //First column
        for(var i = 0; i < TILE_MAP_WIDTH; i++) {
            this.map[0][i] = VERTICAL_WALL;
            this.map[TILE_MAP_WIDTH-1][i] = VERTICAL_WALL;
        }

        //Top and bottom rows
        for(var i = 1; i < TILE_MAP_WIDTH - 1; i++) {
            this.map[i][0] = HORIZONTAL_WALL;
            this.map[i][TILE_MAP_WIDTH - 1] = HORIZONTAL_WALL;
        }
    }

    getTile(vector) {
        return this.map[vector.x][vector.y];
    }
    
    getBestMove(testVectors, carVector, currentCheckpoint) {
        var nextCheckPointVector;

        //first coordinate of goal
        if(currentCheckpoint === NUMBER_OF_CHECKPOINTS) nextCheckPointVector = this.goal[0];
        
        //first coordinate of next checkpoint
        else nextCheckPointVector = this.checkPoints[currentCheckpoint][0];
        
        const noopVector = new Vector(Math.floor(testVectors[NOOP].x), Math.floor(testVectors[NOOP].y));
        const noopTile = this.map[noopVector.x][noopVector.y];

        const leftVector = new Vector(Math.floor(testVectors[LEFT].x), Math.floor(testVectors[LEFT].y))
        const leftTile = this.map[leftVector.x][leftVector.y]

        const rightVector = new Vector(Math.floor(testVectors[RIGHT].x), Math.floor(testVectors[RIGHT].y));
        const rightTile = this.map[rightVector.x][rightVector.y]

        const noopTileWithinBorder = noopVector.x < TILE_MAP_WIDTH && noopVector.y < TILE_MAP_WIDTH;
        const noopTileIsDesiredTile = noopTile === ROAD || noopTile === CHECKPOINT || noopTile === GOAL;

        const leftTileWithinBorder = leftVector.x < TILE_MAP_WIDTH && leftVector.y < TILE_MAP_WIDTH;
        const leftTileIsDesiredTile = leftTile === ROAD || leftTile === CHECKPOINT || leftTile === GOAL;

        const rightTileWithinBorder = rightVector.x < TILE_MAP_WIDTH && rightVector.y < TILE_MAP_WIDTH;
        const rightTileIsDesiredTile = rightTile === ROAD || rightTile === CHECKPOINT || rightTile === GOAL;

        if(noopTileWithinBorder && noopTileIsDesiredTile) return NOOP;
        if(leftTileWithinBorder && leftTileIsDesiredTile) return LEFT;
        if(rightTileWithinBorder && rightTileIsDesiredTile) return RIGHT;
        if(noopTileWithinBorder && noopTileIsDesiredTile) return NOOP;
        if(leftTileWithinBorder && leftTileIsDesiredTile) return LEFT;
        if(rightTileWithinBorder && rightTileIsDesiredTile) return RIGHT;
        return NOOP;
    }

    getCheckpoints() {
        return this.checkPoints;
    }

    render(context, testVectors) {
        const rectangleWidth = CANVAS_WIDTH/TILE_MAP_WIDTH;
        
        for(var i = 0; i < TILE_MAP_WIDTH; i++) {
            for(var j = 0; j < TILE_MAP_WIDTH; j++) {
                switch(this.map[i][j]) {
                    case GRASS:
                        context.fillStyle = "#21ab1a";
                        break;
                    case ROAD:
                        context.fillStyle = "#1c1c1b";
                        break;
                    case ROCK:
                        context.fillStyle = "#5c5c59";
                        break;
                    case HORIZONTAL_WALL:
                    case VERTICAL_WALL:
                        context.fillStyle = "#574000"
                        break;
                    case GOAL:
                        context.fillStyle = "#ffffff"
                        break;
                    case CHECKPOINT:
                        context.fillStyle = "#4254f5"
                }
                context.fillRect(i * rectangleWidth, j * rectangleWidth, rectangleWidth, rectangleWidth);
            }
        }
        context.fillStyle = "rgba(255, 0, 0, 0.8)";
        context.beginPath();
        context.arc(testVectors[NOOP].x * rectangleWidth, testVectors[NOOP].y * rectangleWidth, rectangleWidth/2, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.arc(testVectors[LEFT].x * rectangleWidth, testVectors[LEFT].y * rectangleWidth, rectangleWidth/2, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.arc(testVectors[RIGHT].x * rectangleWidth, testVectors[RIGHT].y * rectangleWidth, rectangleWidth/2, 0, 2 * Math.PI);
        context.fill();
        if(this.chosenMove !== -1) {
            context.fillStyle = "rgba(0, 255, 0, 0.8)";
            context.beginPath();
            context.arc(testVectors[this.chosenMove].x * rectangleWidth, testVectors[this.chosenMove].y * rectangleWidth, rectangleWidth/2, 0, 2 * Math.PI);
            context.fill();
        }
    }

    mapToString() {
        function transposeArray(array, arrayLength){
            var newArray = [];
            for(var i = 0; i < array.length; i++){
                newArray.push([]);
            };
        
            for(var i = 0; i < array.length; i++){
                for(var j = 0; j < arrayLength; j++){
                    newArray[j].push(array[i][j]);
                };
            };
        
            return newArray;
        }
        return JSON.stringify(transposeArray(this.map, TILE_MAP_WIDTH));
    }
}