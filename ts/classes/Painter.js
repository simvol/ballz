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
    drawSquare(square) {
        this.context.fillStyle = this.rgbaToString(square.color);
        this.context.fillRect(square.x, square.y, square.size, square.size);
        var xOffset = square.number > 10 ? 2.6 : 2.4;
        var yOffset = 1.8;
        this.writeNumber(square.number, square.x + squareSize / xOffset, square.y + squareSize / yOffset);
    }
    eraseSquare(square) {
        this.context.fillStyle = this.rgbaToString({ r: 255, g: 255, b: 255, a: 1 });
        this.context.fillRect(square.x, square.y, square.size, square.size);
    }
    writeNumber(number, x, y) {
        ctx.fillStyle = '#333';
        ctx.fillText(number, x, y);
    }
    rgbaToString(rgba) {
        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
    }
}
//# sourceMappingURL=Painter.js.map