import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { auth } from '../../firebase'

export const useAuth = () => {
  const [loggedUser, setloggedUser] = useState()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  const checkUserIsAuth = async () => {
    setIsCheckingAuth(true)
    await auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedUser(user)
        setIsCheckingAuth(false)
      } else setloggedUser(null)
    })
  }

  const login = async () => {
    try {
      const googleProvider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, googleProvider)
      localStorage.setItem('loggedUser', user)
      setloggedUser(user)
    } catch (error) {
      notifications.show({
        title: 'Ocurrio un error al ingresar con Google',
        color: 'red',
      })
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('loggedUser')
      setloggedUser(null)
    } catch (error) {
      notifications.show({
        title: 'Ocurrio un error al cerrar sesión con Google',
        color: 'red',
      })
      console.error(error)
    }
  }

  useEffect(() => checkUserIsAuth, [])

  return { loggedUser, isCheckingAuth, login, logout }
}
