class Painter {
    constructor(context) {
        this.context = context;
    }
    drawBall(ball) {
        this.context.beginPath();
        this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * PI, false);
        this.context.fillStyle = `rgb(${ball.color.r}, ${ball.color.g}, ${ball.color.b})`;
        this.context.fill();
    }
    drawLine(line) {
        this.context.lineWidth = line.width;
        this.context.strokeStyle = line.color;
        this.context.beginPath();
        this.context.moveTo(line.start.x, line.start.y);
        this.context.lineTo(line.end.x, line.end.y);
        this.context.stroke();
    }
}
//# sourceMappingURL=Painter.js.map