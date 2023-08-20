import React, { useState } from 'react'
import { Card, ListGroup, Button } from 'react-bootstrap'

const Room = () => {
    const [availableRooms, setAvailableRooms] = useState([1, 2, 3, 4, 5])

    return (
        <div className="chats d-flex justify-content-evenly align-items-center">

            <div className="available-rooms">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title className="text-center"> Total Rooms : </Card.Title>
                    </Card.Body>
                    {
                        availableRooms.map(room => (
                            <ListGroup className="list-group-flush border-0  pb-2" key={room} >
                                <ListGroup className='d-flex flex-row justify-content-around align-items-center' action > {room}
                                    <Button variant="primary" size="sm" active>
                                        Join this Room
                                    </Button>
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
                        <span className="fa-solid fa-circle-plus | fs-1 text-danger" style={{ cursor: 'pointer'}}></span>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default Room
