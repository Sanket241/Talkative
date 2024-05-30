import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App