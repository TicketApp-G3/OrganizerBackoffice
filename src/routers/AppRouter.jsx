import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { AuthContext } from '../contexts/AuthProvider'
import LoginScreen from '../screens/LoginScreen/LoginScreen'

const AppRouter = () => {
  const { loggedUser } = useContext(AuthContext)

  return (
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
