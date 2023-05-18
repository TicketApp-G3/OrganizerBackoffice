import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications'
import { auth } from '../../firebase'
import apiProvider from '../api/apiProvider'

export const useAuth = () => {
  const [loggedUser, setloggedUser] = useState()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  console.log('useAuth')

  const getUserData = (userData) => {
    const { profile } = getAdditionalUserInfo(userData)

    const formattedUserData = {
      userId: profile.id,
      name: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
    }

    const pageUserDate = {
      ...formattedUserData,
      profileImage: profile.picture,
    }

    apiProvider().login({
      userData: formattedUserData,
      onSuccess: () => {
        localStorage.setItem('loggedUser', JSON.stringify(pageUserDate))
        setloggedUser(pageUserDate)
      },
      onFailure: () => setloggedUser(null),
    })
  }

  const checkUserIsAuth = useCallback(async () => {
    console.log('asdasdasdasd asdas dsad')
    setIsCheckingAuth(true)
    console.log('checkuserisauth')

    await auth.onAuthStateChanged((user) => {
      console.log('Usuario de firebase: ', user)
      if (user) {
        const localUser = localStorage.getItem('loggedUser')
        console.log('Usuario del localstorage: ', localUser)
        setloggedUser(JSON.parse(localUser))
        setIsCheckingAuth(false)
      } else {
        setloggedUser(null)
        setIsCheckingAuth(false)
      }
    })
  }, [auth])

  const login = async () => {
    const googleProvider = new GoogleAuthProvider()
    googleProvider.addScope('profile')
    googleProvider.addScope('email')

    try {
      const userData = await signInWithPopup(auth, googleProvider)
      getUserData(userData)
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

  useEffect(() => checkUserIsAuth, [checkUserIsAuth])

  return { loggedUser, isCheckingAuth, login, logout }
}
