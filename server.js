let express = require("express");
let app = express();
let fs = require('fs'); 
let server = require('http').createServer(app);
let io = require('socket.io')(server);


app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(4000);

let matrix = [];
let grassArr = [];
let grassEatArr = [];
let gishatichArr = [];
let virusArr = [];
let virusEatArr = [];
Grass = require("./Grass")
GrassEater = require("./GrassEater")
Gishatich = require("./Gishatich")
Virus = require("./Virus")
VirusEater = require("./VirusEater")



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
        grassArr.push(new Grass(x, y));
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
matrix = matrixGen(50, 50, 500, 300, 100, 10, 10)




function createObject() {
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
createObject();

let exanak = 0;
let weather = "winter"


function game() {
    exanak++;
    if (exanak <= 10){
        weather = "summer"
    }else if (exanak <= 20){
        weather = "autumn"
    }else if (exanak <= 30){
        weather = "winter"
    }else if (exanak <= 40){
        weather = "spring"
    }else if (exanak > 40){
        exanak = 0
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
  
    io.sockets.emit("send matrix",  matrix);
}


setInterval(game, 5000);

