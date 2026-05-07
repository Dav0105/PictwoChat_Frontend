import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Rooms from './pages/Rooms'
import Profile from './pages/Profile'
import RequireAuth from './components/RequireAuth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={
          <RequireAuth>
            <Rooms />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
