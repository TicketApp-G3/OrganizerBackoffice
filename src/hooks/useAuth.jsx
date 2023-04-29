import { useState } from 'react'

export const useAuth = () => {
  const [isLogged, setIsLogged] = useState(false)

  const login = () => {
    setIsLogged(true)
  }

  const logout = () => {
    setIsLogged(false)
  }

  return { isLogged, login, logout }
}
