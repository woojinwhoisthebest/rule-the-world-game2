const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});

app.use(express.static("."));

let countries = {};
let players = {};

io.on("connection", (socket)=>{
  socket.on("capture", (data)=>{
    let c = countries[data.country] || {owner:null, price:50};
    c.owner = data.player;
    c.price += 2;
    countries[data.country] = c;

    // 플레이어별 점령 수 계산
    players = {};
    Object.values(countries).forEach(v=>{
      if(v.owner){
        players[v.owner] = (players[v.owner]||0)+1;
      }
    });

    io.emit("update",{countries, players});
  });
});

server.listen(3000,()=>{ console.log("server started"); });
