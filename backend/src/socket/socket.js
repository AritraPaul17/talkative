const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors:{
          origin: 'talkative-nu.vercel.app',
          credentials: true,          
          optionSuccessStatus: 200,
      }
});

const userSocketMap = {}; //userId:socket._id

const getRecieverId = (recieverId)=>{
  return userSocketMap[recieverId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if(userId!='undefined'){
    userSocketMap[userId] = socket.id;
  }
  io.emit('getOnlineUsers',Object.keys(userSocketMap));


  socket.on('disconnect',()=>{
    delete userSocketMap[userId];
    io.emit('getOnlineUsers',Object.keys(userSocketMap));
  })
});

module.exports = {app,server,io,getRecieverId};
