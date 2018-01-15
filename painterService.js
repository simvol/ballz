
// A service to draw stuff
var Painter = function(context){

    var ctx = context;

    return {
        sayHi: function(){
            console.log('Hi ', ctx);
        },
        drawLine: function (line){
            ctx.lineWidth = line.width;
            ctx.strokeStyle = line.color;
            ctx.beginPath();
            ctx.moveTo(line.start.x, line.start.y);
            ctx.lineTo(line.end.x,line.end.y);
            ctx.stroke();
        }
    }
};