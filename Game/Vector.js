class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    compare(vector) {
        if(!vector?.x || !vector?.y) throw new Error('Cannot compare with non-vector!');
        return this.x === vector.x && this.y === vector.y;
    }

    lengthTo(vector) {
        if(!vector?.x || !vector?.y) throw new Error('Cannot compare with non-vector!');
        return Math.sqrt((this.x-vector.x)**2+(this.y-vector.y)**2);
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