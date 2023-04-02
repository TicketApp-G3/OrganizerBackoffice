import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const PublicRoutes = ({ children }) => {
  const { isAuth } = useAuth()

  return !isAuth ? children : <Navigate to="/" />
}

export default PublicRoutes
