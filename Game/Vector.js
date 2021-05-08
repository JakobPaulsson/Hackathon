class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    get x() {
        return this.x;
    }

    get y() {
        return this.y;
    }
}