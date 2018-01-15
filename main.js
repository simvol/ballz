(function init() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var cWidth = canvas.clientWidth;
    var cHeight = canvas.clientHeight;
  
    var painter = Painter(ctx);

    var squaresPerLine = 7;
    var squareMargin = 10;
    var level = 10; // level go up every 5 user actions
    var squareSize = (cWidth / squaresPerLine) - (squareMargin * 1.1);
    var numberOfLines = Math.floor(cHeight / (squareSize + squareMargin));
    
    var grid = []; //do we need to make it 2 demensional?
    var squares = [];
    var basicColors = [
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
    
    //START HERE
    prepareGrid();
    
    function prepareGrid(){
      // grid = cWidth
      var x = 0;
      var y = 0;
      ctx.font = "15px Arial";
      
      for (var horizontalLine = 0; horizontalLine < numberOfLines; horizontalLine++) {
  
        y = horizontalLine ? y + squareMargin + squareSize : y + squareMargin; // no need extra margin for first
        
        for (var verticalColumn = 0; verticalColumn < squaresPerLine; verticalColumn++){
          x = verticalColumn ? x + squareMargin + squareSize : x + squareMargin;
          grid.push({
            x: x,
            y: y
          })
        }
        x = 0;
      }
      
      // prepareSquares(grid);
    }
    
    document.getElementById('but').addEventListener('click', function(){
      forward();
    });
    
    // for (var i = 0; i < numberOfLines; i++){
    //   forward();
    // }
    
    forward();
    forward();
    forward();
    forward();
    
    function forward(){
      var newSquares = prepareNewLine(level, squaresPerLine);
      // console.log('1')
      moveExistingSquaresDown(squares, squaresPerLine);
      // console.log('3')
      insertNewLine(newSquares, squares);
      // console.log('5')
      drawSquares(squares);
    }
    
    function moveExistingSquaresDown(squares, squaresPerLine){
      for (var i = squares.length - 1; i >= 0; i--){
        if (squares[i]){
  
          squares[i].y = grid[i + squaresPerLine].y;
        }
      }
      clearCanvas();
    }
    
    function insertNewLine(newSquares, allSquares){
      //go backwards because we dont' want to change order of the new line
      for (var i = newSquares.length - 1; i >= 0; i--){
        allSquares.unshift(newSquares[i]);  
      }
    }
    
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    
    function prepareNewLine(level, squaresPerLine){
      //Depending on current level and line size
      //we create new squares and push it to the previous ones (unshift)
      //then we update previous ones moving their Y + squaresPerLine
      var newLine = [];
      
      for (var i = 0; i < squaresPerLine; i++){
        var newNumber = getRandomIntInclusive(level/2, level);
        var newSquare = getRandomIntInclusive(0,1) ? {
          x: grid[i].x,
          y: grid[i].y,
          size: squareSize, 
          number: newNumber, //from half level to level size
          color: getSquareColor(newNumber)
        } : null;
        
        newLine.unshift(newSquare);
      }
      return newLine;
    }
    
    //Grid is a "map" of coordinates
    function prepareSquares(grid){
      var colors = [];
      for (var i = 0; i < grid.length; i++){
        
        //randomly assign some of the squares as null (they are going to be empty spaces)
        var newSquare = getRandomIntInclusive(0,1) ? {
          x: grid[i].x,
          y: grid[i].y,
          size: squareSize,
          number: i,
          color: getSquareColor(i)
        } : null;
             
        squares.unshift(newSquare);
      }
      drawSquares(squares);
    }
    
    function drawSquares(squares){
        clearCanvas();
      
        squares.forEach(function(square){
          if (square !== null){
            drawSquare(square);
          } else {
          }
        });
    }
    
    document.getElementById('clearbut').addEventListener("click", function(){ clearCanvas() });
    
    function clearCanvas(){
      ctx.clearRect(0, 0, cWidth, cHeight);
    }
    
    function drawSquare(square){
      ctx.fillStyle = square.color;
      ctx.fillRect(square.x, square.y, square.size, square.size);
      writeNumber(square.number,square.x + squareSize / 2.4, square.y + squareSize / 1.8)
    }
    
    function writeNumber(number,x,y){
      ctx.fillStyle = '#333';
      ctx.fillText(number,x,y); 
    }
    
    function getSquareColor(number){
      var divider = 1;
      
      for (var i = 1; i < number.toString().length; i++) {
        divider *= 10;
      }
      
      var colorNumber = number > 10 ? Math.floor(number / divider) : 0;
      
      var opacity = (number - (Math.floor(number / divider) * divider)) / divider;
      
      opacity = opacity <= 0.4 ? 0.4 : opacity;
      opacity = opacity >= 10 ? 1 : opacity;
      
      var color = 'rgba('
        + basicColors[colorNumber].r + ','
        + basicColors[colorNumber].g + ','
        + basicColors[colorNumber].b + ','
        + opacity + ')';
      return color;
    }
    
    
    
    //###################################Balls
        var radius = 12;
        var xDirectionStep = 10;
        var yDirectionStep = -10;
        var balls = [];
    
        var ball = {
          x: cWidth / 2,
          y: cHeight - radius /0.9,
          xDirectionStep: 1 * radius/4,
          yDirectionStep: -1 * radius/4
        };
    
        function createBallsArray (number, ball){
          for (var i = 0; i < number; i++){
            balls.push({x: ball.x, y: ball.y, xDirectionStep: ball.xDirectionStep, yDirectionStep: ball.yDirectionStep});
          }
        }
      
        function makeMovingBall(balls){
          
          var movingSpeed = 1;
          
          var timeoutS = 0;
          
           balls.forEach(function(ball){
            timeoutS += 100;
   
            setTimeout(function(){
              
              var interval = setInterval(function(){
               
                calculatePosition(ball, squares);
                if ((ball.y >= cHeight - radius + 1) || (ball.y > cHeight - radius)) {

                  // console.log('b.y: ' + ball.y + '-' + (cHeight + radius));

                    clearInterval(interval);

                    // ball.y = cHeight - radius  - 1;

                    console.log('STOPPED');
                    
                }
                drawBasicBall(ball, 'green');

                document.getElementById('ballY').innerHTML = ball.y;
                document.getElementById('ballX').innerHTML = ball.x;
                document.getElementById('canHeight').innerHTML = cHeight;
                document.getElementById('canHeightRad').innerHTML = cHeight + radius;
                
              },movingSpeed);
  
             },timeoutS);
  
           });
  
        }

        function fireTheBall(){
            var movingSpeed = 1;
            var intervalBetweenBalls = 0;
            
            balls.forEach( ball => {
                intervalBetweenBalls += 100;
                setTimeout( () => {
                    calculatePosition(ball, squares);
                    drawBasicBall(ball, 'green');
                }, intervalBetweenBalls);
            });
        }
        
        function drawBasicBall(position, color){
          drawBall(position.x, position.y, radius, color);
        }
    
        function eraseBasicBall(position) {
          drawBall(position.x, position.y, radius + 1, 'white');
        }
        
        function clear(){
          ctx.clearRect(0,0,cWidth,cHeight);
        }
    
        function drawBall(x,y,radius,color){
          ctx.beginPath();
  
          ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
          ctx.fillStyle = color;
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(x,y, 2, 0, 2 * Math.PI, false);
          ctx.fillStyle = 'black';
          ctx.fill();
          // ctx.lineWidth = 1;
          // ctx.strokeStyle = '#003300';
          // ctx.stroke();
        }
    
    //##############Bouncing off a block/wall
    function calculatePosition(ball, squares) {
      var allLines = getAllLines(squares);
      var relevantSurfaces = getRelevantSurfaces(ball.yDirectionStep,ball.xDirectionStep, allLines);
      ///TODO
      //always go down eventually
      // console.log('calling here');
      
      //MOVEHERE
      moveY(ball, relevantSurfaces);
      moveX(ball, relevantSurfaces);
    }
    
    function moveY(ball, surfaces) {
      eraseBasicBall(ball);
  
      //detect border
      ball.yDirectionStep = ball.y <= 0 + radius || ball.y >= cHeight - radius ? ball.yDirectionStep * -1 : ball.yDirectionStep;
      
      //detect surface
      surfaces.forEach( s => {
        //we calculrate bl for now, but when ball moves bottom we need tl (bl wont exist)
        if (s.bl && ball.x > s.bl.x1 && ball.x < s.bl.x2) { // ball inside square X lines
          if (ball.y <= s.bl.y1 + radius && ball.y + radius > s.bl.y1) {
            ball.yDirectionStep *= -1

            //for bl X is the same as square, Y is minus square size
            hitSquare(s.bl.x1, s.bl.y1 - squareSize);

          }
        }
        
        if (s.tl && ball.x > s.tl.x1 - radius && ball.x < s.tl.x2) { // ball inside square X lines   
          if (ball.y + radius >= s.tl.y1 && ball.y < s.tl.y1) {
            ball.yDirectionStep *= -1                       

            //for top line x1 and y1 coresponds with the square coords
            hitSquare(s.tl.x1, s.tl.y1);
          }
        }
        
        if (ball.yDirectionStep > cHeight) {
          ball.yDirectionStep = cHeihgt - radius;
        }
      });
      
      ball.y = ball.y + ball.yDirectionStep;
    }
    
    function moveX(ball, surfaces) {
      eraseBasicBall(ball);
  
      //detect border
      ball.xDirectionStep = ball.x <= 0 + radius || ball.x >= cWidth - radius ? ball.xDirectionStep * -1 : ball.xDirectionStep;
      
      //detect surface
      surfaces.forEach( s => {

        //we calculrate bl for now, but when ball moves bottom we need tl (bl wont exist)
        if (s.ll && ball.y > s.ll.y2 && ball.y < s.ll.y1) { // ball inside square Y lines
          if (ball.x <= s.ll.x1 - radius) {
            ball.xDirectionStep *= -1;

            //for left line x1 and y1 corespondes with the square coords
            hitSquare(s.ll.x1, s.ll.y1 - squareSize);
          }
        }
     
        if (s.rl && ball.y < s.rl.y2 && ball.y > s.rl.y1) { // ball inside square Y lines
          if (ball.x == s.rl.x1 || (ball.x - radius < s.rl.x1 && ball.x + radius > s.rl.x1)){
            ball.xDirectionStep *= -1;

            //for right line x1 minus square size, and y is good
            hitSquare(s.rl.x1 - squareSize, s.rl.y1);
          }
        }
      });
      
      ball.x = ball.x + ball.xDirectionStep;
    }

    function hitSquare(x,y){
        squares
            .filter(sqr => sqr !== null)
            .filter(sqr => {
                return Math.floor(sqr.x) === Math.floor(x) && Math.floor(sqr.y) === Math.floor(y);
            })
            .map(result => {
                result.number--;
                if(result.number === 0) {
                    deleteSquare();
                }
            });
        
        drawSquares(squares);
    }

    function deleteSquare() {
        squares = squares.filter(s => s && s.number > 0);
    }
    
    //we need to get lines x1-----x2 then see if ball x >x1 and <x2
    function getAllLines(sqrs){
      return sqrs
        .map(square => {
          //get lines
          if (square) {
            return {
              squareId: square.id,
              bl: {x1: square.x,x2: square.x + square.size,y1: square.y + square.size,y2: square.y + square.size},
              tl: {x1: square.x,x2: square.x + square.size,y1: square.y,y2: square.y},
              ll: {x1: square.x,x2: square.x,y1: square.y + square.size,y2: square.y},
              rl: {x1: square.x + square.size,x2: square.x + square.size,y1: square.y,y2: square.y + square.size}            
            };
          }
        })
      }
    
    //-ball moving in a specific direction will only hit 2 of 4 square surfaces
    //-lines facing another square or wall also can't be hit
    //we delete the lines ball can't hit
    function getRelevantSurfaces(yD,xD, lines){
      var lines = lines.filter(sqr => sqr !== undefined);
      
      removeCloseParallelLines();
      function removeCloseParallelLines(){
        for (var i = lines.length - 1; i >= 0; i--){ //compare opposite lines
          for (var k = 0; k < lines.length; k++){
            if ( i !== k && lines[i].tl && lines[k].bl && Math.abs(lines[i].x1 - lines[k].x1) < squareSize ){ //if two parallel lines are close to each other
              delete lines[i].tl;
              delete lines[k].bl;
            }
            if ( i !== k &&  lines[i].ll && lines[k].rl && Math.abs(lines[i].ll.x1 - lines[k].rl.x2) < squareSize && Math.abs(lines[i].ll.y1 - lines[k].rl.y2) < squareSize){ //if two parallel lines are close to each other
              delete lines[i].ll;
              delete lines[k].rl;
            }
          }
        }
      }
      
      lines.map(lines => {
        //remove top or bottom if ball (moving this direction) will never hit the line
        if (yD < 0) {
          delete lines.tl;
        } else if (yD > 0) {
          delete lines.bl;
        } else {
          delete lines.bl;
          delete lines.tl
        }
  
        //remove left or right if ball (moving this direction) will never hit the line
        if (xD < 0) {
          delete lines.ll;
        } else if (xD > 0) {
          delete lines.rl;
        } else {
          delete lines.ll;
          delete lines.rl;
        }
      });
  
      lines.forEach(line => {
        // if(line.bl) drawLine(line.bl);
        // if(line.tl) drawLine(line.tl);
        // if(line.ll) drawLine(line.ll);
        // if(line.rl) drawLine(line.rl);
      })
      return lines;
    }
    
    function drawLine(line) {
      ctx.moveTo(line.x1,line.y1);
      ctx.lineTo(line.x2,line.y2);
      ctx.strokeStyle="red";
      ctx.stroke();
    }
    
    
    
    
    createBallsArray(1, ball);
    // makeMovingBall(balls);

    let mouseStart, mouseEnd;
    setMouseEventListener();
    function setMouseEventListener(){

        //Coordinates of the mouse drag motion to determine direction of the ball
        mouseStart = {x:0, y:0};
        mouseEnd = {x:0, y:0};

        document.addEventListener('mousedown', (e) => {
            mouseStart.x = e.x;
            mouseStart.y = e.y;
            ctx.strokeStyle = 'blue';
            
            goodToGo = true;

            canvas.addEventListener("mousemove", drawLinesOnMove); 

        });

        document.addEventListener('mouseup', (e) => {
            mouseEnd.x = e.x;
            mouseEnd.y = e.y;

            goodToGo = false;

            updateBallDirection(mouseStart, mouseEnd);
            makeMovingBall(balls);

            document.removeEventListener("mousemove", drawLinesOnMove)
        });

    }

    function updateBallDirection(start, end){
        balls.forEach( ball => {
            //x can be from 0 to  canvas width
            //y can be from 0 to canvas height
            // mouseStart.x mouseStart.y
            // x = mouseStart - mouseEnd 
            //distance between x1 and x2 devided by how many ballsizes in y

            //Works at least somehow
            // var distanceBetweenX1andX2 = Math.abs(start.x - end.x) / radius; //how many balls can fit into this 
            // ball.xDirectionStep = distanceBetweenX1andX2 / (start.y / radius * 2);

            var speed = Math.abs(start.x - end.x) / radius; //how many balls can fit into this 

            var direction = start.x < end.x ? -1 : 1; //to left or to right

            // if (speed > 3) {
            //   speed = 3;
            // } else if (speed < 1) {
            //   speed = 1;
            // }

            ball.xDirectionStep = (speed * direction);
            // ball.yDirectionStep = Math.round(speed * (- 1));

            // if (ball.y - radius*2  >= cHeight) {
            //   ball.yDirectionStep = -1;

            // }

            console.log(ball);

            // var speed = start.x - end.x;

            // var direction = ball.x - start.x;

            // ball.xDirectionStep = direction / (start.y / radius * 2);
            // ball.xDirectionStep = (start.y / radius * 2) / direction;
            

        });
    }


    var ps = {x:0,y:0};
    var cs = {x:0,y:0};
    
    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    
    var img = document.createElement("img");
    img.src = canvas.toDataURL("image/png");
    
    var goodToGo = false;
    var ps = {x1:0, x2:0,y1:0,y2:0};
    
    
    function drawLinesOnMove(e) {
      if (goodToGo){

        //erase previous
        painter.drawLine({
          width: '2',
          color: 'white',
          start: { x: ps.x1, y: ps.y1 },
          end: { x: ps.x2, y: ps.y2 }
        })

        ps = {x1: balls[0].x, x2: e.x, y1: balls[0].y, y2: e.y};

        //draw new
        painter.drawLine({
          width: '1',
          color: 'black',
          start: { x: balls[0].x, y: balls[0].y},
          end: { x: e.x, y: e.y }
        });

        goodToGo = false;
        
        setTimeout(function(){
          goodToGo = true;
        }, 10)
      }
    }
    

  })();