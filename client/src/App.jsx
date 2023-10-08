// import React,{ useState } from 'react'


import NavBar from './components/Navbar'
import GlobalChats from './components/GlobalChats'
import Underway from './components/Underway'

// routers
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Room from './components/Room';
import JoinRoom from './components/JoinRoom';
import { useState } from 'react';
const App = () => {

  const [noEscape, setNoEscape] = useState(false)
  console.log(noEscape)
  return (

      <div>
          { !noEscape && <NavBar noEscape={noEscape}/> }
        <Routes>
        { !noEscape && <Route exact path="/" element={<> <NavBar noEscape={noEscape}/></>} />}

        <Route exact path="/chats" element={<GlobalChats noEscape={noEscape}/>} />
        <Route exact path="/room" element={<Room setNoEscape={setNoEscape} />} />
        <Route exact path="/room/:roomName" element={<JoinRoom name={name} setNoEscape={setNoEscape} noEscape={noEscape}/>} />
        <Route exact path="/*" element={<Underway />} />
        </Routes>
      </div>

  )
}

export default App
