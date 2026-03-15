const express = require("express")
const http = require("http")
const {Server} = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("."))

let countries = {}

io.on("connection",(socket)=>{

console.log("player connected")

socket.on("capture",(data)=>{

let c = countries[data.country] || {
owner:null,
price:50
}

c.owner = data.player
c.price += 2

countries[data.country] = c

io.emit("update",countries)

})

})

server.listen(3000,()=>{
console.log("server started")
})
