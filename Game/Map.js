class Map {
    constructor() {
        this.width = TILE_MAP_WIDTH;
        this.height = TILE_MAP_WIDTH;
        this.map = [];
        this.initializeMap();
        this.createMap();
        this.generateRocks();
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

    addHorizontalRoad(startVector, endVector) {
        if(startVector.y !== endVector.y) throw new Error('Horizontal road must have same start-y and end-y values');
        if(startVector.x > endVector.x) throw new Error('Horizontal road must have larger end-x than start-x')
        const y = startVector.y;

        for(var i = startVector.x; i <= endVector.x; i++) {
            this.map[i][y] = ROAD;
        }
    }

    addVerticalRoad(startVector, endVector) {
        if(startVector.x !== endVector.x) throw new Error('Vertical road must have same start-x and end-x values');
        if(startVector.y > endVector.y) throw new Error('Horizontal road must have larger end-y than start-y')
        const x = startVector.x;

        for(var i = startVector.y; i <= endVector.y; i++) {
            this.map[x][i] = ROAD;
        }
    }

    addRock(vector) {
        this.map[vector.x][vector.y] = ROCK;
    }

    createMap() {
        this.addHorizontalRoad(new Vector(10, 5), new Vector(40, 5));
        this.addVerticalRoad(new Vector(40, 5), new Vector(40, 40));
        this.addHorizontalRoad(new Vector(20, 40), new Vector(40, 40));
        this.addVerticalRoad(new Vector(20, 15), new Vector(20, 40));
        this.addHorizontalRoad(new Vector(10, 15), new Vector(20, 15));
        this.addVerticalRoad(new Vector(10, 5), new Vector(10, 15));
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

    update() {
        //update car
        //
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