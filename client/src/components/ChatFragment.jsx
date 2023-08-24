import { Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import ChatItems from './subComponents/ChatItems';
import PropTypes from 'prop-types';

const ChatFragment = ({ messages, handleSubmit, text, setText, roomName='Global' }) => {

    const navigation = useNavigate()

    const exitToRoom = ()=>{
        navigation('/room');
    }

    return (
        <div className="chats">
            <div onClick={exitToRoom} className="exit-room" style={{color: 'var(--camera-hover)', fontSize: '1.5rem'}} title='Exit Room'><i className='fa-solid fa-right-from-bracket'></i></div>
            <div className="roomName position-absolute p-2 color-primary" style={{color: 'var(--camera-hover)'}}>
              on Room : {roomName}
            </div>
            <div className='all-chat'>
                {messages.length > 0 && messages.map((messageObj, index) => (
                    <ChatItems messageObj={messageObj} index={index} key={index} />
                ))}

            </div>

            <InputGroup className="mb-3 chat-field">
                <Form.Control
                    placeholder="message..."
                    aria-label="message"
                    aria-describedby="basic-addon1"
                    value={text} onChange={(e) => setText(e.target.value)}
                    onKeyUpCapture={(e)=> {
                        if (e.key == 'Enter'){
                            handleSubmit(e)
                        }
                    }}
                />

                <InputGroup.Text onClick={handleSubmit} id="send-out" className="fa-solid fa-paper-plane" />
            </InputGroup>

        </div>
    )
}

ChatFragment.propTypes = {
    messages: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
    roomName: PropTypes.string
}

export default ChatFragment
