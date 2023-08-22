import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileState from './context/ProfileState.jsx'

import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <ProfileState>
      <Router>
        <App />
      </Router>
    </ProfileState>
  </React.StrictMode>,
)
