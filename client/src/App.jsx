import React,{ useState } from 'react'

import { socket } from './socket'
import NavBar from './components/Navbar'
import Chats from './components/Chats'


// routers
import { Route, Routes } from 'react-router-dom';

import './App.css';
const App = () => {
  const [text, setText] = useState('')

  socket.on('message', (text='')=>{
    setText(text)
  })


  return (
    <div>
      {/* <input type="text" />
      <button onClick={() => socket.emit('message', 'Hello')}>Send</button> */}
      <NavBar />

      <Routes>
        <Route path="/chats" element={<Chats/>} />
      </Routes>

      
    </div>
  )
}

export default App
