import {useState, useRef} from "react";
import PropTypes, {func} from "prop-types";
// import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

// routes
import {Link, useLocation} from "react-router-dom";

// Component
import DetailCard from "./DetailCard";
import {useGlobalContext} from "../context/GlobalProvider";

const NavBar = () => {
	const {profileData, setProfileData, noEscape} = useGlobalContext();

	const currentLocation = useLocation().pathname;
	// input file ref
	const fileRef = useRef(null);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];

		if (selectedFile) {
			if (selectedFile.type.startsWith("image/")) {
				// for img in  localStorage
				const reader = new FileReader();
				reader.onloadend = () => {
					const base64img = reader.result;
					setProfileData({...profileData, profilePicSrc: base64img});
				};
				reader.readAsDataURL(selectedFile);
			} else alert("Only jpeg, jpg, png and gif image format are supported! ");
		}
	};

	return (
		<>
			<Navbar
				bg="primary"
				style={{zIndex: 999}}
				data-bs-theme="dark"
				className={`navbar ${noEscape ? "" : "navActive"}`}>
				<Container>
					<Navbar.Brand as={Link} to="/">
						Certi-ChatApp
					</Navbar.Brand>
					<Nav className="nav-items | me-auto ">
						<Nav.Link
							as={Link}
							to="/"
							className={`${
								currentLocation == "/"
									? "active bg-body-tertiary border border-info "
									: ""
							}  rounded-3 py-1 me-2`}>
							Profile
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/chats"
							className={`${
								currentLocation == "/chats"
									? "active bg-body-tertiary border border-info "
									: ""
							} rounded-3 py-1 rounded-3`}>
							Global Chats
						</Nav.Link>
						<Nav.Link
							as={Link}
							to="/room"
							className={`${
								currentLocation.includes("/room")
									? "active bg-body-tertiary border border-info "
									: ""
							} rounded-3 py-1 rounded-3`}>
							Rooms
						</Nav.Link>
					</Nav>
					<Nav className="profile-img-wrapper">
						<input
							ref={fileRef}
							onChange={handleFileChange}
							type="file"
							name="file"
							id="file"
							accept="image/jpeg, image/png, image/jpg image/gif"
						/>
						<label
							data-camera="camera"
							htmlFor="file"
							className="fa-solid fa-camera"
							onClick={handleFileChange}
						/>
						<Image
							src={profileData.profilePicSrc}
							roundedCircle
							width="45rem"
							height="45rem"
							style={{objectFit: "cover"}}
						/>
					</Nav>
				</Container>
			</Navbar>

			{currentLocation === "/" && <DetailCard />}
		</>
	);
};

export default NavBar;
