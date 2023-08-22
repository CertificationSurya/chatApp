import  { useState, useContext } from 'react'
import { socket } from '../socket'
import { useLocation, useParams } from 'react-router-dom'
import ProfileContext from '../context/ProfileContext'

import ChatFragment from './ChatFragment'

const JoinRoom = () => {

    const {name} = useContext(ProfileContext)
    let users = [];

    const [gMessages, setGMessages] = useState([])
    // setup get data from url 
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search);

    // data
    const roomId = queryParams.get('uid');
    const roomName = useParams().roomName;
    // console.log(roomName)

    // state
    const [text, setText] = useState('')

    // when message is emmited
    socket.on('roomMessage', (messageObj) => {
        // console.log(messageObj)
        // if (messageObj.roomId === roomId) {

            const isMine = messageObj.senderId === socket.id;
            if (isMine) {
                setGMessages([{ senderId: socket.id, message: messageObj.message, isMine, name: messageObj.name }, ...gMessages]);
            } else {
                setGMessages([{ senderId: socket.id, message: messageObj.message, isMine: false, name: messageObj.name }, ...gMessages]);
            }
        // }

    })

    const handleSubmit = (e) => {
        e.preventDefault()

        text.trim()
        if (text.length > 0) {
            socket.emit('G-message', { senderId: socket.id, message: text, name, roomId })
            setText('')
        }
        else {
            setText('')
            alert("please fill the field before sending")
        }
    }
    
    socket.emit('join_room', { userId: socket.id, userName: name, roomId })

    socket.on('userJoined', ({ userId, userName }) => {
       const ExistingUser = users.find(user => user.userId === userId)
       if (!ExistingUser){
           users.push({ userName, userId })
        //    console.log(users);
       } 
    });


    return (
        <>
            <ChatFragment text={text} setText={setText} handleSubmit={handleSubmit} messages={gMessages} roomName={roomName}/>
        </>
    )
}

export default JoinRoom


// JoinRoom.propTypes = {
//     // location: PropTypes.object.isRequired,
//     name: PropTypes.string.isRequired
// }
