class Square implements Obstacle{
    color: Color;
    num: number;
    size: number;
    width: number;
    height: number;
    x: number;
    y: number;

    constructor({color, number, size, x, y}){
        this.color = this.getColor(number);
        this.num = number;
        this.size = size;
        this.width = this.height = size;
        this.x = x;
        this.y = y;
    }

    getColor(number: number): Color {
        let divider = 1;
        
        for (let i = 1; i < number.toString().length; i++) {
          divider *= 10;
        }
        
        let colorNumber = number > 10 ? Math.floor(number / divider) : 0;
        
        let opacity = (number - (Math.floor(number / divider) * divider)) / divider;
        
        opacity = opacity <= 0.4 ? 0.4 : opacity;
        opacity = opacity >= 10 ? 1 : opacity;
        
        // let color = 'rgba('
        //   + basicColors[colorNumber].r + ','
        //   + basicColors[colorNumber].g + ','
        //   + basicColors[colorNumber].b + ','
        //   + opacity + ')';

        let color = {
          r: COLORS[colorNumber].r,
          g: COLORS[colorNumber].g,
          b: COLORS[colorNumber].b,
          a: opacity
        };

        return color;
      }

}