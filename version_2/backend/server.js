const http = require("node:http");
const express = require("express");
const cors = require("cors");
const {Server} = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(cors());

const io = new Server(httpServer, {
    cors:
    {
        origin:"http://localhost:5000",
        methods: ["GET", "POST"]
    }

});
const msgArray = [];
const new_msg_array = [];
io.on("connection", (socket)=>{
    console.log("Connected Successfully")
    console.log(`SocketId:${socket.id}`)

    // this will emit the event below upon connection: only to the user
    socket.emit("onUserConnect", socket.id);

    // emit to all other users  except the sender
    socket.broadcast.emit("userJustEntered", socket.id);
    // listen for messages: on submit from users

    socket.on('receiveMSG', (data)=>{
        console.log(data);
        // msgArray.push(data)
        // console.log(`msgArray data is : `)
        // console.log(msgArray);

        const user_id = socket.id.slice(0,5);
        const new_msg = {id:user_id, msg:data.msg};
        new_msg_array.push(new_msg);
        console.log(new_msg_array)
        setInterval(()=>{
            // send messages to other users
            io.emit("messages", new_msg_array)
        },5000)

    })
    io.emit('messages', new_msg_array);


    let userTyping = ""
    socket.on('userTyping', (data)=>{ // evertime the user types we send 
        userTyping = data;
        // console.log(`User ${data} is typing`);
        socket.broadcast.emit("showUserTyping", userTyping);
    })
    socket.broadcast.emit('user')
    socket.on("disconnect", ()=>{
        console.log(`User  disconnected from ${socket.id}`);
        socket.broadcast.emit("userDisconnected", socket.id)
    })
})
app.get("/", (req,res)=>{
    res.send("<h1>Server running Successfully</h1>");
})

httpServer.listen(5000, ()=>{console.log("listening to port 5000: http://localhost:5000")});
