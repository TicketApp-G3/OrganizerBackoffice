import { createContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { loggedUser, isCheckingAuth, login, logout } = useAuth()

  const contextValue = () => ({
    loggedUser,
    isCheckingAuth,
    login,
    logout,
  })

  return (
    <AuthContext.Provider value={{ loggedUser, isCheckingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
