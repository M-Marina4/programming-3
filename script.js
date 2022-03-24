var socket = io();
let matrix = []
let side = 15;

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

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#ADD8E6');
    noStroke();
   
   
}



function nkarel(matrix) {
    console.log(matrix);
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

    setInterval(
        function () {
        socket.on('send matrix', nkarel)
        },1000
    )
   
  

};

function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}



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

 
	
	
	

	
