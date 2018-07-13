/**
 * Coordinates of x and y to place objects on the canvas
 */
class Grid {
    constructor({ objectSize, margin, numberOfLines, objectsPerLine }) {
        this.size = objectSize;
        this.margin = margin;
        this.lines = numberOfLines;
        this.oPerLine = objectsPerLine;
        this.grid = [];
        this.prepareGrid();
    }
    prepareGrid() {
        let x = 0, y = 0;
        for (var horizontalLine = 0; horizontalLine < this.lines; horizontalLine++) {
            y = horizontalLine ? y + this.margin + this.size : y + this.margin; // no need extra margin for first
            for (var verticalColumn = 0; verticalColumn < this.oPerLine; verticalColumn++) {
                x = verticalColumn ? x + this.margin + this.size : x + this.margin;
                this.grid.push({
                    x: x,
                    y: y
                });
            }
            x = 0;
        }
    }
    get() {
        return this.grid;
    }
}
//# sourceMappingURL=Grid.js.map