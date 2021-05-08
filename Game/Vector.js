class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    compare(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    set xPos(x) {
        this.x = x;
    }

    set yPos(y) {
        this.y = y;
    }

    vectorToString() {
        return JSON.stringify(this);
    }
}