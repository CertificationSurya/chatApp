import {Form, InputGroup} from "react-bootstrap";
import {useNavigate, useLocation} from "react-router-dom";

import ChatItems from "./subComponents/ChatItems";
import PropTypes, {string} from "prop-types";
import {useEffect, useRef, useState} from "react";
import {socket} from "../socket";
import {useGlobalContext} from "../context/GlobalProvider";

const ChatFragment = ({
	messages,
	handleSubmit,
	text,
	onlineUsers,
	setText,
	newUser = "",
	setNewUser,
	exitGuy,
	setExitGuy,
	roomName = "Global",
}) => {
	const navigation = useNavigate();
	const {profileData, noEscape, setNoEscape} = useGlobalContext();
	const {name} = profileData;

	const [scrollable, setScrollable] = useState(false);

	const endOfMsgRef = useRef(null);
	const messageListRef = useRef(null);

	// setup get data from url
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const roomId = queryParams.get("uid");
	const [open, setOpen] = useState(false);

	const scrollToView = () => {
		endOfMsgRef.current?.scrollIntoView({behavior: "smooth"});
	};

	const exitToRoom = () => {
		navigation("/");
		socket.emit("exit_room", {
			senderId: socket.id,
			name,
			roomId,
		});
		setNoEscape(() => false);
	};

	useEffect(() => {
		let timeout;
		if (newUser) {
			timeout = setTimeout(() => {
				setNewUser("");
			}, 2000);
		}

		() => clearTimeout(timeout);
	}, [newUser]);

	useEffect(() => {
		let timeout;
		if (exitGuy) {
			timeout = setTimeout(() => {
				setExitGuy("");
			}, 2000);
		}

		() => clearTimeout(timeout);
	}, [exitGuy]);

	useEffect(() => {
		if (!messageListRef.current) return;
		scrollToView();

		const scrollEvent = messageListRef.current.addEventListener(
			"scroll",
			() => {
				const onBottom = messageListRef.current.scrollTop == 0;
				setScrollable(!onBottom);
			}
		);

		return () => {
			
			messageListRef.current && messageListRef.current.removeEventListener("scroll", scrollEvent);
		};
	}, [messageListRef.current]);

	useEffect(() => {
		setScrollable();
	}, [messages]);
	

	return (
		<div className={`chats ${noEscape ? "" : "navActive"}`}>
			<div className="room-action">
				<div
					className="roomName p-2 color-primary"
					style={{color: "var(--camera-hover)"}}>
					on Room : {roomName}
				</div>
				<div
					onClick={exitToRoom}
					className="exit-room"
					style={{color: "var(--camera-hover)", fontSize: "1.5rem"}}
					title="Exit Room">
					<i className="fa-solid fa-right-from-bracket"></i>
				</div>
			</div>

			{/* our message displayer */}
			<div ref={messageListRef} className="all-chat scrollbar">
				<div className="user-join-exit">
					{newUser && (
						<p className="joined-room text-center color-primary">
							<span>{newUser}</span> Joined The Room
						</p>
					)}
					{exitGuy && (
						<p className="joined-room text-center color-danger">
							<span>{exitGuy}</span> Exited The Room
						</p>
					)}
				</div>

				<div ref={endOfMsgRef}></div>
				{messages.length > 0 &&
					messages.map((messageObj, index) => (
						<ChatItems key={index} messageObj={messageObj} />
					))}
			</div>

			<InputGroup className="mb-3 chat-field">
				{/* click to scroll down */}
				{scrollable && (
					<div className="scroll-to-end" onClick={scrollToView}>
						{" "}
						&#x1F4E5;{" "}
					</div>
				)}

				<Form.Control
					as={"textarea"}
					placeholder="message..."
					aria-label="message field"
					aria-describedby="message-field"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyUpCapture={(e) => {
						if (e.key == "Enter") {
							if (e.shiftKey) {
								// textarea handles automatically
							}
							else handleSubmit(e);
						}
					}}
					className="scrollbar"
				/>

				<InputGroup.Text
					onClick={handleSubmit}
					id="send-out"
					className="fa-solid fa-paper-plane"
				/>
			</InputGroup>

			<div className={`online-users-wrapper ${open ? "show" : ""}`}>
				<div
					className={`${open && "opened"} online-users-tab`}
					onClick={(_) => setOpen((prev) => !prev)}>
					<span className="tab-arrow"></span>
				</div>

				<div className={`online-users ${open ? "show" : ""}`}>
					<h1 className="online-topic">List of Online User</h1>

					<div className="online-users-name scrollbar">
						{onlineUsers.map((online, idx) => (
							<span key={idx}>{online}</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

ChatFragment.propTypes = {
	messages: PropTypes.array.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
	setText: PropTypes.func.isRequired,
	roomName: PropTypes.string,
	newUser: PropTypes.string.isRequired,
	setNewUser: PropTypes.func.isRequired,
	onlineUsers: PropTypes.arrayOf(string).isRequired,
	exitGuy: PropTypes.string.isRequired,
	setExitGuy: PropTypes.func.isRequired,
};

export default ChatFragment;
