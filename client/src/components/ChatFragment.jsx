import { Form, InputGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

import ChatItems from "./subComponents/ChatItems";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { socket } from "../socket";

const ChatFragment = ({
  name,
  messages,
  handleSubmit,
  text,
  setText,
  newUser = "",
  setNewUser,
  exitGuy,
  setExitGuy,
  noEscape,
  setNoEscape,
  roomName = "Global",
}) => {
  const navigation = useNavigate();

  // setup get data from url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get("uid");

  const exitToRoom = () => {
    navigation("/room");
    socket.emit("exit_room", {
      senderId: socket.id,
      name,
      roomId,
    });
    setNoEscape(()=> false)
  };

  useEffect(() => {
    let timeout;
    if (newUser) {
      timeout = setTimeout(() => {
        setNewUser("");
      }, 2000);
    }

    () => clearTimeout(timeout);
  }, [newUser, exitGuy]);

  useEffect(() => {
    let timeout;
    if (exitGuy) {
      timeout = setTimeout(() => {
        setExitGuy("");
      }, 2000);
    }

    () => clearTimeout(timeout);
  }, [exitGuy, newUser]);


  console.log(newUser);
  return (
    <div className={`chats ${noEscape? "": "navActive"}`}>
      <div
        onClick={exitToRoom}
        className="exit-room"
        style={{ color: "var(--camera-hover)", fontSize: "1.5rem" }}
        title="Exit Room"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
      <div
        className="roomName position-absolute p-2 color-primary"
        style={{ color: "var(--camera-hover)" }}
      >
        on Room : {roomName}
      </div>
      <div className="all-chat">
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
        {messages.length > 0 &&
          messages.map((messageObj, index) => (
            <ChatItems messageObj={messageObj} index={index} key={index} />
          ))}
      </div>

      <InputGroup className="mb-3 chat-field">
        <Form.Control
          placeholder="message..."
          aria-label="message"
          aria-describedby="basic-addon1"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUpCapture={(e) => {
            if (e.key == "Enter") {
              handleSubmit(e);
            }
          }}
        />

        <InputGroup.Text
          onClick={handleSubmit}
          id="send-out"
          className="fa-solid fa-paper-plane"
        />
      </InputGroup>
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
  name: PropTypes.string.isRequired,
  exitGuy: PropTypes.string.isRequired,
  setExitGuy: PropTypes.func.isRequired,
  setNoEscape: PropTypes.func.isRequired,
  noEscape: PropTypes.bool.isRequired,
};

export default ChatFragment;
