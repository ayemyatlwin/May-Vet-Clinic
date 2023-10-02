import React from 'react'
import "./App.css"
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Home/>
    </div>
  )
}

export default App
