import { useState, useContext } from 'react'
import ProfileContext from '../context/ProfileContext'

// Added Socket io
import { socket } from '../socket'
import ChatFragment from './ChatFragment';

// let gUsers = [];

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

    // useEffect(()=>{
    //     socket.on('gUserJoined', (userId) => {
    //         console.log(userId)
    //         const ExistingUser = gUsers.find(eachUserId => eachUserId === userId)
    //         if (!ExistingUser){
    //             gUsers.push(userId)
    //             console.log(gUsers);
    //         } 
    //         else return;
    //      });
    //      socket.on('roomDisconnect', (leftUserId)=>{
    //         gUsers.filter(id=> id !==leftUserId)
    //         console.log(gUsers)
    //      })
        
    // })

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
    )
}

export default GlobalChats


