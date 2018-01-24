(function init() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var cWidth = canvas.clientWidth;
    var cHeight = canvas.clientHeight;
    var imageData = null; 
    
  
    var painter = Painter(ctx);

    var squaresPerLine = 7;
    var squareMargin = 10;
    var squareSize = (cWidth / squaresPerLine) - (squareMargin * 1.1);
    var numberOfLines = Math.floor(cHeight / (squareSize + squareMargin));
    var points = 1;
    var numberOfBalls = null;
    var level = null; 
    var step = 1;
    var ballsIncrement = 5;
    var levelIncrement = 10;

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
    
    // document.getElementById('but').addEventListener('click', function(){
    //   forward();
    // });
    
    // for (var i = 0; i < numberOfLines; i++){
    //   forward();
    // }
    
    forward();
   var first = true; 
    function forward(){

      numberOfBalls = Math.ceil(points / ballsIncrement);
      level = Math.ceil(points / levelIncrement);

      document.getElementById('level').innerHTML = level;
      document.getElementById('balls').innerHTML = numberOfBalls;

      var newSquares = prepareNewLine(level, squaresPerLine);
      // console.log('1')
      moveExistingSquaresDown(squares, squaresPerLine);
      // console.log('3')
      // console.log('newSquares: ', newSquares.slice());
      // console.log('squares: ', squares.slice());

      insertNewLine(newSquares, squares);

      // console.log('5')
      drawSquares(squares);
    }
    



  
    //TODO need to figure out what is going on here????
    //HOW DO WE GRADUALLY GOING DOWN ONE step at a time
    //and withouth care if its null or not///
    function moveExistingSquaresDown(squares, squaresPerLine){

      console.log('movedown')

      console.log('for repeat ', squaresPerLine * step)

      for (var i = squaresPerLine * step; i >= 0; i--){
        if (squares[i]){
          // console.log('i: ', i);
          console.log('step: ', step);
          console.log('squaresPerLine:', squaresPerLine);
          console.log('move to:', grid[step + squaresPerLine].y);
          squares[i].y = grid[step + squaresPerLine].y;
        }
      }
      
      step++;

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

      var xOffset = square.number > 10 ? 2.6 : 2.4;
      var yOffset = 1.8;

      writeNumber(square.number,square.x + squareSize / xOffset, square.y + squareSize / yOffset)
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
      
        //Move ball until it hits bottom border
        function makeMovingBall(balls){
          
          var movingSpeed = 1;
          var ballIsMovingDown = null;
          var ballTouchedBottomBorder = null;
          var interval = null;
          var timeoutS = 0;
          
           balls.forEach(function(ball){
            timeoutS += 100;
   
            setTimeout(function(){
              
              interval = setInterval(function(){
               
                calculatePosition(ball, squares);

                ballIsMovingDown = ball.yDirectionStep > 0;

                var bottomBorder = cHeight - radius;

                if (ballIsMovingDown) {

                  ballTouchedBottomBorder  = ball.y >= bottomBorder;

                  if (ballTouchedBottomBorder) {

                    // console.log('b.y: ' + ball.y + '-' + (cHeight + radius));

                      clearInterval(interval);

                      ball.y = bottomBorder; //if close move down/up to match border

                      forward();


                      //Update image
                      imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

                      console.log('STOPPED');
                      
                  }
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
         
        function drawTrajectory(ball, distance){

          var coords = {
            x: ball.x,
            y: ball.y
          };

          for (var i = 0; i < distance; i++) {
            coords.x =  coords.x + (ball.xDirectionStep * 10); 
            coords.y =  coords.y + (ball.yDirectionStep * 10);
            drawBasicBall(coords, 'rgba(0,0,0,.1)')
          }
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
          
          // ctx.beginPath();
          // ctx.arc(x,y, 2, 0, 2 * Math.PI, false);
          // ctx.fillStyle = 'black';
          // ctx.fill();
          // ctx.lineWidth = 1;
          // ctx.strokeStyle = '#003300';
          // ctx.stroke();
        }
    
    //##############Bouncing off a block/wall
    function calculatePosition(ball, squares) {
      
      var allLines = getAllLines(squares);
      var relevantSurfaces = getRelevantSurfaces(ball.yDirectionStep,ball.xDirectionStep, allLines);

      //MOVEHERE
      moveY(ball, relevantSurfaces);
      moveX(ball, relevantSurfaces);
    }
    
    var ballHitsTopBorder = null;
    var ballHitsBottomBorder = null;
    var ballIsMovingDown = ball.yDirectionStep > 0;
    var ballIsMovingUp = ball.yDirectionStep < 0;

    function moveY(ball, surfaces) {
      eraseBasicBall(ball);
  
      //detect border
      ballIsMovingDown = ball.yDirectionStep > 0;
      ballIsMovingUp = ball.yDirectionStep < 0;
      ballHitsTopBorder = ball.y <= 0 + radius;
      ballhitsBottomBorder = ball.y >= cHeight - radius;


      ball.yDirectionStep =  (ballIsMovingUp && ballHitsTopBorder)|| (ballIsMovingDown && ballHitsBottomBorder) ? ball.yDirectionStep * -1 : ball.yDirectionStep;
      
      //detect surface
      surfaces.forEach( s => {

        //we calculrate bl for now, but when ball moves bottom we need tl (bl wont exist)
        //Ball is moving up

        if (s.bl) { 

          var ballRightSideIsUnderSquare = ball.x + radius > s.bl.x1;
          var ballLeftSideIsUnderSquare = ball.x - radius < s.bl.x2;

          if (ballRightSideIsUnderSquare && ballLeftSideIsUnderSquare) { // ball is under a square in between squares X1 and X2 

            var ballTopSideHitsSquare = ball.y - radius <= s.bl.y1;
            var ballIsCloseToTheBottomSide = ball.y > s.bl.y1;

            if (ballTopSideHitsSquare && ballIsCloseToTheBottomSide) {

              drawLine(s.bl)

              ball.yDirectionStep *= -1

              //for bl X is the same as square, Y is minus square size
              hitSquare(s.bl.x1, s.bl.y1 - squareSize);

            }
          }
        }

        //ball is moving down

        if (s.tl) {
          var ballRightSideIsAboveSquare = ball.x + radius > s.tl.x1;
          var ballLeftSideIsAboveSquare = ball.x - radius < s.tl.x2;
          
          if (ballRightSideIsAboveSquare && ballLeftSideIsAboveSquare) {   

            var ballBottomSideHitsSquare = ball.y + radius >= s.tl.y1;
            var ballCenterCloseToTopSquare = ball.y < s.tl.y1;

            if (ballBottomSideHitsSquare && ballCenterCloseToTopSquare) {

              drawLine(s.tl)

              ball.yDirectionStep *= -1                       

              //for top line x1 and y1 coresponds with the square coords
              hitSquare(s.tl.x1, s.tl.y1);
            }
          }
          
        }
        // if (ball.yDirectionStep > cHeight) {
        //   ball.yDirectionStep = cHeihgt - radius;
        // }
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
        //Ball is moving to right

        if (s.ll){ 

          var ballTopSideAboveSquareBottomSide = ball.y - radius < s.ll.y1;
          var ballBottomSideBelowSquareTopSide = ball.y + radius > s.ll.y2;

          if (ballTopSideAboveSquareBottomSide && ballBottomSideBelowSquareTopSide) { // ball is to the left from the square //y2 - top, y1 - bottom
          
            var ballRightSideHitsSquareLeftSide = ball.x + radius >= s.ll.x1;
            var ballCenterHasntPassedSquareLeftSide = ball.x < s.ll.x1;

            if (ballRightSideHitsSquareLeftSide && ballCenterHasntPassedSquareLeftSide) {

              drawLine(s.ll);

              ball.xDirectionStep *= -1;

              //for left line x1 and y1 corespondes with the square coords
              //ball hits left side of a square 
              hitSquare(s.ll.x1, s.ll.y1 - squareSize);
            }
          }
        }
     
        if (s.rl && ball.y < s.rl.y2 && ball.y > s.rl.y1) { // ball inside square Y lines


          //Ball is moving to the left
          // we need to see if left x (x - radius), hits or passes right line

          if (ball.x - radius <= s.rl.x1 && ball.x > s.rl.x1){

            drawLine(s.rl);

            ball.xDirectionStep *= -1;

            //for right line x1 minus square size, and y is good
            hitSquare(s.rl.x1 - squareSize, s.rl.y1);
          }
        }
      });
      
      ball.x = ball.x + ball.xDirectionStep;
    }

    function hitSquare(x,y){

        points++;

        document.getElementById('points').innerHTML = points;

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
        .filter(square => {
          return square !== undefined;
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

    var mouseIsDown = false;

    let mouseStart, mouseEnd;
    setMouseEventListener();
    function setMouseEventListener(){

        imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

        //Coordinates of the mouse drag motion to determine direction of the ball
        mouseStart = {x:0, y:0};
        mouseEnd = {x:0, y:0};

        document.addEventListener('mousedown', (e) => {
            mouseIsDown = true;

            mouseStart.x = e.offsetX;
            mouseStart.y = e.offsetY;

            ctx.strokeStyle = 'blue';
            
            goodToGo = true;

            canvas.addEventListener("mousemove", drawLinesOnMove); 

        });

        document.addEventListener('mouseup', (e) => {
            mouseIsDown = false;
            mouseEnd.x = e.x;
            mouseEnd.y = e.y;

            goodToGo = false;

            document.removeEventListener("mousemove", drawLinesOnMove);
            ctx.putImageData(imageData, 0, 0);

            updateBallDirection(mouseStart, mouseEnd);
            makeMovingBall(balls);

        });

    }

    function updateBallDirection(start, end){
        balls.forEach( ball => {
            var xSpeed = Math.abs(start.x - end.x) / radius; //how many balls can fit into this 
            var xDirection = start.x < end.x ? -1 : 1; //to left or to right
            var ySpeed = Math.abs(start.y - end.y) / radius;

            //Dont allow the ball to move too fast
            if (xSpeed > 2) {
              xSpeed = 2;
            }

            //Dont allow the ball to move too fast
            if (ySpeed > 2) {
              ySpeed = 2;
            }

            //Dont allow user to get too low angle
            if (ySpeed < 0.12) {
              ySpeed = 0.12;
            } 

            ball.xDirectionStep = (xSpeed * xDirection);
            ball.yDirectionStep = ySpeed * (- 1);

            // console.log(ball);
        });
    }

    var goodToGo = false;
    
    //We need to get ball position
    //calculate difference between ball position and end of mouse 
    //remove this difference from start and end of mmouse
    
    function drawLinesOnMove(e) {
      if (goodToGo && mouseIsDown){

        ctx.putImageData(imageData, 0, 0);
        updateBallDirection(mouseStart, {x: e.x, y: e.y});
        // console.log('draw traj');
        drawTrajectory(balls[0], 10);

        // var xD = mouseStart.x - e.offsetX;
        // var yD = mouseStart.y - e.offsetY;

        // var eX = balls[0].x + xD;
        // var eY = balls[0].y + yD;

        // var sX = balls[0].x;
        // var sY = balls[0].y;

        // //draw new
        // painter.drawLine({
        //   width: '1',
        //   color: 'black',
        //   start: { x:  eX, y: eY },
        //   end: { x: sX, y: sY}
        // });

        goodToGo = false;
        
        setTimeout(function(){
          goodToGo = true;
        }, 10)
      }
    }
    
  })();