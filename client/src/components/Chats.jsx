import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Chats = () => {
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        text.trim('/s')
        if (text.length > 0) {
            messages.push(text)
            setText('')
        }
        else{
            setText('')
            alert("please fill the field before sending")
        }
    }

    return (
        <div className="chats">

            <div className='all-chat'>
                My messages
            </div>

            <InputGroup className="mb-3 chat-field">
                <Form.Control
                    placeholder="message..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={text} onChange={(e) => setText(e.target.value)}
                />

                <InputGroup.Text onClick={handleSubmit} id="send-out" className="fa-solid fa-paper-plane" />
            </InputGroup>

            {/* {messages]} */}
        </div>

    )
}

export default Chats
