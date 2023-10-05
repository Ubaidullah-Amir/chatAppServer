const { createMsg } = require("./databaseUtils/message");
const http = require("./server");
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    // socket.on("send-message",(data)=>{
    //     console.log("someone send message",data)
    //     createMsg(data.msg_obj)
    //     .then((msg)=>{socket.broadcast("recieve-message",data.msg_obj)})
    //     .catch((e)=>{console.log("message not created or send")})
        
    // })
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});
module.exports=io