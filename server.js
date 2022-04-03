let express = require("express");
let app = express();
let fs = require('fs');
let server = require('http').createServer(app);
let io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.redirect('index.html');
});
app.use(express.static("."));

server.listen(4444, () => {
    console.log('connected');
});


LivingCreature = require("./LivingCreature.js");
Grass = require("./Grass")
GrassEater = require("./GrassEater")
Gishatich = require("./Gishatich")
Virus = require("./Virus")
VirusEater = require("./VirusEater")
weath = "winter";
matrix = [];
grassArr = [];
grassEatArr = [];
gishatichArr = [];
virusArr = [];
virusEatArr = [];
// cellColors = {}
grassNumber = 0;
grassEatNumber = 0;
gishatichNumber = 0;
virusNumber = 0;
virusEaterNumber =0;


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
      
    }
    for (let i = 0; i < gishatich; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
       
    }

    for (let i = 0; i < virus; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
      
    }

    for (let i = 0; i < virusdestroy; i++) {
        let y = Math.floor(Math.random() * matY);
        let x = Math.floor(Math.random() * matX);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
      
       
    }
   
}
matrixGen(50, 50, 500, 300, 100, 10, 10)

io.sockets.emit('data', matrix)

function createObject() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                grassArr.push(new Grass(x, y, 1));
                grassNumber++;
            } else if (matrix[y][x] == 2) {
                grassEatArr.push(new GrassEater(x, y, 2));
                grassEatNumber++;
            } else if (matrix[y][x] == 3) {
                gishatichArr.push(new Gishatich(x, y, 3));
                gishatichNumber++;
            }
            else if (matrix[y][x] == 4) {
                virusArr.push(new Virus(x, y, 4));
                virusNumber++;
            }
            else if (matrix[x][y] == 5) {
                virusEatArr.push(new VirusEater(x, y, 5));
                virusEaterNumber++;
            }
        }
    }
   
}



// cellColors = {
//     white: [255, 255, 255],
//     green: [0, 128, 0],
//     green1: [0, 128, 0],
//     yellow: [255, 255, 0],
//     yellow1: [255, 255, 0],
//     khaki: [240, 230, 140],
//     navy: [0,0,128],
//     navy1: [0,0,128],
//     sakmon: [250, 128, 114],
//     purple: [128, 0, 128],
//     purple1: [128, 0, 128],
//     palevioletred: [219, 112, 147],

// }

function game() {
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

    let sendData = {
        // cellColors: cellColors,
        matrix: matrix,
        grassCounter: grassNumber,
        grassEaterCounter: grassEatNumber,
        gishatichCounter: gishatichNumber,
        virusCounter: virusNumber,
        virusEaterCounter: virusEaterNumber
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}


setInterval(game, 1000);


function killFunc() {
    grassArr = [];
    grassEatArr = []
    gishatichArr = [];
    virusArr = [];
    virusEatArr =[];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("data", matrix);
}



function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 2000);



function addGrassFunc() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y, 1));
            grassNumber++;
        }
    }
    io.sockets.emit("data", matrix);
}
function addGrassEaterFunc() {
    for (var i = 0; i < 6; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEatArr.push(new GrassEater(x, y, 2))
            grassEatNumber++;
        }
    }
    io.sockets.emit("data", matrix);
}

function addGishatichFunc() {
    for (var i = 0; i < 5; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            gishatichArr.push(new Gishatich(x, y, 3))
            gishatichNumber++;
        }
    }
    io.sockets.emit("data", matrix);
}

function addVirusFunc() {
    for (var i = 0; i < 4; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            virusArr.push(new Virus(x, y, 4))
            virusNumber++;
        }
    }
    io.sockets.emit("data", matrix);
}


function addVirusEaterFunc() {
    for (var i = 0; i < 3; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            virusEatArr.push(new VirusEater(x, y, 5))
            virusEaterNumber++;
        }
    }
    io.sockets.emit("data", matrix);
}

io.on('connection', function (socket) {
    createObject();
    socket.on("kill", killFunc);
    socket.on("weather", weather);
    socket.on("add grass", addGrassFunc);
    socket.on("add grassEater", addGrassEaterFunc);
    socket.on("add gishatich", addGishatichFunc);
    socket.on("add virus", addVirusFunc);
    socket.on("add viruseater", addVirusEaterFunc)
});






// var statistics = {};

// setInterval(function() {
//     statistics.grass = grassArr.length;
//     statistics.grassEater = grassEatArr.length;
//     statistics.gishatich = gishatichArr.length;
//     statistics.virus = virusEatArr.length;
//     statistics.virusEater = virusEatArr.length;

//     fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
//         console.log("send")
//     })
// },1000) 