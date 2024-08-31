import {useState} from "react";
import Form from "react-bootstrap/Form";
import {Card, ListGroup, Button, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {socket} from "../socket";

import {useGlobalContext} from "../context/GlobalProvider";

const defaultRoom = {roomName: "defaultRoom", uid: "123"};
const Room = () => {
	const {setNoEscape} = useGlobalContext();

	const [availableRooms, setAvailableRooms] = useState([defaultRoom]);
	const [expandField, setExpandField] = useState(false);
	const [roomName, setRoomName] = useState("");
	const [roomCount, setRoomCount] = useState(1);

	// Room Name tester Regex
	const roomReg = new RegExp("^\\w+$", "i");

	const handleCreateRoom = () => {
		setRoomName(roomName.trim());
		if (roomName.length === 0 || roomName.length > 12) {
			setRoomName("");
			alert("noEmptyRoom or above 12 characters are allowed");
			return;
		} else if (availableRooms.find((room) => room === roomName)) {
			setRoomName("");
			alert(`Room with the name '${roomName}' already exists`);
			return;
		}
		// if name is suitable
		else if (roomReg.test(roomName)) {
			socket.emit("createRoom", {roomName, uid: socket.id});
		} else {
			alert("Only alphabets and Digits allowed without spaces");
		}
		setRoomName("");
	};

	useState(() => {
		socket.on("roomCreated", (roomObj) => {
			const existingRoom = availableRooms.find(
				(room) => room.roomName === roomObj.roomName
			);
			if (!existingRoom) {
				setRoomCount((roomCount) => roomCount + 1); // when a room is created add room_count
				setAvailableRooms((prevState) => [...prevState, roomObj]);
			}
		});

		return () => {
			socket.off();
		};
	}, [roomCount]);

	return (
		<div className="chats roomProfile d-flex  align-items-center">
			<div className="available-rooms">
				<Card style={{width: "18rem"}} className="scrollbar">
					<Card.Body>
						<Card.Title className="text-center">
							{" "}
							Total Rooms : {roomCount}
						</Card.Title>
					</Card.Body>

					{availableRooms &&
						availableRooms.map((room, idx) => (
							<ListGroup
								className="list-group-flush border-0 pb-2"
								key={idx}>
								<ListGroup className="d-flex flex-row justify-content-between align-items-center px-3">
									<span>{room.roomName}</span>
									<Link to={`/room/${room.roomName}?uid=${room.uid}`}>
										<Button
											variant="primary"
											size="sm"
											active
											onClick={() => {
												setNoEscape(true);
												// console.log("d");
											}}>
											Join this Room
										</Button>
									</Link>
								</ListGroup>
							</ListGroup>
						))}
				</Card>
			</div>

			<div className="create-room ">
				<Card style={{width: "18rem", minHeight: "6rem", padding: "0.25rem 0"}}>
					<Card.Body className="text-center" style={{height: "3rem"}}>
						<Card.Title> Create Your Own Room : </Card.Title>
					</Card.Body>
					<div className="icon-container text-center">
						<span
							onClick={() => setExpandField((prevState) => !prevState)}
							className={`${
								expandField
									? "fa-solid fa-circle-minus"
									: "fa-solid fa-circle-plus"
							} | fs-1 text-danger`}
							style={{cursor: "pointer"}}></span>
						{expandField && (
							<InputGroup className="p-2">
								<Form.Control
									placeholder="Room Name..."
									aria-label="Example text with button addon"
									aria-describedby="basic-addon1"
									value={roomName}
									onChange={(e) => setRoomName(e.target.value)}
									className="mx-1"
								/>
								<Button
									variant="outline-primary"
									id="button-addon1"
									onClick={handleCreateRoom}>
									Create
								</Button>
							</InputGroup>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Room;
