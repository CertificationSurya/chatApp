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
const roomUsers = new Map();
const globalUsers = new Map();

// utils function
/** @returns {Array<string>} */
const getGlobalUsers = () => {
	return Array.from(globalUsers.values());
};
/**
 * @param {string} roomId
 *  @returns {Array<string>}
 * */
const getRoomUsers = (roomId) => {
	// console.log(roomId)
	try {
		const roomMap = roomUsers.get(roomId);
		return Array.from(roomMap.values());
	} catch (error) {
		return [];
	}
};

// socket stuff
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
			const onlineUsers = getRoomUsers(roomId);
			// console.log(onlineUsers)

			io.to(roomId).emit("userJoined", {
				name,
				joineeId: socket.id,
				onlineUsers,
			});
		} else {
			const onlineUsers = getGlobalUsers();
			// console.log(onlineUsers);
			io.emit("gUserJoined", {name, joineeId: socket.id, onlineUsers});
		}
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

		if (roomId) {
			// console.log(roomId);
			const onlineRoomUsers = getRoomUsers(roomId);
			io.to(roomId).emit("userExited", {
				name: exitedUserName,
				newOnlineUsers: onlineRoomUsers,
			});
		} else {
			const onlineGlobalUsers = getGlobalUsers();
			io.emit("gUserExited", {
				name: exitedUserName,
				newOnlineUsers: onlineGlobalUsers,
			});
		}
	});
	// Ends

	socket.on("message", (messageObj) => {
		io.emit("message", messageObj);
	});

	socket.on("roomMessage", (messageObj) => {
		console.log(messageObj.roomId);
		io.to(messageObj.roomId).emit("roomMessage", messageObj);
	});

	socket.on("createRoom", (messageObj) => {
		io.emit("roomCreated", messageObj);
	});

	socket.on("disconnect", () => {
		const globalUserName = globalUsers.get(socket.id);

		if (globalUserName) {
			globalUsers.delete(socket.id);

			io.emit("gUserExited", {
				name: globalUserName,
				newOnlineUsers: getGlobalUsers(),
			});
		}

		for (let [roomId, users] of roomUsers) {
			if (users.has(socket.id)) {
				const name = users.get(socket.id);
				users.delete(socket.id);

				const exitObj = {
					name,
					newOnlineUsers: getRoomUsers(roomId),
				};
				io.to(roomId).emit("userExited", exitObj);
			}
		}
		// console.log(socket.id);
		io.emit("roomDisconnect", socket.id);
	});
});

server.listen(8080, () => console.log("listening on http://localhost:8080"));
