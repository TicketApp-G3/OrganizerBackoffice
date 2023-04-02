import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<PublicRoutes />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
