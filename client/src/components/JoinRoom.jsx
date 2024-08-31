import {useState, useContext, useEffect} from "react";
import {socket} from "../socket";
import {useLocation, useParams} from "react-router-dom";

import ChatFragment from "./ChatFragment";
import {useGlobalContext} from "../context/GlobalProvider";

const JoinRoom = () => {
	const {profileData} = useGlobalContext();
	const {name} = profileData;

	const [exitGuy, setExitGuy] = useState("");
	const [newUser, setNewUser] = useState("");
	const [gMessages, setGMessages] = useState([]);
	const [onlineUsers, setOnlineUsers] = useState([]);

	// setup get data from url
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);

	// data
	const roomId = queryParams.get("uid");
	const roomName = useParams().roomName;
	// console.log(roomName)

	// state
	const [text, setText] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		text.trim();
		if (text.length > 0) {
			socket.emit("roomMessage", {
				senderId: socket.id,
				message: text,
				name,
				roomId,
			});
			setText("");
		} else {
			setText("");
			alert("please fill the field before sending");
		}
	};

	useEffect(() => {
		const handleUserJoined = ({
			joineeId,
			name,
			onlineUsers,
		}) => {
			if (joineeId !== socket.id) {
				setNewUser(name);
			} else {
				setNewUser("You")
			}
			// console.log(onlineUsers)
			setOnlineUsers(onlineUsers);
		};

		const handleUserExited = ({name, newOnlineUsers}) => {
			// console.log(newOnlineUsers)
			setExitGuy(name);
			setOnlineUsers(newOnlineUsers)
		};

		/**
		 * @typedef {import ('../../js_docs/chatType').RoomMsgObjType RoomMsgObjType}
		 * @param {RoomMsgObjType} messageObj
		 */
		const handleRoomMessage = (messageObj) => {
			// console.log(messageObj);
			const isMine = messageObj.senderId === socket.id;
			setGMessages((prevMsgObj) => [
				{
					senderId: messageObj.senderId,
					message: messageObj.message,
					isMine,
					name: messageObj.name,
				},
				...prevMsgObj,
			]);
		};

		// when message is emmited
		socket.on("roomMessage", handleRoomMessage);
		socket.on("userJoined", handleUserJoined);
		socket.on("userExited", handleUserExited);

		return () => {
			socket.off("roomMessage", handleRoomMessage);
			socket.off("userJoined", handleUserJoined);
			socket.off("UserExited", handleUserExited);
		};
	}, [socket]);

	useEffect(() => {
		socket.emit("userJoined", {name, roomId});

		return () => {
			socket.emit("userExited", roomId);
		};
	}, []);

	return (
		<>
			<ChatFragment
				text={text}
				setText={setText}
				handleSubmit={handleSubmit}
				messages={gMessages}
				roomName={roomName}
				newUser={newUser}
				setNewUser={setNewUser}
				exitGuy={exitGuy}
				setExitGuy={setExitGuy}
				onlineUsers={onlineUsers}
			/>
		</>
	);
};

export default JoinRoom;
