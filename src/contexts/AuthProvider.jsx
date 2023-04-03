import { createContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const { isAuth, login, logout } = useAuth()
  const contextValue = useMemo(() => ({ isAuth, login, logout }))

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
