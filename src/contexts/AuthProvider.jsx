import { createContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { loggedUser, isCheckingAuth, login, logout } = useAuth()
  console.log(loggedUser, isCheckingAuth, login, logout)
  const contextValue = useMemo(() => ({
    loggedUser,
    isCheckingAuth,
    login,
    logout,
  }))

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
