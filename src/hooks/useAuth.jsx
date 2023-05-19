import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useState } from 'react'
import { notifications } from '@mantine/notifications'
import { auth } from '../../firebase'
import apiProvider from '../api/apiProvider'

export const useAuth = () => {
  const [loggedUser, setloggedUser] = useState()

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

  return { loggedUser, setloggedUser, login, logout }
}
