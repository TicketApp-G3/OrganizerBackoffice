import { createContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { loggedUser, login, logout } = useAuth()

  const contextValue = useMemo(() => ({
    loggedUser,
    login,
    logout,
  }))

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
