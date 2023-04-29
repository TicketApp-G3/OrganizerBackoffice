import React, { useContext } from 'react'
import './MetricsScreenStyles.css'
import { Button } from '@mantine/core'
import { AuthContext } from '../../contexts/AuthProvider'

const MetricsScreen = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="container">
      <Button onClick={logout}>Cerrar sesión</Button>
    </div>
  )
}

export default MetricsScreen
