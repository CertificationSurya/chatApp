// import React,{ useState } from 'react'


import NavBar from './components/Navbar'
import Chats from './components/Chats'

import Underway from './components/Underway'

// routers
import { Route, Routes } from 'react-router-dom';

import './App.css';
import Room from './components/Room';
const App = () => {

  return (
    <div>
     
      <NavBar />

      <Routes>
        <Route exact path="/" element={<> </>}/>
        <Route exact path="/chats" element={<Chats name={crypto.randomUUID()}/>} />
        <Route exact path="/room" element={<Room />} />
        <Route exact path="/*" element={<Underway/>} />
      </Routes>

      
    </div>
  )
}

export default App
