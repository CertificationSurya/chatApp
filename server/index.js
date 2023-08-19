// // const express = require('express')
// import express from 'express'
// const app = express()

// import { Server } from 'socket.io'
// import cors from 'cors'
// import http from 'http'

// app.use(cors())

// const server = http.createServer(app)
// const io = new Server(server)

// // socket io events and workings

// io.on('connection', (socket) => {
//     console.log(socket.id)

//     const text = 'hello from server'
//     socket.emmit("connectedd", text)


//     socket.on('message', (data) => {
//     console.log(data)
//     socket.broadcast.emit('message', data)
//     })
// })

// io.on('receive-message', (data) => {
//     console.log(data)
// })

// app.get('/', (req, res) => {
//     res.send("It's a server for chat app")

// })

// app.listen(8080, () => {
//     console.log('listening on port 8080')
// })


// // const express = require('express')
// import express from 'express'
// const app = express()


const http = require('http')
.createServer();

const io = require('socket.io')(http, {
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

http.listen(8080, () => console.log('listening on http://localhost:8080') );

