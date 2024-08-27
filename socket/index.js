const { Server } = require("socket.io");

const io = new Server({ cors: "*" });

let onlineUsers = []

io.on("connection", (socket) => {
  // ...
  // console.log("new connection",socket.id);

  // listening to a connection
  socket.on("addNewUser", (userId, userEmail)=>{
    const o = onlineUsers.find(u=>u.userId===userId);
    if(!o) onlineUsers.push({userId, socketId: socket.id, userEmail})
    io.emit('onlineUsers', onlineUsers);
  });

  socket.on('sendMessage', (newMessage, receptantId)=>{
    console.log('new message', newMessage.content);
    const o = onlineUsers.find(u=>u.userId===receptantId);
    if(o){
      console.log(`new message for ${o.userEmail}`);
      io.to(o.socketId).emit("newMessage", newMessage);
    }
  })

  socket.on('disconnect', ()=>{
    console.log('disconnected', socket.id);
    onlineUsers = onlineUsers.filter(u=>u.socketId!==socket.id);
    io.emit('onlineUsers', onlineUsers);
  })
});

io.listen(3030);