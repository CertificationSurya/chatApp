// import React from 'react'
import { Link } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Image from 'react-bootstrap/Image';
import { Modal, Button, Form, Card, ListGroup, Image } from 'react-bootstrap'

import PropTypes from 'prop-types';

import { useContext, useState, useRef } from 'react';
import ProfileContext from '../context/ProfileContext';



const DetailCard = ({ userImg }) => {
  // getting context
  const data = useContext(ProfileContext)
  // Assigning Reference
  const nameRef = useRef(null)
  const ageRef = useRef(null)

  // modal field
  const [name, setName] = useState(data.name)
  const [age, setAge] = useState(data.age)

  // modal display
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // on click to Save Changes
  const setValues = () => {
    setName(name.trim())

    if (age <= 0 || age > 100) {
      alert('age <= 0 || age > 100')
      handleClose()
      return;
    }
    if (name.length === 0) {
      alert("No Empty Name.")
      handleClose()
      return;
    }

    data.age = age;
    data.name = name;

    handleClose()
  }

  return (
    <>

      <div className="Detail-card">

        <Card style={{ width: '20rem' }}>
          <Image rounded height={125} width={150} src={userImg} style={{ margin: '15px auto' }} />
          <Card.Body className='d-flex justify-content-between'>
            <Card.Title className='mt-2'>Profile: </Card.Title>
            <Button variant="primary" onClick={handleShow} style={{width: '5rem', height: '2.25rem'}}>
              Edit
            </Button>
          </Card.Body>

          <ListGroup className="list-group-flush">
            <ListGroup.Item>Name: {data.name}</ListGroup.Item>
            <ListGroup.Item>Age: {data.age}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link as={Link} to="/room" className='join-link'>Go to <span className='theGuy'>Room</span></Card.Link>
          </Card.Body>
        </Card>
      </div>

      {/* For Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name: </Form.Label>
              <Form.Control
                type="name"
                placeholder={data.name}
                autoFocus
                ref={nameRef}
                value={name}
                onChange={(e)=> setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label> Age </Form.Label>
              <Form.Control
                type='number' min='1' max='100'
                rows={3}
                ref={ageRef} value={age}
                onChange={(e) => setAge(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={setValues}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  )
}

DetailCard.propTypes = {
  userImg: PropTypes.any.isRequired,
}

export default DetailCard
