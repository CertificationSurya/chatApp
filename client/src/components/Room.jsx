import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Button, InputGroup, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { socket } from '../socket'



const defaultRoom = { roomName: 'defaultRoom', uid: '123' }

const Room = () => {
    const [availableRooms, setAvailableRooms] = useState([defaultRoom])
    const [expandField, setExpandField] = useState(false)
    const [roomName, setRoomName] = useState('')
    const [roomCount, setRoomCount] = useState(1)

    // Room Name tester Regex
    const roomReg = new RegExp('^\\w+$', 'i')

    const handleCreateRoom = () => {
        setRoomName(roomName.trim())
        if (roomName.length === 0 || roomName.length > 12) {
            setRoomName('')
            alert('noEmptyRoom or above 12 characters are allowed')
            return;
        }
        else if (availableRooms.find(room => room === roomName)) {
            setRoomName('')
            alert(`Room with the name '${roomName}' already exists`)
            return;
        }
        // if name is suitable
        else if (roomReg.test(roomName)) {
            socket.emit('createRoom', { roomName, uid: socket.id });
            setRoomCount(prevState => prevState + 1)
        }

        else {
            alert('Only alphabets and Digits allowed without spaces')
        }
        setRoomName('')
    }

    useState(()=>{
        socket.on('roomCreated', (roomObj) => {
            const existingRoom = availableRooms.find(room => room.roomName === roomObj.roomName);
            if (!existingRoom) {
                setAvailableRooms(prevState => [...prevState, roomObj]);
            }
        });
    },[roomCount])

    return (
        <div className="chats roomProfile d-flex  align-items-center">

            <div className="available-rooms">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title className="text-center"> Total Rooms : </Card.Title>
                    </Card.Body>

                    {availableRooms &&
                        availableRooms.map(room => (
                            <ListGroup className="list-group-flush border-0  pb-2" key={room.uid} >
                                <ListGroup className='d-flex flex-row justify-content-around align-items-center' > {room.roomName}
                                    <Link to={`/room/${room.roomName}?uid=${room.uid}`}>
                                        <Button variant="primary" size="sm" active>
                                            Join this Room
                                        </Button>
                                    </Link>
                                </ListGroup>
                            </ListGroup>
                        ))
                    }
                </Card>
            </div>

            <div className="create-room ">
                <Card style={{ width: '18rem', minHeight: "6rem", padding: '0.25rem 0' }}>
                    <Card.Body className="text-center" style={{ height: '3rem' }}>
                        <Card.Title> Create Your Own Room : </Card.Title>
                    </Card.Body>
                    <div className='icon-container text-center'>
                        <span onClick={() => setExpandField(prevState => !prevState)} className={`${expandField ? 'fa-solid fa-circle-minus' : 'fa-solid fa-circle-plus'} | fs-1 text-danger`} style={{ cursor: 'pointer' }}></span>
                        {
                            expandField && (
                                <InputGroup className="my-3 container">
                                    <Form.Control
                                        placeholder='Room Name...'
                                        aria-label="Example text with button addon"
                                        aria-describedby="basic-addon1"
                                        value={roomName} onChange={(e) => setRoomName(e.target.value)}
                                    />
                                    <Button variant="outline-primary" id="button-addon1" onClick={handleCreateRoom}>
                                        Create
                                    </Button>
                                </InputGroup>
                            )
                        }
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default Room
