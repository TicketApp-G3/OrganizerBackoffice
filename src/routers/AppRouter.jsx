import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { AuthContext } from '../contexts/AuthProvider'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen'

const AppRouter = () => {
  const { isCheckingAuth, loggedUser } = useContext(AuthContext)
  console.log(isCheckingAuth)

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
