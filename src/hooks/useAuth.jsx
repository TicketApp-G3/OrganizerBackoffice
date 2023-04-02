import { useState } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(true)

  const login = () => {
    setIsAuth(true)
  }

  const logout = () => {
    setIsAuth(false)
  }

  return { isAuth, login, logout }
}
