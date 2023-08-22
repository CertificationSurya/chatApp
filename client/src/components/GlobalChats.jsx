import { useState, useContext } from 'react'
import ProfileContext from '../context/ProfileContext'

// Added Socket io
import { socket } from '../socket'
import ChatFragment from './ChatFragment';

const GlobalChats = () => {
    // using context
    const data = useContext(ProfileContext)
    const name = data.name;

    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    // when message is emmited
    socket.on('message', (messageObj) => {
        const isMine = messageObj.senderId === socket.id;
        if (isMine) {
            setMessages([{ senderId: socket.id, message: messageObj.message, isMine, name: messageObj.name }, ...messages,])
        }
        else {
            setMessages([{ senderId: socket.id, message: messageObj.message, isMine: false, name: messageObj.name }, ...messages,])
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        text.trim()
        if (text.length > 0) {
            socket.emit('message', { senderId: socket.id, message: text, name })
            setText('')
        }
        else {
            setText('')
            alert("please fill the field before sending")
        }
    }

    return (
        <ChatFragment messages={messages} handleSubmit={handleSubmit} text={text} setText={setText} />

        // <div className="chats">

        //     <div className='all-chat'>
        //         {messages.length > 0 && messages.map((messageObj, index) => (

        //             <ChatItems messageObj={messageObj} index={index} key={index} />

        //         ))}

        //     </div>

        //     <InputGroup className="mb-3 chat-field">
        //         <Form.Control
        //             placeholder="message..."
        //             aria-label="message"
        //             aria-describedby="basic-addon1"
        //             value={text} onChange={(e) => setText(e.target.value)}
        //         />

        //         <InputGroup.Text onClick={handleSubmit} id="send-out" className="fa-solid fa-paper-plane" />
        //     </InputGroup>

        // </div>

    )
}

export default GlobalChats


