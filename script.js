let side = 15;
var matrix = [];
let grassArr = [];
let grassEatArr = [];
let gishatichArr = [];
let virusArr = [];
let virusEatArr = [];


function matrixGen(matY, matX, khot, khotaker, gishatich, virus, virusdestroy) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < khot; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
    }
    for (let i = 0; i < khotaker; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
        grassEatArr.push(new GrassEater(x, y));
    }
    for (let i = 0; i < gishatich; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
        gishatichArr.push(new Gishatich(x, y));
    }

    for (let i = 0; i < virus; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
        virusArr.push(new Virus(x, y));
    }

    for (let i = 0; i < virusdestroy; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
        virusEatArr.push(new VirusEater(x, y));
       
    }
   
}



let value = 0;
function mouseClicked() {
    
    if (value === 0) {  
        value = 255;
    } else if (value == 1) {
        value = 200;
    } 
    else {
        value = 0;
    }
  
    for (let i = 0; i< 100; i++) {
        drawFlower(mouseX, mouseY, random(40,60), random(i+100, 255), random(i+50, 255), random(i+120, 255))
          
      }
};


function setup() {  
   
    matrixGen(50, 50, 500, 300, 100, 10, 10);
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#ADD8E6');
    noStroke();
    

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
            } else if (matrix[y][x] == 2) {
                grassEatArr.push(new GrassEater(x, y, 2));
            } else if (matrix[y][x] == 3) {
                gishatichArr.push(new Gishatich(x, y, 3));
            } 
            else if (matrix[y][x] == 4) {
                virusArr.push(new Virus(x, y, 4));
            } 
            else if(matrix[x][y]==5){
                virusEatArr.push(new VirusEater(x,y,5));
            }
        }
    }
   
   
}



function draw() {
  
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);

            } else if (matrix[y][x] == 3) {
                fill("navy");
                rect(x * side, y * side, side, side);

            } else if (matrix[y][x] == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);

            } else if (matrix[y][x] == 5) {
                fill(value);
                rect(x * side, y * side, side, side);
                setTimeout(() => {
                    document.getElementById('mySound').play();
                  }, 0.05)            

            }
            
            else if (matrix[y][x] == 0) {
                fill("#ADD8E6");
                rect(x * side, y * side, side, side);
              
            
            }
        }
    }

   
   
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();


    }

    for (let i = 0; i < grassEatArr.length; i++) {
        grassEatArr[i].eat();
      

    }

    for (let i = 0; i < gishatichArr.length; i++) {
        gishatichArr[i].eat();
        
    }
    for (let i = 0; i < virusArr.length; i++) {
        virusArr[i].eat();
      
    }
    for (let i = 0; i < virusEatArr.length; i++) {
        virusEatArr[i].eat();
        
    }

  

};

function drawFlower(x, y, d, r, g, b) {
    fill(255,255,0);
    ellipse(x,y, d, d);
    fill(r,g,b)
    ellipse(x-50,y, d, d)
    ellipse(x+50,y, d, d)
    ellipse(x-25,y +43, d, d)
    ellipse(x+25,y +43, d, d)
    ellipse(x-25,y -43, d, d)
    ellipse(x+25,y -43, d, d)
}




  document.addEventListener("DOMContentLoaded", function() {
   
    let amount = 30;
    let body = document.querySelector('body');
    let i = 0;
    
    while (i < amount) {
      let node = document.createElement("i");
      let posX = Math.floor(Math.random() * window.innerWidth);
      let posY = Math.floor(Math.random() * window.innerHeight);
      let rotation = Math.random() * 180;
      let delay = Math.random() * 20;
      let scale = Math.random() * 0.2;
      node.style.left = posX+'px';
      node.style.top = posY+'px';
      node.style.transform = 'rotate('+rotation+'deg) scale('+scale+')';
      node.style.animationDelay = delay+'s';
      body.appendChild(node);
      i++;
    }
    
  });

 
	
	
	

	
