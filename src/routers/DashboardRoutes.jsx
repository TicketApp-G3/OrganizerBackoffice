import React from 'react'
import { Route, Routes } from 'react-router'
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen'

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<DashboardScreen />} />
    </Routes>
  )
}

export default DashboardRoutes
