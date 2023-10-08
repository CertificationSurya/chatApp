const express = require("express");
const app = express();
const server = require("http").Server(app);

// accept url parameter
// app.use(express.urlencoded({ extended: true }));

let roomUsers = [];
let globalUsers = [];

const checkExistingUser = (userDataObj, typeOfRoom = []) => {
  return typeOfRoom.filter(
    (userData) => userData.userId === userDataObj.userId
  );
};

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  // console.log('a user connected');
  io.emit("gUserJoined", socket.id);

  socket.on("message", (message) => {
    console.log(socket.id);
    io.emit("message", message);
  });

  socket.on("join_room", (message) => {
    // adding users
    if (checkExistingUser(message, roomUsers).length == 0) {
      const { userId, userName, roomId } = message;
      roomUsers.push({ userId, userName, roomId });
    //   socket.emit("JoinedUser", userName);
      io.emit("JoinedUser",roomUsers[roomUsers.length-1].userName);
    }

    // console.log(roomUsers);
    // Join the room
    socket.join(message.roomId);
    io.emit("userJoined", message, roomUsers);
  });

  // user Exit
  socket.on("exit_room", (userDataObj) => {
    // removing users
    roomUsers = roomUsers.filter(
      (item) => item.userId !== userDataObj.senderId
    );
    console.log("RoomUser After exit", roomUsers);

    io.to(userDataObj.roomId).emit("userExitted", userDataObj.name);
  });

  socket.on("G-message", (messageObj) => {
    io.emit("roomMessage", messageObj);
  });

  socket.on("createRoom", (messageObj) => {
    io.emit("roomCreated", messageObj);
  });

  socket.on("gUserJoined", (data) => {
    console.log(data);
    socket.emit("JoinedUser", data.name);
  });

  // server.on('disconnect', ()=>{
  //     io.emit('roomDisconnect', socket.id)
  // })
});

server.listen(8080, () => console.log("listening on http://localhost:8080"));
