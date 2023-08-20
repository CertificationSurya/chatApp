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
        // io.emit('message', `${socket.id.substr(0,2)}: ${message}` );   
        io.emit('message',  message);   
    });
});

server.listen(8080, () => console.log('listening on http://localhost:8080') );

