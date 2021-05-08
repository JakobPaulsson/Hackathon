class Map {
    constructor() {
        this.width = TILE_MAP_WIDTH;
        this.height = TILE_MAP_WIDTH;
        this.map = [[]];
    }

    initializeMap() {
        for(var i = 0; i < TILE_MAP_WIDTH; i++) {
            for(var j = 0; j < TILE_MAP_WIDTH; j++) {
                this.map[i][j] = 0;
            }
        }
    }

    addHorizontalRoad(startVector, endVector) {

    }

    addVerticalRoad(startVector, endVector) {

    }

    createMap() {

    }

    update() {
        //update car
        //
    }

    render() {
        
    }

    toString() {
        return this.map;
    }
}