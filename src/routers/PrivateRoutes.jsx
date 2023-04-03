import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const PrivateRoutes = ({ children }) => {
  const { isAuth } = useAuth()

  return isAuth ? children : <Navigate to="/auth/login" />
}

export default PrivateRoutes
