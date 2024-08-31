import {useState, useEffect} from "react";

/** @typedef {import ("../../js_docs/chatType.js").GlobalUserJoinedObjType GlobalUserJoinedObjType} */

// Added Socket io
import {socket} from "../socket";
import ChatFragment from "./ChatFragment";
import {useGlobalContext} from "../context/GlobalProvider";
// let gUsers = [];

const GlobalChats = () => {
	const {profileData} = useGlobalContext();
	const {name} = profileData;

	const [newUser, setNewUser] = useState("");
	const [exitGuy, setExitGuy] = useState("");
	const [onlineUsers, setOnlineUsers] = useState([]);

	const [text, setText] = useState("");
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		const handleMessage = (messageObj) => {
			const isMine = (messageObj.senderId === socket.id);
			setMessages((prevMessages) => [
				{
					senderId: messageObj.senderId,
					message: messageObj.message,
					isMine,
					name: messageObj.name,
				},
				...prevMessages,
			]);
		};

		/** @param {GlobalUserJoinedObjType} joineeObj  */
		const handleJoinedUser = (joineeObj) => {
			const {name, joineeId, onlineUsers} = joineeObj;
			if (joineeId !== socket.id) {
				setNewUser(name);
			} else {
				setNewUser("You")
			}
			setOnlineUsers(onlineUsers)
		};

		/** @param {string} name */
		/** @param {string[]} newOnlineUsers */
		const handleUserExit = ({name, newOnlineUsers}) => {
			// console.log(name)
			setExitGuy(name);
			setOnlineUsers(newOnlineUsers);
		};

		socket.on("message", handleMessage);
		socket.on("gUserJoined", handleJoinedUser);
		socket.on("gUserExited", handleUserExit);

		return () => {
			socket.off("gUserExited", handleUserExit);
			socket.off("message", handleMessage);
			socket.off("gUserJoined", handleJoinedUser);
		};
	}, [socket]);

	useEffect(() => {
		socket.emit("userJoined", {name});

		return () => {
			socket.emit("userExited");
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		text.trim();
		if (text.length > 0) {
			socket.emit("message", {senderId: socket.id, message: text, name});
		} else {
			alert("please fill the field before sending");
		}
		setText("");
	};

	return (
		<ChatFragment
			messages={messages}
			handleSubmit={handleSubmit}
			text={text}
			setText={setText}
			newUser={newUser}
			setNewUser={setNewUser}
			exitGuy={exitGuy}
			setExitGuy={setExitGuy}
			onlineUsers={onlineUsers}
		/>
	);
};

export default GlobalChats;
