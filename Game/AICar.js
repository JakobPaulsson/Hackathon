class AICar {
    constructor(checkPoints) {
        this.center = new Vector(START_X_AI, START_Y_AI);
        this.testCenter = new Vector(0, 0);
        this.testAngle = 0;
        this.velocity = ROAD_VELOCITY; //meters/second
        this.angle = START_ANGLE; //radians
        this.turningLeft = false;
        this.turningRight = false;
        this.currentLap = 1;
        this.currentCheckpoint = 0;
        this.checkPoints = checkPoints;
      }
    
      /**
       * @function
       * @summary Rotates the car
       * @param {Float} angle angle in radians
       */
      rotate(angle) {
        this.angle = this.angle + angle;
      }

      testRotate(angle) {

      }

      /*
      testMove() {
          this.testCenter.x = this.center.x;
          this.testCenter.y = this.center.y;
          this.testAngle.y = this.angle;
        for(var i = 0; i < TEST_STEPS; i++) {

        }

        return LEFT;
        return NOOP;
        return RIGHT;
      }
      */
    
      /**
       * @function
       * @summary Moves the car according to the velocity and angle
       */
      move() {
        this.center.x += Math.cos(this.angle) * this.velocity;
        this.center.y += Math.sin(this.angle) * this.velocity;
      }
    
      restart() {
        this.center.x = START_X;
        this.center.y = START_Y;
        this.angle = START_ANGLE;
      }
    
      checkTurn() {
        if (this.turningLeft) this.rotate(-TURNING_SPEED);
        if (this.turningRight) this.rotate(TURNING_SPEED);
      }
    
      checkGoal() {
        if(this.currentCheckpoint === NUMBER_OF_CHECKPOINTS) {
          this.currentCheckpoint = 0;
          this.currentLap++;
        }
      }
    
      checkPoint() {
        if(this.currentCheckpoint === NUMBER_OF_CHECKPOINTS) return;
        for(var i = 0; i < this.checkPoints[this.currentCheckpoint].length; i++) {
    
          if (
            Math.floor(this.center.x) === this.checkPoints[this.currentCheckpoint][i][0] &&
            Math.floor(this.center.y) === this.checkPoints[this.currentCheckpoint][i][1]
          ) {
            this.currentCheckpoint++;
            return;
          }
        }
      }
    
      bounceHorizontal() {
        this.angle = 2 * Math.PI - this.angle;
        this.move();  
      }
    
      bounceVertical() {
        this.angle = Math.PI - this.angle;
        this.move();
      }
    
      checkTile(tile) {
        if (tile === GRASS) this.velocity = GRASS_VELOCITY;
        if (tile === ROAD) this.velocity = ROAD_VELOCITY;
        if (tile === ROCK) this.restart();
        if (tile === HORIZONTAL_WALL) this.bounceHorizontal();
        if (tile === VERTICAL_WALL) this.bounceVertical();
        if (tile === GOAL) this.checkGoal();
        if (tile === CHECKPOINT) this.checkPoint();
      }
    
      update(tile) {
          //const moveToMake = this.testMove();
        this.checkTile(tile);
        this.move();
        this.checkTurn();
      }
    
      render(context) {
        const rectangleWidth = CANVAS_WIDTH / TILE_MAP_WIDTH;
        context.fillStyle = "#4254f5";
        context.fillRect(
          rectangleWidth * this.center.x,
          rectangleWidth * this.center.y,
          10,
          10
        );
      }
    
      AICarToString() {
        return `x: ${this.center.x.toFixed(2)} y: ${this.center.y.toFixed(
          2
        )} angle: ${this.angle.toFixed(2)}`;
        }
    }