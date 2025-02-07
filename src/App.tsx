
import { Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react'

import LoginPage from './pages/Login-page/LoginPage'
import LandingPage from './pages/Landing-page/LandingPage';
import './App.scss'

function App() {
  const [userOn, setUserOn] = useState<boolean>(() => {
    return localStorage.getItem('is_user_login') === 'true'
  })

  useEffect(() => {
    const isUserLoggedIn = () => { setUserOn(localStorage.getItem('is_user_login') === 'true') }
    window.addEventListener("storage", isUserLoggedIn)
    return () => {
      window.removeEventListener("storage", isUserLoggedIn);
    }
  }, [])

  return (
      <div className='appBody'>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={!userOn ? <LoginPage/> : <Navigate to="/home-page"/>} />
          <Route path="/home-page" element={userOn ? <LandingPage/> : <Navigate to="/login"/>} />
        </Routes>
      </div>
  )
}

export default App
