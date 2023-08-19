// import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

const DetailCard = ({userImg, name='Lorem12', age=23}) => {
  return (
    <div className="Detail-card">

    <Card style={{ width: '20rem' }}>
    <Image rounded height={125} width={150} src={userImg} style={{ margin: '15px auto' }}/>
      <Card.Body>
        <Card.Title>Profile: </Card.Title>
      </Card.Body>

      <ListGroup className="list-group-flush">
        <ListGroup.Item>Name: {name}</ListGroup.Item>
        <ListGroup.Item>Age: {age}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link as={Link} to="/room" className='join-link'>Join Room with <span className='theGuy'>{name}</span></Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

DetailCard.propTypes = {
    userImg: PropTypes.any.isRequired,
    name: PropTypes.string,
    age: PropTypes.number
}

export default DetailCard
