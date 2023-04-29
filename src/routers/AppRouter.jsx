import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './DashboardLayout'
import { AuthContext } from '../contexts/AuthProvider'
import LoginScreen from '../screens/LoginScreen/LoginScreen'

const AppRouter = () => {
  const { isLogged } = useContext(AuthContext)
  console.log(isLogged)

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       dispatch(login({
  //         uid: user.uid,
  //         userName: user.displayName,
  //         email: user.email,
  //         profilePic: user.photoURL,
  //       }));
  //     }
  //     setChecking(false);
  //   });
  // }, [dispatch, setChecking]);

  return (
    <BrowserRouter>
      <Routes>
        {!isLogged ? (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
