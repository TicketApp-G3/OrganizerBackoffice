import { createContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  console.log('Probando')
  const { loggedUser, isCheckingAuth, login, logout } = useAuth()
  console.log(loggedUser)

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
