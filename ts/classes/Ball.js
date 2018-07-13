class Ball {
    constructor({ color = COLORS[0], x = 0, y = 0, xDirection = 1, yDirection = -1, radius = 10 }) {
        this.isMoving = false;
        this.color = color;
        this.x = x;
        this.y = y;
        this.xDirection = xDirection;
        this.yDirection = yDirection;
        this.radius = radius;
        this.setLeftRight();
        this.setTopBottom();
    }
    setX(x) {
        this.erase();
        this.xDirection = this.x < x ? 1 : -1;
        this.x = x;
        this.setLeftRight();
    }
    setY(y) {
        this.erase();
        this.yDirection = this.y < y ? 1 : -1;
        this.y = y;
        this.setTopBottom();
    }
    setLeftRight() {
        this.left = this.x - this.radius;
        this.right = this.x + this.radius;
    }
    setTopBottom() {
        this.top = this.y - this.radius;
        this.bottom = this.y + this.radius;
    }
    setXDirection(xD) {
        this.xDirection = xD;
    }
    setYDirection(yD) {
        this.yDirection = yD;
    }
    setIsMoving(m) {
        this.isMoving = m;
    }
    draw() {
        painter.drawBall(this);
    }
    erase() {
        let ballToErase = Object.assign({}, this);
        ballToErase.color = BACKGROUND_COLOR.rgb;
        ballToErase.radius = this.radius + 1;
        painter.drawBall(ballToErase);
    }
}
//# sourceMappingURL=Ball.js.map