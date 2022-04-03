const socket = io()
let value = 0;
let side = 15;
let  weath = "winter"
function mouseClicked() {
    if (value === 0) {
        value = 255;
    } else if (value == 1) {
        value = 200;
    }
    else {
        value = 0;
    }

    for (let i = 0; i < 100; i++) {
        drawFlower(mouseX, mouseY, random(40, 60), random(i + 100, 255), random(i + 50, 255), random(i + 120, 255))

    }
};
socket.on("weather", function (data) {
    console.log(weath);
    
    weath = data;
})

function setup() {

    frameRate(5);
    createCanvas(40 * side, 40 * side)
    background('#ccc')
}

let grassCountElement = document.getElementById('grassCount');
let grassEaterCountElement = document.getElementById('grassEaterCount');
let gishatichCountElement = document.getElementById('gishatichCount');
let virusCountElement = document.getElementById('virusCount');
let virusEaterCountElement = document.getElementById('virusEaterCount');

function nkarel(data) {
    
    // grassCountElement.innerText = data.grassCounter
    // grassEaterCountElement.innerText = data.grassEaterCounter
    // gishatichCountElement.innerText = data.gishatichCouter
    // virusCountElement.innerText = data.virusCounter
    // virusEaterCountElement.innerText = data.virusEaterCounter
    // cellColors = data.cellColors
    
    noStroke();
    for (let y = 0; y < data.matrix.length; y++) {
        for (let x = 0; x < data.matrix[y].length; x++) {

            if (data.matrix[y][x] == 1) {
                if(weath == "summer") {
                    fill("green");
                    rect(x * side, y * side, side, side);
                }else if (weath == "autumn") {
                    fill("#4dffa6");
                   rect(x * side, y * side, side, side);
               }else if (weath == "winter") {
                fill("white");
               rect(x * side, y * side, side, side);
           }else if (weath == "spring") {
                     fill("red");
                    rect(x * side, y * side, side, side);
                }
            } else if (data.matrix[y][x] == 2) {
                if(weath == "summer") {
                    fill("yellow");
                    rect(x * side, y * side, side, side);
                }else if (weath == "winter") {
                    fill("brown");
                    rect(x * side, y * side, side, side);
                }

            } else if (data.matrix[y][x] == 3) {
                if(weath == "summer") {
                    fill("navy");
                    rect(x * side, y * side, side, side);
                }else if (weath == "winter") {
                    fill("blue");
                    rect(x * side, y * side, side, side);
                }


            } else if (data.matrix[y][x] == 4) {
                if(weath == "summer") {
                    fill("purple");
                    rect(x * side, y * side, side, side);
                }else if (weath == "winter") {
                    fill("pink");
                    rect(x * side, y * side, side, side);
                };

            } else if (data.matrix[y][x] == 5) {
                fill(value);
                rect(x * side, y * side, side, side);        
            }
            
            else if (data.matrix[y][x] == 0) {
                fill("#ADD8E6");
                rect(x * side, y * side, side, side);
    
            
            }
        }
    }      
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

function addGishatich() {
    socket.emit("add gishatich")
}

setInterval(function (){
    socket.on('data', nkarel)
}, 1000)

function addVirus() {
    socket.emit("add virus")
}


function addVirusEater() {
    socket.emit("add viruseater")
}




function drawFlower(x, y, d, r, g, b) {
    fill(255, 255, 0);
    ellipse(x, y, d, d);
    fill(r, g, b)
    ellipse(x - 50, y, d, d)
    ellipse(x + 50, y, d, d)
    ellipse(x - 25, y + 43, d, d)
    ellipse(x + 25, y + 43, d, d)
    ellipse(x - 25, y - 43, d, d)
    ellipse(x + 25, y - 43, d, d)
}




document.addEventListener("DOMContentLoaded", function () {

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
        node.style.left = posX + 'px';
        node.style.top = posY + 'px';
        node.style.transform = 'rotate(' + rotation + 'deg) scale(' + scale + ')';
        node.style.animationDelay = delay + 's';
        body.appendChild(node);
        i++;
    }

});






