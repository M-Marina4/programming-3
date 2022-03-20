let express = require("express");
let app = express();
let fs = require('fs'); 
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let messages = [];

app.use(express.static("public"));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(4000);

io.on('connection', function (socket) {
   for(var i in messages) {
     socket.emit("display message", messages[i]);
   }
   socket.on("send message", function (data) {
       messages.push(data);
       io.sockets.emit("display message", data);
   });
});

function main() {
   var socket = io();
   var chatDiv = document.getElementById('chat');
   var input = document.getElementById('message');
   var button = document.getElementById('submit');

   function handleSubmit() {
       var val = input.value;
       if (val != "") {
           socket.emit("send message", val);
       }
   }
   button.onclick = handleSubmit;
   function handleMessage(msg) {
      var p = document.createElement('p');
      p.innerText = msg;
      chatDiv.appendChild(p);
      input.value = "";
}

socket.on('display message', handleMessage);
} // main closing bracket

window.onload = main;  
