
const userRouter=require("./routes/user")
const friendRouter=require("./routes/friends")
const chatRouter=require("./routes/chat")
const msgRouter=require("./routes/message")
const reqRouter=require("./routes/request")
const cors = require('cors')

const express=require("express")
const app =express()

const http = require('http');
const { createMsg } = require("./databaseUtils/message")
const { port } = require("./config")
const server = http.createServer(app);

// Create a online Map
const onlineUser = new Map();

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
  console.log("socket connected",socket.id)
  socket.on("userOnline",(userId)=>{
    onlineUser.set(userId, socket.id)
  })
  socket.on("send-message",(data)=>{
      createMsg(data.msg_obj)
      .then((msg)=>{
        // to individual socketid (private message)
        const socketIdFriend = onlineUser.get(data.msg_obj.to)
        io.to(socketIdFriend).emit("recieve-message",msg);
        // socket.broadcast.emit("recieve-message",msg)
      })
        
      .catch((e)=>{console.log("message not created or send",e.message)})
      
  })
  socket.on("user-typing",(data)=>{
    // to individual socketid (private message)
    const socketIdFriend = onlineUser.get(data.selectedFriendID)
    io.to(socketIdFriend).emit("recieve-user-typing",data.userID);
    // socket.broadcast.emit("recieve-user-typing",data)
  })
  
        

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(cors())
// Router for user
// enable exio,fetch json  body in req object
app.use(express.json())
// enable form body in req object
app.use(express.urlencoded({extended:false}))






app.use("/user",userRouter)
app.use("/friends",friendRouter)
app.use("/chat",chatRouter)
app.use("/msg",msgRouter)
app.use("/request",reqRouter)
//  static file : public folder
app.use(express.static("public"))



app.get("/",(req,res)=>{
    res.send("Hello World")
})

server.listen(port, function() {
    console.log('listening on *:3030');
 });
