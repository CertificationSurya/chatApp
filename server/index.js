const express = require("express");
const app = express();
const server = require("http").Server(app);

// accept url parameter
// app.use(express.urlencoded({ extended: true }));

/**
 * @typedef {Object} User
 * @property {string} socketId - user Socket id
 * @property {string} username - username
 */

/**
 * @typedef {Map<string, Map<string, string>>} RoomUserMap
 * @description (roomId, [(user1SocketId, name), (user2SocketId, name)])
 */

/** @type {RoomUserMap} */
let roomUsers = new Map();
let globalUsers = new Map();


const io = require("socket.io")(server, {
	cors: {origin: "*"},
});

io.on("connection", (socket) => {
	// user joined and exited in global and room
	socket.on("userJoined", ({name, roomId = null}) => {
		// console.log(name, roomId);

		if (!roomId) {
			if (!globalUsers.has(socket.id)) {
				globalUsers.set(socket.id, name);
			}
		} else {
			// if we already have room
			if (roomUsers.has(roomId)) {
				roomUsers.get(roomId).set(socket.id, name);
			} else {
				const newJoineeMap = new Map([[socket.id, name]]);
				roomUsers.set(roomId, newJoineeMap);
				// console.log(roomUsers);
			}
		}
		// console.log(globalUsers);
		if (roomId) {
			socket.join(roomId);
			io.to(roomId).emit("userJoined", {name, joineeId: socket.id});
		} else io.emit("gUserJoined", {name, joineeId: socket.id});
	});

	socket.on("userExited", (roomId = null) => {
		const socketId = socket.id;
		let exitedUserName = "";

		if (!roomId) {
			if (globalUsers.has(socketId)) {
				exitedUserName = globalUsers.get(socketId);
				// console.log(exitedUserName);
				globalUsers.delete(socket.id);
			}
		} else {
			if (roomUsers.get(roomId)) {
				exitedUserName = roomUsers.get(roomId).get(socketId);
				const userMap = roomUsers.get(roomId);
				userMap.delete(socketId);
			}
		}

		if (roomId) io.to(roomId).emit("userExited", exitedUserName);
		else io.emit("gUserExited", exitedUserName);
	});
	// Ends

	socket.on("message", (message) => {
		console.log(socket.id);
		io.emit("message", message);
	});


	socket.on("roomMessage", (messageObj) => {
		io.to(messageObj.roomId).emit("roomMessage", messageObj);
	});

	socket.on("createRoom", (messageObj) => {
		io.emit("roomCreated", messageObj);
	});

	// io.on('disconnect', ()=>{
	//   console.log(socket)
	//   io.emit("roomDisconnect", socket.id);
	// })
});

server.listen(8080, () => console.log("listening on http://localhost:8080"));
