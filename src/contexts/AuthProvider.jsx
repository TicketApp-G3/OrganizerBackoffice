import { createContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { loggedUser, setloggedUser, login, logout } = useAuth()

  const contextValue = useMemo(() => ({
    loggedUser,
    setloggedUser,
    login,
    logout,
  }))

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
