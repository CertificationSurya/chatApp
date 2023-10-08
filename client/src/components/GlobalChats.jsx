import { useState, useContext, useEffect } from "react";
import ProfileContext from "../context/ProfileContext";

// Added Socket io
import { socket } from "../socket";
import ChatFragment from "./ChatFragment";
import PropTypes from 'prop-types'
// let gUsers = [];

const GlobalChats = ({noEscape}) => {
  // using context
  const data = useContext(ProfileContext);
  const name = data.name;

  const [newUser, setNewUser] = useState("");

  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // when message is emmited
  socket.on("message", (messageObj) => {
    const isMine = messageObj.senderId === socket.id;
    if (isMine) {
      setMessages([
        {
          senderId: socket.id,
          message: messageObj.message,
          isMine,
          name: messageObj.name,
        },
        ...messages,
      ]);
    } else {
      setMessages([
        {
          senderId: socket.id,
          message: messageObj.message,
          isMine: false,
          name: messageObj.name,
        },
        ...messages,
      ]);
    }
  });
  socket.on("JoinedUser", (name) => {
    setNewUser(name);
    console.log(name);
  });

  useEffect(() => {
    socket.emit("gUserJoined", { name: data.name });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    text.trim();
    if (text.length > 0) {
      socket.emit("message", { senderId: socket.id, message: text, name });
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
      noEscape={noEscape}
    />
  );
};

export default GlobalChats;


GlobalChats.propTypes = {
  noEscape: PropTypes.bool.isRequired
}