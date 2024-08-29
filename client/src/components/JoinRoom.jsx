import {useState, useContext, useEffect} from "react";
import {socket} from "../socket";
import {useLocation, useParams} from "react-router-dom";

import ChatFragment from "./ChatFragment";
import {useGlobalContext} from "../context/GlobalProvider";

const JoinRoom = () => {
	const {profileData, noEscape, setNoEscape} = useGlobalContext();
	const {name} = profileData;

	const [exitGuy, setExitGuy] = useState("");
	const [newUser, setNewUser] = useState("");
	const [gMessages, setGMessages] = useState([]);
	const [users, setUsers] = useState([]);

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
		const handleUserJoined = ({joineeId: userId, name: userName}) => {
			console.log(userId, userName, socket.id);
			if (userId !== socket.id) {
				setNewUser(name);
				const ExistingUser = users.find((user) => user.userId === userId);
				if (!ExistingUser) {
					setUsers((prev) => [...prev, {userName, userId}]);
				}
			}
		};

		const handleUserExited = (name) => {
			setExitGuy(name);
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
				roomId={roomId}
				name={name}
				exitGuy={exitGuy}
				setExitGuy={setExitGuy}
			/>
		</>
	);
};

export default JoinRoom;
