
//init here
console.clear();

const PI = Math.PI,
      PI2 = PI * 2;

const COLORS: Color[] = [
    {r:194,g:242,b:208},
    {r:139,g:157,b:195},
    {r:255,g:220,b:115},
    {r:223,g:149,b:99},
    {r:197,g:207,b:239},
    {r:104,g:123,b:90},
    {r:206,g:205,b:215},
    {r:59,g:89,b:152},
    {r:242,g:189,b:66},
    {r:0,g:191,b:255},
    {r:85,g:80,b:90},
    {r:246,g:184,b:184},
    {r:51,g:153,b:204}
];

const BACKGROUND_COLOR = {
    string: 'white',
    rgb: {r: 255, g: 255, b: 255}
};

let canvas = document.getElementById('canvas'),
    ctx = (canvas as any).getContext('2d'),
    cWidth = canvas.clientWidth,
    cHeight = canvas.clientHeight,

    //used to erase aiming line while mouse is moving
    imageData = null, 

    //class implementing drawing functions
    painter = new Painter(ctx),

    mover = null,

    squaresPerLine = 7,

    //distance between squares
    squareMargin = 10,
    squareSize = (cWidth / squaresPerLine) - (squareMargin * 1.1),

    //number of lines of squares that fit into canvas of chosen height
    numberOfLines = Math.floor(cHeight / (squareSize + squareMargin)),

    //score in the game
    points = 1,

    //number of balls used in current game
    numberOfBalls = null,

    level = null, 

    step = 1,
    
    ballsIncrement = 5,
    levelIncrement = 5,
    
    //Prepare grid
    //coordinates to place squares on the canvas
    grid = new Grid({
        objectSize: squareSize,
        margin: squareMargin,
        numberOfLines: numberOfLines, 
        objectsPerLine: squaresPerLine
    }),

    squares = [];





startGame(level);

function startGame(level?: number): void {
    points = 1;
    numberOfBalls = null;
    level = level || null; 
    step = 1;
    squares = [];

    mover = new Mover({
        playground: { width: cWidth, height: cHeight}
    });

    let ball = new Ball({
        y: cHeight / 2,
        x: cWidth / 2,
        radius: 25
    });

    ball.draw();

    mover.startMoving([ball]);
}
