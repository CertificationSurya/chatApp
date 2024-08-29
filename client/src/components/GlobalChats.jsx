import {useState, useContext, useEffect} from "react";

/** @typedef {import ("../../js_docs/chatType.js").GlobalUserJoinedObjType GlobalUserJoinedObjType} */

// Added Socket io
import {socket} from "../socket";
import ChatFragment from "./ChatFragment";
import PropTypes from "prop-types";
import {useGlobalContext} from "../context/GlobalProvider";
// let gUsers = [];

const GlobalChats = () => {
	const {profileData} = useGlobalContext();
	const {name} = profileData;

	const [newUser, setNewUser] = useState("");
	const [exitGuy, setExitGuy] = useState("");

	const [text, setText] = useState("");
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		const handleMessage = (messageObj) => {
			const isMine = messageObj.senderId === socket.id;
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
			const {name, joineeId} = joineeObj;
			if (joineeId !== socket.id) {
				setNewUser(name);
				console.log(name);
			}
		};

		/** @param {string} name */
		const handleUserExit = (name) => {
			console.log(name)
			setExitGuy(name);
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
			setText("");
		} else {
			setText("");
			alert("please fill the field before sending");
		}
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
		/>
	);
};

export default GlobalChats;
