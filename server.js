const app = require('./src/app');
const { createServer } = require('http');  //conver ur express into http server,needed when using socket.io
const { Server } = require('socket.io');  // import



const httpServer = createServer(app);  // wrap ur express inside http server

const io = new Server(httpServer);  // creates a socket.io server

io.on('connection',(socket)=>{
    console.log("User connected:", socket.id); // socket.id = unique id created by the socket.io

})
httpServer.listen(3000,()=>{       //Starts your server on port 3000
    console.log("server is running")
})