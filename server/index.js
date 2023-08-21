const express = require('express');
const app = express();
const server = require('http').Server(app);

// accept url parameter
// app.use(express.urlencoded({ extended: true }));

const io = require('socket.io')(server, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(socket.id); 
        io.emit('message',  message);   
    });

    socket.on('join_room', (message)=>{
        // Join the room
        socket.join(message.roomId); 
        io.emit("userJoined", message);
    })

    socket.on('G-message', (messageObj) => {
        io.emit('roomMessage', messageObj);
    });

    socket.on('createRoom', (messageObj) => {
        console.log(messageObj)
        io.emit('roomCreated', messageObj);
    });



});

server.listen(8080, () => console.log('listening on http://localhost:8080') );

