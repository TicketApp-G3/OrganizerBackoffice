import { createContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { isLogged, login, logout } = useAuth()
  const contextValue = useMemo(() => ({ isLogged, login, logout }))

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
