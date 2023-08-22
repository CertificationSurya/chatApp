// import React,{ useState } from 'react'


import NavBar from './components/Navbar'
import GlobalChats from './components/GlobalChats'
import Underway from './components/Underway'

// routers
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Room from './components/Room';
import JoinRoom from './components/JoinRoom';
const App = () => {
  return (

      <div>
        <NavBar />

        <Routes>
          <Route exact path="/" element={<> <NavBar/></>} />
          <Route exact path="/chats" element={<GlobalChats />} />
          <Route exact path="/room" element={<Room />} />
          <Route exact path="/room/:roomName" element={<JoinRoom name={name} />} />
          <Route exact path="/*" element={<Underway />} />
        </Routes>
      </div>

  )
}

export default App
