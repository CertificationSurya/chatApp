import { useState, useRef } from 'react';
// import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
// image
import myImg from '../assets/default.png'

// routes
import { Link, useLocation } from 'react-router-dom';

// Component
import DetailCard from './DetailCard';

const NavBar = () => {
 
    const location = useLocation()
    console.log(location)


    const [isProfileActive, setIsProfileActive] = useState(true)
    const [userImg, setUserImg] = useState(myImg)

    // input file ref
    const fileRef = useRef(null)

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                setUserImg(URL.createObjectURL(fileRef.current.files[0]))
            }

            else alert("Only jpeg, jpg, png and gif image format are supported! ")
        }

    }

    // nav active or no
    const handleProfileClick = (trueOrFalseorNull) => {
        setIsProfileActive(trueOrFalseorNull)
    }


    return (
        <>
        <Navbar bg="primary" style={{zIndex: 999}} data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">ChatApp 101</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/" onClick={() => handleProfileClick(true)} className={`${isProfileActive ? 'active bg-body-tertiary border border-info ' : ''}  rounded-3 py-1 me-2`}>Profile</Nav.Link>
                    <Nav.Link as={Link} to="/chats" onClick={() => handleProfileClick(false)} className={`${isProfileActive === false ? 'active bg-body-tertiary border border-info ' : ''} rounded-3 py-1 rounded-3`}>Global Chats</Nav.Link>
                    <Nav.Link as={Link} to="/room" onClick={() => handleProfileClick(null)} className={`${isProfileActive === null ? 'active bg-body-tertiary border border-info ' : ''} rounded-3 py-1 rounded-3`}>Rooms</Nav.Link>
                </Nav>
                <Nav>
                    <input ref={fileRef} onChange={handleFileChange} type="file" name="file" id="file" accept='image/jpeg, image/png, image/jpg image/gif' />
                    <label data-camera='camera' htmlFor="file" className="fa-solid fa-camera" onClick={handleFileChange} />
                    <Image src={userImg} roundedCircle width='45rem' height='45rem' style={{ objectFit: 'cover' }} />
                </Nav>
            </Container>
        </Navbar>

        {location.pathname === '/' && <DetailCard userImg={userImg} handleProfileClick={handleProfileClick}/>}
        </>
    )
}

export default NavBar
