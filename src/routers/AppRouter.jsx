import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { AuthContext } from '../contexts/AuthProvider'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen'
import { auth } from '../../firebase'

const AppRouter = () => {
  const { loggedUser, setloggedUser } = useContext(AuthContext)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const checkUserIsAuth = async () => {
    setIsCheckingAuth(true)

    await auth.onAuthStateChanged((user) => {
      if (user) {
        const localUser = localStorage.getItem('loggedUser')
        setloggedUser(JSON.parse(localUser))
        setIsCheckingAuth(false)
      } else {
        setloggedUser(null)
        setIsCheckingAuth(false)
      }
    })
  }

  useEffect(() => {
    checkUserIsAuth()
  }, [])

  return isCheckingAuth ? (
    <LoadingScreen />
  ) : (
    <BrowserRouter>
      <Routes>
        {!loggedUser ? (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
