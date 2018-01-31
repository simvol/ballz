class Ball implements Movable {
    color: Color;
    x: number;
    y: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
    xDirection: number;
    yDirection: number;
    radius: number;
    isMoving: boolean = false;

    constructor({
        color = COLORS[0],
        x = 0,
        y = 0,
        xDirection = 1,
        yDirection = -1,
        radius = 10
    }) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.xDirection = xDirection;
        this.yDirection = yDirection;
        this.radius = radius;

        this.setLeftRight();
        this.setTopBottom();
    }

    setX(x: number) {
        this.erase();
        this.xDirection = this.x < x ? 1 : -1;
        this.x = x;
        this.setLeftRight();
    }

    setY(y: number) {
        this.erase();
        this.yDirection = this.y < y ? 1 : -1;
        this.y = y;
        this.setTopBottom();
    }

    private setLeftRight() {
        this.left = this.x - this.radius;
        this.right = this.x + this.radius;
    }

    private setTopBottom() {
        this.top = this.y - this.radius;
        this.bottom = this.y + this.radius;
    }

    setXDirection(xD: number) {
        this.xDirection = xD;
    }

    setYDirection(yD: number) {
        this.yDirection = yD;
    }

    setIsMoving(m: boolean) {
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