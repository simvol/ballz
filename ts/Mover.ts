

enum MOVING_DIRECTIONS {
    STOPPED,
    UP,
    DOWN,
    LEFT,
    RIGHT
}

/**
 * Action moving is happening here.
 * Mover triggers ball position update with defined interval.
 * It stopps when the ball hits bottom line.
 * Mover modified properties of the objects passed in.
 * @param updateSpeedMS sort of FPS, how often we recalculate positions (miliseconds)
 * @param nextElementDelaysMS miliseconds delay how fast next object start moving
 * @param movingDirection  
 * @param playground (required) gives us size of the field, to bounce/stop moving object
 */
class Mover {
    private updateSpeedMS: number;
    private nextElementDelayMS: number;
    private movingDirection: MOVING_DIRECTIONS;
    private isMoving: boolean = false;
    private playground: PlaygroundSize;

    constructor({
        updateSpeedMS = 1,
        nextElementDelayMS = 1,
        movingDirection = MOVING_DIRECTIONS.UP,
        playground
    }) {
        this.updateSpeedMS = updateSpeedMS;
        this.nextElementDelayMS = nextElementDelayMS;
        this.movingDirection = movingDirection;
        this.playground = playground;
    }

    public startMoving (movingObjects: Movable[], obstacles: Obstacle[]): void{
        let nextElementDelay = 0;
        this.isMoving = true;

        movingObjects.forEach(movObj => {
            nextElementDelay += this.nextElementDelayMS;

            setTimeout( () => {
                movObj.setIsMoving(true);
                this.startAction(movObj, obstacles);
            }, nextElementDelay);
        });
    }

    /**
     * startAction will update 
     *      Movable object position and moving state
     *      Obstacle object lifespan
     */
    private startAction (movingObj: Movable, obstacles: Obstacle[] = []): void {
        let moveFeedback: MoveInfo;
        let interval = setInterval( () => {
            if (movingObj.isMoving === true) {

                //there should be a function that updates the ball x y
                // but also tells us when to stop moving
                // one thing is to return {x, y}, but how do we return x y moving
                moveFeedback = this.getUpdatedMoveInfo(movingObj, obstacles);

                movingObj.setIsMoving(moveFeedback.isMoving);
                movingObj.setX(movingObj.x + moveFeedback.xDirection);
                movingObj.setY(movingObj.y + moveFeedback.yDirection);

                //draw ball somewhere here
                movingObj.draw();
                //or just autodraw it each time we update direction?
            } else {
                clearInterval(interval);
            }
        });
    }

    private getUpdatedMoveInfo(obj: Movable, obstacles: Obstacle[]): MoveInfo {
        let mInfo: MoveInfo;

        //perform some logic and change xDirection yDirection and isMoving
        // - getting square sides

        //It is harder with squares, because they will disappear. So we need to redraw them
        // while balls are flying around.
        // Maybe we also should use this object reference
        let horizontalDirection = obj.xDirection > 0 ?
            MOVING_DIRECTIONS.RIGHT :
            MOVING_DIRECTIONS.LEFT;

        let verticalDirection = obj.yDirection > 0 ?
            MOVING_DIRECTIONS.DOWN :
            MOVING_DIRECTIONS.UP;

        let hits = this.getPlaygroundHits(horizontalDirection, verticalDirection, obj);

        let hasHits = Object.keys(hits).filter(h => hits[h] === true ).length > 0;

        //hit playground border
        if (hasHits) {
            return this.prepareMoveInfo(hits, obj);
        } 

        //hit obsticles
        if (obstacles) {
            hits = this.getObstacleHits(horizontalDirection, verticalDirection, obj);
            return this.prepareMoveInfo(hits, obj);
        }

        return mInfo;
    }

    private getPlaygroundHits(
        horizontalDirection: MOVING_DIRECTIONS,
        verticalDirection: MOVING_DIRECTIONS,
        obj: Movable
    ): any {
        let hits = {
            left: horizontalDirection === MOVING_DIRECTIONS.LEFT && obj.left <= 0,
            right: horizontalDirection === MOVING_DIRECTIONS.RIGHT && obj.right >= this.playground.width,
            top: verticalDirection === MOVING_DIRECTIONS.UP && obj.top <= 0,
            bottom: verticalDirection === MOVING_DIRECTIONS.DOWN && obj.bottom >= this.playground.height
        };

        return hits;
    }

    private getObstacleHits(
        horizontalDirection: MOVING_DIRECTIONS,
        verticalDirection: MOVING_DIRECTIONS,
        obj: Movable
    ): any {

        //hit obsticle logic

    }

    //MoveInfo has new directions and moving state, use it to update moving objects
    private prepareMoveInfo (hits, obj): MoveInfo {
        return {
            //if hit a playground border - reverse
            xDirection: (hits.left || hits.right) ? obj.xDirection * -1 : obj.xDirection,

            //if hits top
            yDirection: (hits.top || hits.bottom) ? obj.yDirection * -1 : obj.yDirection,

            //!!!! Do we need to move this logic somewhere so it is flexible and we can stop moving
            //!!!! base on some other conditions?
            isMoving: hits.bottom ? false : true
        }
    }
 
    setUpdateSpeed (s: number) {
        this.updateSpeedMS = s;
    }

    setNextElementDelay (d: number) {
        this.nextElementDelayMS = d;
    }

    setMovingDirection (d: MOVING_DIRECTIONS) {
        this.movingDirection = d;
    }

    setIsMoving (m: boolean) {
        this.isMoving = m;
    }


}