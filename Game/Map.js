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

    lengthToVector(vector, otherVector) {
        return vector.lengthTo(otherVector);
    }

    getBestTileToGetBackToRoad(carVector, noopVector, leftVector, rightVector, nextCheckPointVector) {
        var possibleVectors = []
        for(var i = carVector.x - 5; i < carVector.x + 5 ; i++) {
            for(var j = carVector.y - 5; j < carVector.x + 5 ; j++) {
                var possibleVector = new Vector(i, j)
                if(this.map[possibleVector.x][possibleVector.y] === ROAD) possibleVectors.push(possibleVector);
            }
        }
        var bestRoadTile = this.getClosestRoadTiles(possibleVectors, nextCheckPointVector);
        var noopLengthToBestRoadTile = this.lengthToVector(noopVector, bestRoadTile);
        var leftLengthToBestRoadTile = this.lengthToVector(leftVector, bestRoadTile); 
        var rightLengthToBestRoadTile = this.lengthToVector(rightVector, bestRoadTile); 
        var bestLength = Math.max(noopLengthToBestRoadTile, leftLengthToBestRoadTile, rightLengthToBestRoadTile);
        if (bestLength == noopLengthToBestRoadTile) return NOOP;
        if (bestLength == leftLengthToBestRoadTile) return LEFT;
        if (bestLength == rightLengthToBestRoadTile) return RIGHT;
        return -1;
    }

    getClosestRoadTiles(possibleVectors, nextCheckPointVector) {
        var lengths = []
        for(var i = 0; i < possibleVectors.length; i++) {
            lengths.push(this.lengthToVector(possibleVectors[i], nextCheckPointVector));
        }
        var bestVector = lengths[lengths.indexOf(Math.min(lengths))];
        return bestVector;
    }

    getClosestToCheckPoint(noopVector, leftVector, RightVector, nextCheckPointVector) {
        const noopLength = this.lengthToVector(noopVector, nextCheckPointVector)
        const leftLength = this.lengthToVector(leftVector, nextCheckPointVector)
        const rightLength = this.lengthToVector(RightVector, nextCheckPointVector)
        const minimumLength = Math.min(Number(noopLength), Number(leftLength), Number(rightLength));
        if(minimumLength === noopLength) return NOOP;
        if(minimumLength === leftLength) return LEFT;
        if(minimumLength === rightLength) return RIGHT;
        throw new Error('Could not calculate minimum value!');
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
        const noopTileIsNonDesiredTile = noopTile === GRASS || noopTile === ROCK || noopTile == HORIZONTAL_WALL || noopTile == VERTICAL_WALL;

        const leftTileWithinBorder = leftVector.x < TILE_MAP_WIDTH && leftVector.y < TILE_MAP_WIDTH;
        const leftTileIsDesiredTile = leftTile === ROAD || leftTile === CHECKPOINT || leftTile === GOAL;
        const leftTileIsNonDesiredTile = leftTile === GRASS || leftTile === ROCK || leftTile == HORIZONTAL_WALL || leftTile == VERTICAL_WALL;

        const rightTileWithinBorder = rightVector.x < TILE_MAP_WIDTH && rightVector.y < TILE_MAP_WIDTH;
        const rightTileIsDesiredTile = rightTile === ROAD || rightTile === CHECKPOINT || rightTile === GOAL;
        const rightTileIsNonDesiredTile = rightTile === GRASS || rightTile === ROCK || rightTile == HORIZONTAL_WALL || rightTile == VERTICAL_WALL;

        //const bestAction = this.getBestTileToGetBackToRoad(carVector, noopVector, leftVector, rightVector, nextCheckPointVector);
        if(noopTileWithinBorder && noopTileIsDesiredTile) return NOOP;
        if(leftTileWithinBorder && leftTileIsDesiredTile) return LEFT;
        if(rightTileWithinBorder && rightTileIsDesiredTile) return RIGHT;
        //return bestAction;
        
        if(noopTileWithinBorder && noopTileIsNonDesiredTile) return NOOP;
        if(leftTileWithinBorder && leftTileIsNonDesiredTile) return LEFT;
        if(rightTileWithinBorder && rightTileIsNonDesiredTile) return RIGHT;
        return NOOP;
    }

    getCheckpoints() {
        return this.checkPoints;
    }

    render(context) {
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