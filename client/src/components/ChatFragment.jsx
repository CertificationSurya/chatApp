import React from 'react'
import { Form,InputGroup }from 'react-bootstrap';

import ChatItems from './subComponents/ChatItems';
import PropTypes from 'prop-types';

const ChatFragment = ({messages, handleSubmit, text, setText}) => {
  return (
    <div className="chats">

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
    setText: PropTypes.func.isRequired
}

export default ChatFragment
