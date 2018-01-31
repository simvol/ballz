var MOVING_DIRECTIONS;
(function (MOVING_DIRECTIONS) {
    MOVING_DIRECTIONS[MOVING_DIRECTIONS["STOPPED"] = 0] = "STOPPED";
    MOVING_DIRECTIONS[MOVING_DIRECTIONS["UP"] = 1] = "UP";
    MOVING_DIRECTIONS[MOVING_DIRECTIONS["DOWN"] = 2] = "DOWN";
    MOVING_DIRECTIONS[MOVING_DIRECTIONS["LEFT"] = 3] = "LEFT";
    MOVING_DIRECTIONS[MOVING_DIRECTIONS["RIGHT"] = 4] = "RIGHT";
})(MOVING_DIRECTIONS || (MOVING_DIRECTIONS = {}));
/**
 * Action moving is happening here.
 * Animator triggers ball position update with defined interval.
 * It stopps when the ball hits bottom line.
 * Animator modified properties of the objects passed in.
 * @param: updateSpeedMS - sort of FPS, how often we recalculate positions (miliseconds)
 * @param: nextElementDelaysMS - miliseconds delay how fast next object start moving
 * @param: movingDirection -
 */
var Animator = /** @class */ (function () {
    function Animator(_a) {
        var updateSpeedMS = _a.updateSpeedMS, nextElementDelayMS = _a.nextElementDelayMS, movingDirection = _a.movingDirection;
        this.isMoving = false;
        this.updateSpeedMS = updateSpeedMS || 1;
        this.nextElementDelayMS = nextElementDelayMS || 1;
        this.movingDirection = movingDirection || MOVING_DIRECTIONS.UP;
    }
    Animator.prototype.startMoving = function (movingObjects) {
        var _this = this;
        var nextElementDelay = 0;
        this.isMoving = true;
        movingObjects.forEach(function (movObj) {
            nextElementDelay += _this.nextElementDelayMS;
            setTimeout(function () {
                movObj.setIsMoving(true);
                _this.startMovingObject(movObj);
            }, nextElementDelay);
        });
    };
    Animator.prototype.startMovingObject = function (obj) {
        var moveFeedback;
        this.interval = (function () {
            if (obj.isMoving === true) {
                //there should be a function that updates the ball x y
                // but also tells us when to stop moving
                // one thing is to return {x, y}, but how do we return x y moving
                moveFeedback = getUpdatedMoveInfo(obj);
            }
        });
    };
    Animator.prototype.getUpdateMoveInfo = function (obj) {
        var mInfo;
        return mInfo;
    };
    Animator.prototype.setUpdateSpeed = function (s) {
        this.updateSpeedMS = s;
    };
    Animator.prototype.setNextElementDelay = function (d) {
        this.nextElementDelayMS = d;
    };
    Animator.prototype.setMovingDirection = function (d) {
        this.movingDirection = d;
    };
    Animator.prototype.setIsMoving = function (m) {
        this.isMoving = m;
    };
    return Animator;
}());
//Move ball until it hits bottom border
function makeMovingBall(balls) {
    var movingSpeed = 1;
    var ballIsMovingDown = null;
    var ballTouchedBottomBorder = null;
    var interval = null;
    var timeoutS = 0;
    balls.forEach(function (ball) {
        timeoutS += 100;
        setTimeout(function () {
            interval = setInterval(function () {
                calculatePosition(ball, squares);
                ballIsMovingDown = ball.yDirectionStep > 0;
                var bottomBorder = cHeight - radius;
                if (ballIsMovingDown) {
                    ballTouchedBottomBorder = ball.y >= bottomBorder;
                    if (ballTouchedBottomBorder) {
                        // console.log('b.y: ' + ball.y + '-' + (cHeight + radius));
                        clearInterval(interval);
                        ball.y = bottomBorder; //if close move down/up to match border
                        forward();
                        //Update image
                        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        console.log('STOPPED');
                    }
                }
                drawBasicBall(ball, 'green');
                document.getElementById('ballY').innerHTML = ball.y;
                document.getElementById('ballX').innerHTML = ball.x;
                document.getElementById('canHeight').innerHTML = cHeight;
                document.getElementById('canHeightRad').innerHTML = cHeight + radius;
            }, movingSpeed);
        }, timeoutS);
    });
}
//# sourceMappingURL=Animator.js.map