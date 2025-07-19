const app = require('express')();
const http = require('node:http');
const {Server} = require('socket.io');


const server = http.createServer(app);

const game_dataArray = []
const io = new Server(server, {
    /*options*/
    cors:{origin:"http://localhost:5173"},
    methods: ["POST", "GET"]
});

// basic connection setup
io.on("connection", (socket)=>{
    // console.log(socket);
    console.log(`Socket id: ${socket.id}`);

    io.emit('gameData', game_dataArray);
    socket.on('disconnect', ()=>{
        console.log(`Client disconnected from ${socket.id}`);
    })
    socket.emit('chatMessage',"i have finished");

    socket.on('new_player_score', (data)=>{
        console.log(`new_player_score : `)
        console.log(data);
        game_dataArray.push({...data, id:socket.id});
        console.log(`game_dataArray`);
        console.log(game_dataArray)

        setInterval(()=>{
            io.emit('gameData', game_dataArray)
        }, 5000)
    });
    socket.on('connect_error', (err)=>{
        console.log(`Error: ${err}`);
    })
})









server.listen(3000, ()=>{console.log("listening on port 3000")})